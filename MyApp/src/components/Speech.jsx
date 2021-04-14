// import checkSpeechSynthesis from "../helpers/checkSpeechSynthesis";

import { speechSynthesis } from "../helpers/speechSynthesis";
import Settings from "./Settings";
import mockData from "../helpers/mockData";
import { useState, Fragment, useEffect } from "react";
import fetchEnVoices from "../helpers/fetchEnVoices.js";
import $ from "jquery";
import { usePlayer, playerConstants } from "../hooks/usePlayerControls";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const { PAUSE } = playerConstants;

export default function Speech(props) {
  let voices = fetchEnVoices(window.speechSynthesis);

  const { tweets } = props;
  const [settings, setSettings] = useState({
    voice: window.speechSynthesis.getVoices()[0],
    volume: 5,
    rate: 1,
    pitch: 1,
  });

  const utterances = tweets.map((tweet) => speechSynthesis(tweet, settings));

  const {
    mode,
    play,
    resume,
    pause,
    stop,
    previous,
    next,
    currentUtterance,
  } = usePlayer(utterances);

  let currentTweet = 0;
  const playSpeech = function (settings) {
    for (let i = 0; i < tweets.length; i++) {
      window.speechSynthesis.resume() || speechSynthesis(tweets[i], settings);
      // speechSynthesis(tweets[i], settings);
    }
  };

  useEffect(() => {
    $("#settingsButton").click(() => {
      setSettings({
        voice: window.speechSynthesis.getVoices()[0],
        volume: 5,
        rate: 1,
        pitch: 1,
      });
      if ($("div.settingsComponent").first().is(":hidden")) {
        $("div.settingsComponent").slideDown("fast");
      } else {
        $("div.settingsComponent").slideUp();
      }
    });
  }, []);

  useEffect(() => {}, [currentTweet]);

  // ------------------------------------------------------------- //
  // Speech Recognition API is currently following a "push to talk" approach.
  let speechListenerIsActive = false;
  // const { resetTranscript } = useSpeechRecognition();
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
  ];

  const { transcript } = useSpeechRecognition({ commands });

  // ------------------------------------------------------------ //

  return (
    <>
      <h1>Now playing: Tweet #{currentUtterance}</h1>
      <div
        className="btn-toolbar mb-3 speechComponent"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
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
              mode === PAUSE ? resume() : play(settings);
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
          <button id="settingsButton" className="btn player" onClick={""}>
            Settings
          </button>
        </div>
      </div>
      <Settings settings={settings} setSettings={setSettings} voices={voices} />
      <button
        onClick={() => {
          speechListenerIsActive = !speechListenerIsActive;
          console.log(speechListenerIsActive);
          SpeechRecognition.startListening({
            continuous: speechListenerIsActive,
          });
        }}
      >
        Activate Voice Commands
      </button>
      <p id="transcript">Transcript: {transcript}</p>
    </>
  );
}
