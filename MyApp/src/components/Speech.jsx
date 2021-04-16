// import checkSpeechSynthesis from "../helpers/checkSpeechSynthesis";
import axios from "axios";
import { usePlayer, playerConstants } from "../hooks/usePlayerControls";
import { useAppMode, appModeConstants } from "../hooks/useAppMode";

import $ from "jquery";

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
import { voiceCommandStatus } from "../helpers/voiceCommandStatus";

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

  const { appMode, setAppMode } = useAppMode();
  const [speechListenerIsActive, setSpeechListenerIsActive] = useState(false); //! Added this here

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
  // let speechListenerIsActive = false; //! I commented this out as well
  const { resetTranscript } = useSpeechRecognition();
  const commands = [
    {
      command: ["start"],
      callback: ({ resetTranscript }) => {
        play(settings);
        resetTranscript();
      },
    },

    {
      command: ["stop"],
      callback: ({ resetTranscript }) => {
        stop();
        resetTranscript();
      },
    },
    {
      command: ["pause"],
      callback: ({ resetTranscript }) => {
        pause();
        resetTranscript();
      },
    },
    {
      command: ["resume"],
      callback: ({ resetTranscript }) => {
        resume();
        resetTranscript();
      },
    },

    {
      command: ["Next tweet"],
      callback: ({ resetTranscript }) => {
        next(settings);
        resetTranscript();
      },
    },

    {
      command: ["Previous tweet"],
      callback: ({ resetTranscript }) => {
        previous(settings);
        resetTranscript();
      },
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

  useEffect(() => {
    updateTracks(tweets.map((tweet) => speechSynthesis(tweet, settings)));
  }, []);

  useEffect(() => {
    //this use effect calls pings the server every time more tweets are needed
    if (nextTrack >= tweets.length && playerMode !== RELOAD) {
      reload();
      props.getTweets().then((newTweets) => {
        const mergedTweets = diffTweets(tweets, newTweets);
        setTweets(mergedTweets);
        updateTracks(
          mergedTweets.map((tweet) => speechSynthesis(tweet, settings))
        );
        setAppMode(BINGE);
      });
    }
  }, [nextTrack]);

  //while bingeing play will be called as long as new utterances are being generated
  useEffect(() => {
    if (appMode === BINGE && playerMode === RELOAD) {
      play(settings);
    }
  }, [utterances, appMode]);

  const handleClick = function () {
    if ($("div.settingsComponent").first().is(":hidden")) {
      $("div.settingsComponent").slideDown("fast");
    } else {
      $("div.settingsComponent").slideUp();
    }
  };

  return (
    <>
      <h1>
        Now playing:{" "}
        {`${playerMode !== STOP ? "Tweet #" + nextTrack : "nothing"}`}
      </h1>
      <div
        className="btn-toolbar mb-3 speechComponent"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <button
          className="btn player"
          id="voice-commands"
          onClick={() => {
            document.querySelector("#VC-drawer").classList.toggle("invisible");
            document.querySelector("#VC-drawer").classList.toggle("drawer");
            const newSpeechListenerIsActive = !speechListenerIsActive;
            setSpeechListenerIsActive(!speechListenerIsActive);

            SpeechRecognition.startListening({
              continuous: newSpeechListenerIsActive,
            }).then((response) => {
              console.log(newSpeechListenerIsActive);
              if (newSpeechListenerIsActive) {
                voiceCommandStatus("Voice command enabled", voices);
                document.querySelector("#voice-commands").innerHTML =
                  "Deactivate Voice Commands";
              }
              if (!newSpeechListenerIsActive) {
                SpeechRecognition.abortListening();
                voiceCommandStatus("Voice command disabled", voices);
                document.querySelector("#voice-commands").innerHTML =
                  "Activate Voice Commands";
              }
            });
          }}
        >
          Activate Voice Commands
        </button>
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
            onClick={() => {
              playerMode === PAUSE ? resume() : play(settings);
            }}
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
        <div className="btn-group">
          <button
            id="settingsButton"
            className="btn player"
            onClick={() => {
              document
                .querySelector("#appMode-drawer")
                .classList.toggle("invisible");
              document
                .querySelector("#appMode-drawer")
                .classList.toggle("drawer");
            }}
          >
            App Mode
          </button>
        </div>
      </div>
      <Settings
        settings={settings}
        setSettings={setSettings}
        voices={voices}
        $={$}
      />
      {/* Create a component for list of commands to clean up this disasta */}
      <div id="VC-drawer" className="invisible">
        <h2>List of Voice Commands</h2>
        <div className="VC-list">
          <div>
            <ul>
              <li>Start</li>
              <li>Stop</li>
              <li>Log me Out</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Next Tweet</li>
              <li>Previous Tweet</li>
              <li>Pause</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Resume</li>
              <li>Open Settings</li>
              <li>Close Settings</li>
            </ul>
          </div>
        </div>
        <p id="transcript">
          <strong>Transcript:</strong> {transcript}
        </p>
      </div>
      {/* <p id="transcript">Transcript: {transcript}</p> */}
      <div id="appMode-drawer" className="invisible">
        {/* <h2>App Modes</h2> */}
        <div className="mode-list">
          <div>
            {/* <ul> */}
            <button className="btn btn-primary modeButton" onClick={() => {}}>
              <i className="fas fa-infinity"></i>
              Binge
            </button>
            {/* </ul> */}
          </div>
          <div>
            {/* <ul> */}
            <button className="btn btn-primary modeButton" onClick={() => {}}>
              <i className="fas fa-stopwatch"></i>
              Timer
            </button>
            {/* </ul> */}
          </div>
        </div>
      </div>
      <TweetList
        style={{ transition: "1s" }}
        tweets={tweets}
        nextTrack={nextTrack}
      />
    </>
  );
}
