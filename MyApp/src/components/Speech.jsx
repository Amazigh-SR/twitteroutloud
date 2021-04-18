// import checkSpeechSynthesis from "../helpers/checkSpeechSynthesis";
import axios from "axios";
import { usePlayer, playerConstants } from "../hooks/usePlayerControls";
import { appModeConstants } from "../hooks/useAppMode";

import $ from "jquery";

import { speechSynthesis } from "../helpers/speechSynthesis";
import diffTweets from "../helpers/diffTweets";
import { slideToggle } from "../helpers/slideToggle";

import Settings from "./Settings";
import TweetList from "./TweetList";

import mockData from "../helpers/mockData";
import { useState, Fragment, useEffect } from "react";
import fetchEnVoices from "../helpers/fetchEnVoices.js";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { voiceCommandStatus } from "../helpers/voiceCommandStatus";

const { ONLOAD, PAUSE, STOP, RELOAD, PLAY } = playerConstants;

export default function Speech(props) {
  const {
    tweets,
    setTweets,
    voices,
    settings,
    setSettings,
    appMode,
    updateAppMode,
    setLoading,
  } = props;

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

  const [speechListenerIsActive, setSpeechListenerIsActive] = useState(false);
  const [isVoiceCommandsVisible, setIsVoiceCommandsVisible] = useState(true);

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
      command: ["log me out", "pumpkin time"],
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

    {
      command: ["Timeline mode"],
      callback: () => {
        document.getElementById("mode-binge").click();
      },
    },
    {
      command: ["Tread mode"],
      callback: () => {
        document.getElementById("mode-thread").click();
      },
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });

  // ------------------------------------------------------------ //

  useEffect(() => {
    console.log("Line 139 from speech", tweets);
    updateTracks(tweets.map((tweet) => speechSynthesis(tweet, settings)));
  }, []);

  useEffect(() => {
    //! this use effect causes problems and is no longer idiomatic with how this app is poised to updateAppMode
    //this use effect calls pings the server every time more tweets are needed
    if (
      nextTrack >= tweets.length &&
      playerMode !== RELOAD &&
      appMode === BINGE
    ) {
      reload();
      props.getTweets().then((newTweets) => {
        const mergedTweets = diffTweets(tweets, newTweets);
        setTweets(mergedTweets);
        updateTracks(
          mergedTweets.map((tweet) => speechSynthesis(tweet, settings))
        );
        updateAppMode(BINGE);
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

  useEffect(() => {
    if (appMode === BINGE) {
      document.getElementById("mode-binge").setAttribute("disabled", "");
    }
    if (appMode === THREAD) {
      document.getElementById("mode-thread").setAttribute("disabled", "");
    }
  });

  return (
    <>
      {/* <h1> */}
      {/* Now playing:{" "} */}
      {/* {`${playerMode !== STOP ? "Tweet #" + nextTrack : "nothing"}`} */}
      {/* </h1> */}
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
                if (playerMode === PLAY || playerMode === PAUSE) stop();
                voiceCommandStatus("Voice command enabled", voices);
                document.querySelector("#voice-commands").innerHTML =
                  "<i class='fas fa-microphone-slash'></i>" +
                  "Deactivate Voice Commands";
                if (playerMode === PLAY || playerMode === PAUSE)
                  play(settings, STOP);
              }
              if (!newSpeechListenerIsActive) {
                if (playerMode === PLAY || playerMode === PAUSE) stop();
                SpeechRecognition.abortListening();
                voiceCommandStatus("Voice command disabled", voices);
                document.querySelector("#voice-commands").innerHTML =
                  "<i class='fas fa-microphone'></i>" +
                  "Activate Voice Commands";
                if (playerMode === PLAY || playerMode === PAUSE)
                  play(settings, STOP);
              }
            });
          }}
        >
          {" "}
          <i className="fas fa-microphone"></i>
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
            onClick={() => (playerMode === ONLOAD ? null : pause())}
          >
            <i className="bi bi-pause"></i>
          </button>
          <button
            className="btn player"
            onClick={() => (playerMode === ONLOAD ? null : stop())}
          >
            <i className="bi bi-stop-fill"></i>
          </button>
          <button className="btn player" onClick={() => next(settings)}>
            <i className="bi bi-skip-forward-fill"></i>
          </button>
        </div>
        <div className="button-row btn-group mr-2">
          <div className="btn-group">
            <button
              id="settingsButton"
              className="btn player"
              onClick={() => {
                handleClick();
              }}
            >
              {" "}
              <i className="fas fa-cogs"></i>
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
              {" "}
              <i className="fas fa-toggle-on"></i>
              App Mode
            </button>
          </div>
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
        <h2>
          <div id="VC-header-hideToggle">
            <span>
              <i class="fas fa-microphone-alt"></i>List of Voice Commands
            </span>
            <button
              id="toggle-VCs"
              onClick={() => {
                const isVCsVisible = isVoiceCommandsVisible;
                const target = document.querySelector(".VC-list");
                slideToggle(target, 300);

                if (isVCsVisible) {
                  document.querySelector("#toggle-VCs").innerHTML =
                    "<i id='toggle-icon' class='fas fa-plus-circle'></i>";
                  setIsVoiceCommandsVisible(!isVCsVisible);
                  document.getElementById("hr-top").style.display = "none";
                  document.getElementById("hr-bottom").style.display = "none";
                }

                if (!isVCsVisible) {
                  document.querySelector("#toggle-VCs").innerHTML =
                    "<i id='toggle-icon' class='fas fa-minus-circle'></i>";
                  setIsVoiceCommandsVisible(!isVCsVisible);
                  document.getElementById("hr-top").style.display = "block";
                  document.getElementById("hr-bottom").style.display = "block";
                }

                // console.log("Hello minus is clicked");
              }}
            >
              <i id="toggle-icon" class="fas fa-minus-circle"></i>
            </button>
          </div>
        </h2>
        {/* <i class="fas fa-minus"></i> */}
        <hr id="hr-top" />
        <div className="VC-list">
          <div>
            <ul>
              <li>Start</li>
              <li>Stop</li>
              <li>Log me Out</li>
              <li>Timeline Mode</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Next Tweet</li>
              <li>Previous Tweet</li>
              <li>Pause</li>
              <li>Thread Mode</li>
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
        <hr id="hr-bottom" />
        <div id="transcript-container">
          <div id="transcript-header">
            <img src="https://i.imgur.com/EiZiRou.gif" alt="waves" />
            <span>
              <strong> Transcript:</strong>
            </span>
          </div>
          <div id="transcript-text">
            <p id="transcript">{transcript}</p>
          </div>
        </div>
      </div>
      {/* <p id="transcript">Transcript: {transcript}</p> */}
      <div id="appMode-drawer" className="invisible">
        {/* <h2>App Modes</h2> */}
        <div className="mode-list">
          <div>
            {/* <ul> */}
            <button
              id="mode-binge"
              className="btn player"
              onClick={() => {
                setLoading(true);
                updateAppMode(BINGE, stop);
              }}
            >
              <i className="fas fa-infinity"></i>
              Timeline
            </button>
            {/* </ul> */}
          </div>
          <div>
            {/* <ul> */}
            <button
              id="mode-thread"
              className="btn player"
              onClick={() => {
                setLoading(true);
                updateAppMode(THREAD, stop);
              }}
            >
              <i className="fas fa-list-ul"></i>
              Thread
            </button>
            {/* </ul> */}
          </div>
        </div>
      </div>
      <TweetList
        style={{ transition: "1s" }}
        tweets={tweets}
        nextTrack={nextTrack}
        playerMode={playerMode}
        ONLOAD={ONLOAD}
        PLAY={PLAY}
      />
    </>
  );
}
