import { usePlayer, playerConstants } from '../hooks/usePlayerControls';
import $ from 'jquery'

import { speechSynthesis } from "../helpers/speechSynthesis";

import Settings from "./Settings";

const { PAUSE } = playerConstants;

export default function Speech(props) {
  
  const { tweets, voices, settings, setSettings } = props;

  const utterances = tweets.map(tweet => speechSynthesis(tweet, settings));

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

  const handleClick = function(){
      if ( $( "div.settingsComponent" ).first().is( ":hidden" ) ) {
        $( "div.settingsComponent" ).slideDown( "fast" );
      } else {
        $( "div.settingsComponent" ).slideUp();
      }
  }

  return (
    <>
      <h1>Now playing: Tweet {`#${currentUtterance}` || 'nothing' }</h1>
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
      </div>
      <Settings settings={settings} setSettings={setSettings} voices={voices} $={$}/>
    </>
  );
}
