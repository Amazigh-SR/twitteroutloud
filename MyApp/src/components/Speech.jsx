import { usePlayer, playerConstants } from '../hooks/usePlayerControls';
import $ from 'jquery'
import {useEffect, useState} from 'react'
import { speechSynthesis } from "../helpers/speechSynthesis";

import Settings from "./Settings";

const { PAUSE, STOP } = playerConstants;

export default function Speech(props) {
  
  const { tweets, setTweets, voices, settings, setSettings } = props;
  
  const {
    mode,
    utterances,
    updateTracks,
    play,
    resume,
    pause,
    stop,
    previous,
    next,
    preload,
    nextTrack,
  } = usePlayer();

  const [appMode, setAppMode] = useState(false);
  
  useEffect(()=> {
    updateTracks(tweets.map(tweet => speechSynthesis(tweet, settings)));
  }, []);

  useEffect(() => {
    if (nextTrack >= (tweets.length)) {
      preload();
      props.getTweets()
      .then((tweets) => {
        setTweets(tweets.data);
        updateTracks(
          tweets.data.map((tweet) => speechSynthesis(tweet, settings))
          );
          setAppMode(true)
        });
    }
  }
  ,[nextTrack])

  useEffect(()=>{
    if (appMode === BINGE) {
      play(settings);
    }
  }, [utterances, appMode])

    // useEffect(() => {
    //   updateTracks(tweets.map(tweet => speechSynthesis(tweet, settings)));
  
    // }, [tweets, settings])
  
  const handleClick = function(){
      if ( $( "div.settingsComponent" ).first().is( ":hidden" ) ) {
        $( "div.settingsComponent" ).slideDown( "fast" );
      } else {
        $( "div.settingsComponent" ).slideUp();
      }
  }

  return (
    <>
      <h1>Now playing: {`${mode !== STOP ? "Tweet #" + (nextTrack) : 'nothing'}`}</h1>
      <div
        className="btn-toolbar mb-3 speechComponent"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <div className="btn-group mr-2" role="group" aria-label="First group">
          <button type="button"
            className="btn player"
            onClick={()=>previous(settings)}>
            <i className="bi bi-skip-backward-fill"></i>
          </button>
          <button
            type="button"
            className="btn player"
            onClick={() => { mode === PAUSE ? resume() : play(settings) }}
          >
            <i className="bi bi-play-fill"></i>
          </button>
          <button className="btn player" onClick={() => { pause() }}>
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
          <button id="settingsButton" className="btn player" onClick={()=>{handleClick()}}>
            Settings
          </button>
        </div>
        <div className="btn-group">
          <button id="settingsButton" className="btn player" onClick={()=>{props.getTweets()}}>
            Load More Tweets
          </button>
        </div>
      </div>
      <Settings settings={settings} setSettings={setSettings} voices={voices} $={$}/>
    </>
  );
}