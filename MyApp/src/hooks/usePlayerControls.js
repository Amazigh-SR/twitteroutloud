import { useState, useRef } from 'react'

const speech = window.speechSynthesis;

const playerConstants = {
  PLAY: "PLAY",
  STOP: "STOP",
  PAUSE: "PAUSE",
  PREV: "PREV",
  NEXT: "NEXT",
  RESUME: "RESUME"
}

const { PLAY, STOP, RESUME, PAUSE, PREV, NEXT } = playerConstants;

const usePlayer = function(utterances) {
  const [mode, setMode] = useState(null);
  const [tracks, setTracks] = useState([...utterances])
  const [nextTrack, setNextTrack] = useState(0);

  for (const utterance of utterances) {
    utterance.onstart = ()=>setNextTrack(prev => prev + 1);
  };

  const play = function(settings, previous = false) {
    const { voice, pitch, rate, volume } = settings;
    
    setMode(PLAY)

    let startingTrack = nextTrack;

    if (previous) {
      startingTrack -= 2;
    }

    for (let i = startingTrack; i < tracks.length; i++) {

      tracks[i].voice = voice;
      tracks[i].pitch = pitch;
      tracks[i].rate = rate;
      tracks[i].volume = volume;
      
      speech.speak(tracks[i]);
    }
  }

  const resume = function() {
    setMode(RESUME);

    speech.resume();
  };

  const pause = function() {
    setMode(PAUSE);

    speech.pause();
  };
  
  const stop = function() {
    setMode(STOP);

    speech.cancel();

    setNextTrack(0);
  };
  
  const previous = function(settings) {
    setMode(PLAY);

    speech.cancel();

    if (nextTrack > 1) {
      setNextTrack(prev => prev - 2);
      play(settings, true)
    }

  };

  const next = function(settings) {
    setMode(PLAY);
    
    speech.cancel();

    if (nextTrack <= tracks.length - 1) {
      play(settings)
    }

  };

   return {
    mode,
    play,
    resume,
    pause,
    stop,
    previous,
    next,
    currentUtterance: nextTrack - 1,
  }
}

export { usePlayer, playerConstants }