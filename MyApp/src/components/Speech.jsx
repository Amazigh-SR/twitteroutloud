// import checkSpeechSynthesis from "../helpers/checkSpeechSynthesis";
import axios from "axios";
import { usePlayer, playerConstants } from "../hooks/usePlayerControls";
import { useAppMode, appModeConstants } from '../hooks/useAppMode';


import $ from 'jquery'

import { speechSynthesis } from "../helpers/speechSynthesis";
import diffTweets from "../helpers/diffTweets";

import Settings from "./Settings";
import TweetList from "./TweetList";

import mockData from "../helpers/mockData";
import { useState, Fragment, useEffect } from "react";
import fetchEnVoices from "../helpers/fetchEnVoices.js";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const { PAUSE, STOP, RELOAD } = playerConstants;

export default function Speech(props) {

  const { tweets, setTweets, voices, settings, setSettings } = props;

  // const utterances = tweets.map((tweet) => speechSynthesis(tweet, settings));

const { CURATE, BINGE, THREAD } = appModeConstants;

  const {
    playerMode,
    utterances,
    updateTracks,
    play,
    resume,
    pause,
    stop,
    previous,
    next,
    reload,
    nextTrack,
  } = usePlayer();

  const {
    appMode,
    setAppMode,
  } = useAppMode();
  

  // let currentTweet = 0;
  // const playSpeech = function (settings) {
  //   for (let i = 0; i < tweets.length; i++) {
  //     window.speechSynthesis.resume() || speechSynthesis(tweets[i], settings);
  //     // speechSynthesis(tweets[i], settings);
  //   }
  // };



  // useEffect(() => {}, [currentTweet]);

  //Create a helper function file for functions occurring more than once
  const deleteSession = function () {
    axios
      .delete(`${process.env.REACT_APP_BACK_END_HOST}/session`, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_FRONT_END_HOST,
        },
      })
      .then((res) => {
        props.setUserAccess(false);
        localStorage.removeItem("isLoggedIn");
      })
      .catch((err) => console.error(err));
  };

  // ------------------------------------------------------------- //
  // Speech Recognition API is currently following a "push to talk" approach.
  let speechListenerIsActive = false;
  const commands = [
    {
      command: ["start"],
      callback: () => play(settings),
    },

    {
      command: ["stop"],
      callback: stop,
    },
    {
      command: ["pause"],
      callback: pause,
    },
    {
      command: ["resume"],
      callback: resume,
    },

    {
      command: ["Next tweet"],
      callback: () => next(settings),
    },

    {
      command: ["Previous tweet "],
      callback: () => previous(settings),
    },

    {
      command: ["log me out"],
      callback: deleteSession,
    },

    {
      command: ["open settings"],
      callback: () => {
        document.querySelector(".settingsComponent").style.display = "block";
      },
    },

    {
      command: ["close settings"],
      callback: () => {
        document.querySelector(".settingsComponent").style.display = "none";
      },
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });

  // ------------------------------------------------------------ //

  
  useEffect(()=> {
    updateTracks(tweets.map(tweet => speechSynthesis(tweet, settings)));
  }, []);

  useEffect(() => {
    //this use effect calls pings the server every time more tweets are needed
    if (nextTrack >= (tweets.length) && playerMode !== RELOAD) {
      reload();
      props.getTweets()
      .then((newTweets) => {
        const mergedTweets = diffTweets(tweets, newTweets)
        setTweets(mergedTweets);
        updateTracks(
          mergedTweets.map(tweet => speechSynthesis(tweet, settings))
          );
          setAppMode(BINGE)
        });
    }
  }
  ,[nextTrack])

  //while bingeing play will be called as long as new utterances are being generated
  useEffect(()=>{
    if (appMode === BINGE && playerMode === RELOAD) {
      play(settings);
    }
  }, [utterances, appMode])

  
  const handleClick = function(){
      if ( $( "div.settingsComponent" ).first().is( ":hidden" ) ) {
        $( "div.settingsComponent" ).slideDown( "fast" );
      } else {
        $( "div.settingsComponent" ).slideUp();
      }
  }

  return (
    <>
      {/* <h1>Now playing: {`${playerMode !== STOP ? "Tweet #" + (nextTrack) : 'nothing'}`}</h1> */}
      <div
        className="btn-toolbar mb-3 speechComponent"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <div className="btn-group">
        <button
            className="btn player"
            onClick={() => {
              speechListenerIsActive = !speechListenerIsActive;
              console.log(speechListenerIsActive);
              SpeechRecognition.startListening({
                continuous: speechListenerIsActive,
              });
            }}
          >
            Voice Control
          </button>
        </div>

        <div className="btn-group mr-2" role="group" aria-label="First group">
          
          <button
            type="button"
            className="btn player"
            onClick={() => previous(settings)}
          >
            <i className="bi bi-skip-backward-fill"></i>
          </button>
          <button
            type="button"
            className="btn player"
            onClick={() => { playerMode === PAUSE ? resume() : play(settings) }}
          >
            <i className="bi bi-play-fill"></i>
          </button>
          <button
            className="btn player"
            onClick={() => {
              pause();
            }}
          >
            <i className="bi bi-pause"></i>
          </button>
          <button className="btn player" onClick={() => stop()}>
            <i className="bi bi-stop-fill"></i>
          </button>
          <button className="btn player" onClick={() => next(settings)}>
            <i className="bi bi-skip-forward-fill"></i>
          </button>
        </div>
        <div className="btn-group">
          <button
            id="settingsButton"
            className="btn player"
            onClick={() => {
              handleClick();
            }}
          >
            Settings
          </button>
        </div>


      </div>
      <Settings
        settings={settings}
        setSettings={setSettings}
        voices={voices}
        $={$}
      />
      {/* <p id="transcript">Transcript: {transcript}</p> */}
      <TweetList 
        style={{transition: "1s"}} 
        key={nextTrack} 
        tweets={[tweets[nextTrack], tweets[(nextTrack + 1)], tweets[(nextTrack + 2)]]} 
      />
    </>
  );
}