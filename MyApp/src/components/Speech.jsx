// import checkSpeechSynthesis from "../helpers/checkSpeechSynthesis";
// import fetchEnVoices from "../helpers/fetchEnVoices";
import { speechSynthesis } from "../helpers/speechSynthesis";
import mockData from "../helpers/mockData";

export default function Speech(props) {
  const { tweets, setTweets } = props;
  const onClick = function() {
    speechSynthesis(tweets[0])
  };

  return (
  <div>
    <div>Look who's talkin' now...</div>
    <button onClick={()=>onClick()}>Let's make some noise!</button>
  </div>
  );
}
