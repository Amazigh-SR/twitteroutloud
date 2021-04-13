// import checkSpeechSynthesis from "../helpers/checkSpeechSynthesis";

import { speechSynthesis } from "../helpers/speechSynthesis";
import Settings from "./Settings";
import mockData from "../helpers/mockData";
import { useState, Fragment, useEffect } from "react";
import fetchEnVoices from "../helpers/fetchEnVoices.js"

export default function Speech(props) {
  let voices = fetchEnVoices(window.speechSynthesis);

  const { tweets } = props;
  const [settings, setSettings] = useState({
    voice: null,
    volume: 5,
    rate: 1,
    pitch: 1,
  });


  let currentTweet = 0;
  console.log("SETTINGS---->", settings);
  const playSpeech = function (settings) {
    for (let i = 0; i < tweets.length; i++) {
      window.speechSynthesis.resume() || speechSynthesis(tweets[i], settings);
      // speechSynthesis(tweets[i], settings);
    }
  };

  useEffect(() => {
    console.log("TYPE OF WINDOW", typeof window, window.speechSynthesis);
  }, []);

  const pauseSpeech = function () {
    window.speechSynthesis.pause();
  };

  const stopSpeech = function () {
    window.speechSynthesis.cancel();
  };

  const nextTweet = function () {
    window.speechSynthesis.cancel();
    currentTweet++;
    speechSynthesis(tweets[currentTweet], settings);
  };

  return (
    <>
      <div
        class="btn-toolbar mb-3 speechComponent"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <div class="btn-group mr-2" role="group" aria-label="First group">
          {/* <button onClick={()=>onClick()}>Previous</button> */}
          <button
            type="button"
            className="btn player"
            onClick={() => playSpeech(settings)}
          >
            <i class="bi bi-play-fill"></i>
          </button>
          <button className="btn player" onClick={() => pauseSpeech()}>
            <i class="bi bi-pause"></i>
          </button>
          <button className="btn player" onClick={() => stopSpeech()}>
            <i class="bi bi-stop-fill"></i>
          </button>
          <button className="btn player" onClick={() => nextTweet()}>
            <i class="bi bi-skip-end-fill"></i>
          </button>
        </div>
        <div className="btn-group">
          <button className="btn player" onClick={""}>
            Settings
          </button>
        </div>
      </div>
      <Settings settings={settings} setSettings={setSettings} voices={voices}/>
    </>
  );
}
