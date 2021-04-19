import { useState } from "react";

const speech = window.speechSynthesis;

const playerConstants = {
  ONLOAD: "ONLOAD",
  PLAY: "PLAY",
  STOP: "STOP",
  PAUSE: "PAUSE",
  PREV: "PREV",
  NEXT: "NEXT",
  RESUME: "RESUME",
  RELOAD: "RELOAD",
};

const { ONLOAD, PLAY, STOP, RESUME, PAUSE, PREV, NEXT, RELOAD } = playerConstants;

const usePlayer = function () {
  const [mode, setMode] = useState(ONLOAD);
  const [tracks, setTracks] = useState([]);
  const [nextTrack, setNextTrack] = useState(0);

  const updateTracks = function (utterances) {
    //add an event listener to each utterance that increments nextTrack state on SpeechSynthesisUtterance "end" event
    for (const utterance of utterances) {
      utterance.onend = () => {
        // if (mode === PLAY) {
        setNextTrack((prev) => prev + 1);
        // }
      };
    }

    setTracks([...utterances]);
  };

  const play = function (settings, func = undefined) {
    const { voice, pitch, rate, volume } = settings;

    
    let startingTrack = nextTrack;
    let modifier = 0;
    
    if (func === PREV || func === NEXT) {

      if (func === PREV && mode === PLAY) {
        
        //if the calling func is PREV decrement nextTrack by 2
        modifier = -2;
        startingTrack -= 1;
        
      } else if (func === PREV && mode === STOP) {
        
        //if calling func is prev while app is stopped STOP decrement nextTrack by 1
        if (nextTrack < 2) {
          modifier -= 1;
          startingTrack -= 1
        } else {
          modifier -= 2
          startingTrack -= 2;
        }
        
      } else if (func === NEXT && mode === PLAY){
        
        startingTrack += 1;
        
      } else if (func === NEXT && mode === STOP){
        //setMode(PLAY) to trigger a state update in TweetList
        setMode(PLAY);
      }
      
    } else if (func === STOP){
      modifier =-1;

    } else if (mode === STOP ){
      
      modifier =-1
      startingTrack -= 1;
      
    }

    setNextTrack((prev) => prev + modifier);
    
    if (startingTrack < tracks.length) {
      for (let i = startingTrack; i < tracks.length; i++) {
        // console.log("Tracks[i]. i=> ", i)
        tracks[i].voice = voice;
        tracks[i].pitch = pitch;
        tracks[i].rate = rate;
        tracks[i].volume = volume;
        
        //utterances are added to the queue here
        speech.speak(tracks[i]);
      }
      setMode(PLAY);
    } else {
      setMode(STOP);
      setNextTrack(0);
    }
  };

  const resume = function () {
    setMode(PLAY);

    speech.resume();
  };

  const pause = function () {
    setMode(PAUSE);

    speech.pause();
  };

  const stop = function () {
    if (mode !== STOP) {
      setMode(STOP);

      speech.cancel();

      //because the the cancel method triggers an onend event we need to subtract prev from itself - 1 this is a bit like saying setNeckTrack(-1) but using prev seems to be more consistent
      // setNextTrack((prev) => prev - nextTrack - 1);
    }
  };

  //in order to navigate through the queue of utterances we need to cancel it and reinitialize it
  const previous = function (settings) {
    if (nextTrack >= 1 /*&& mode !== STOP*/) {
      speech.cancel();
      play(settings, PREV);
    } else if (nextTrack >= 1 && mode === STOP) {
      play(settings, STOP);
    }
  };

  const next = function (settings) {
    speech.cancel();
    if (nextTrack < tracks.length - 1) {
      play(settings, NEXT);
    }
  };

  // const reload = function (reloading) {
  //   if (reloading) {
  //     setMode(RELOAD);
  //   } else {
  //     setMode(PLAY);
  //   }
  // };

  //!reload is currently a DO-NO-USE

  return {
    playerMode: mode,
    utterances: tracks,
    updateTracks,
    play,
    resume,
    pause,
    stop,
    previous,
    next,
    // reload,
    nextTrack,
  };
};

export { usePlayer, playerConstants };
