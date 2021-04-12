// import checkSpeechSynthesis from "../helpers/checkSpeechSynthesis";
// import fetchEnVoices from "../helpers/fetchEnVoices";
import { speechSynthesis } from "../helpers/speechSynthesis";
import mockData from "../helpers/mockData";

export default function Speech(props) {
  const { tweets, setTweets } = props;
  
  let currentTweet = 0
  
  const playSpeech = function() {
    for (let i = 0; i < tweets.length; i++) {
      window.speechSynthesis.resume() || speechSynthesis(tweets[i])
    }
  };

  const pauseSpeech = function() {
    window.speechSynthesis.pause()
    };

  const stopSpeech = function() {
    window.speechSynthesis.cancel()
    };

  const nextTweet = function() {
    window.speechSynthesis.cancel();
    currentTweet++
    speechSynthesis(tweets[currentTweet])
    };

  return (
    <div className="btn-toolbar mb-3 speechComponent" role="toolbar" aria-label="Toolbar with button groups">
      <div className="btn-group mr-2" role="group" aria-label="First group">
      {/* <button onClick={()=>onClick()}>Previous</button> */}
      <button type="button" className="btn player"
      onClick={()=>playSpeech()}>
        <i className="bi bi-play-fill"></i>
      </button>
      <button className="btn player" 
        onClick={()=>pauseSpeech()}>
          <i className="bi bi-pause"></i>
      </button>
      <button className="btn player" 
        onClick={()=>stopSpeech()}>
          <i className="bi bi-stop-fill"></i>
      </button>
      <button className="btn player" 
        onClick={()=>nextTweet()}>
          <i className="bi bi-skip-end-fill"></i>
      </button>
    </div>
    <div className="btn-group">
    <button className="btn player"
      onClick={()=> console.log("settings click")}>Settings</button>
      
    </div>
  </div>
  );
}

//SpeechSynthesis.pause()
//Puts the SpeechSynthesis object into a paused state.