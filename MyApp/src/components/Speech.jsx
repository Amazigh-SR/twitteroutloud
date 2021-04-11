// import checkSpeechSynthesis from "../helpers/checkSpeechSynthesis";
// import fetchEnVoices from "../helpers/fetchEnVoices";
import { speechSynthesis } from "../helpers/speechSynthesis";
import mockData from "../helpers/mockData";

export default function Speech(props) {
  {
    speechSynthesis(mockData[0]);
  }
  return <div>Hey, I'm talking here!</div>;
}
