import { usePlayer, playerConstants } from '../hooks/usePlayerControls';
import { useAppMode, appModeConstants } from '../hooks/useAppMode';

import $ from 'jquery'
import { useEffect } from 'react'

import { speechSynthesis } from "../helpers/speechSynthesis";
import diffTweets from "../helpers/diffTweets";

import Settings from "./Settings";

const { PAUSE, STOP } = playerConstants;


const { CURATE, BINGE, THREAD } = appModeConstants;


export default function Speech(props) {

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
    preload,
    nextTrack,
  } = usePlayer();

  const {
    appMode,
    setAppMode,
  } = useAppMode();
  

  const { tweets, setTweets, voices, settings, setSettings } = props;
  
  useEffect(()=> {
    updateTracks(tweets.map(tweet => speechSynthesis(tweet, settings)));
  }, []);

  useEffect(() => {
    //this use effect calls pings the server every time more tweets are needed
    if (nextTrack >= (tweets.length)) {
      preload();
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
    if (appMode === BINGE) {
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
      <h1>Now playing: {`${playerMode !== STOP ? "Tweet #" + (nextTrack) : 'nothing'}`}</h1>
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
            onClick={() => { playerMode === PAUSE ? resume() : play(settings) }}
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