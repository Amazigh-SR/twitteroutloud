import { useState, useRef } from "react";
import getTweets from "../helpers/getTweets";
import { speechSynthesis } from "../helpers/speechSynthesis";

const speech = window.speechSynthesis;

const playerConstants = {
  PLAY: "PLAY",
  STOP: "STOP",
  PAUSE: "PAUSE",
  PREV: "PREV",
  NEXT: "NEXT",
  RESUME: "RESUME",
};

const { PLAY, STOP, RESUME, PAUSE, PREV, NEXT } = playerConstants;

const usePlayer = function () {
  const [mode, setMode] = useState(STOP);
  const [tracks, setTracks] = useState([]);
  const [nextTrack, setNextTrack] = useState(0);

  const updateTracks = function (utterances) {
    for (const utterance of utterances) {
      utterance.onend = () => {
        setNextTrack((prev) => prev + 1);
      };
    }

    setTracks([...utterances]);
  };

  const play = function (settings, previous = false, event) {
    const { voice, pitch, rate, volume } = settings;

    setMode(PLAY);

    let startingTrack = nextTrack;

    if (previous) {
      startingTrack -= 2;
      setNextTrack((prev) => prev - 2);
    }

    for (let i = startingTrack; i < tracks.length; i++) {
      tracks[i].voice = voice;
      tracks[i].pitch = pitch;
      tracks[i].rate = rate;
      tracks[i].volume = volume;

      speech.speak(tracks[i]);
    }
  };

  const resume = function () {
    setMode(RESUME);

    speech.resume();
  };

  const pause = function () {
    setMode(PAUSE);

    speech.pause();
  };

  const stop = function () {
    setMode(STOP);

    speech.cancel();

    setNextTrack(0);
  };

  const previous = function (settings) {
    setMode(PLAY);

    speech.cancel();

    if (nextTrack > 1) {
      play(settings, true);
    }
  };

  const next = function (settings) {
    setMode(PLAY);

    speech.cancel();

    if (nextTrack <= tracks.length) {
      play(settings);
    }
  };

  return {
    mode,
    utterances: tracks,
    updateTracks,
    play,
    resume,
    pause,
    stop,
    previous,
    next,
    nextTrack,
  };
};

export { usePlayer, playerConstants };
