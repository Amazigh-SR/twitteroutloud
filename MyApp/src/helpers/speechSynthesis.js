// Import mock data - tested and validated
// const mockData = require("./mockData");
const checkSpeechSynthesis = require("./checkSpeechSynthesis");
const fetchEnVoices = require("./fetchEnVoices");
// const speechSettings = require("./speechSettings");

//-----------------------------------------------//

const speechSynthesis = function (tweetObject, settings) {
  console.log("Settings in SPEECHSYnthesis:", settings);
  const tweetText = tweetObject.full_text;
  const name = tweetObject.user.name;
  const finalFormMessage = `${name} tweets ${tweetText}`;
  const { voice, pitch, rate, volume } = settings; //voiceId b/w 1 & 17.

  //Check browser support
  if (!checkSpeechSynthesis()) {
    return "Sorry this browser does not support speechSynthesis";
  }

  //Setup synthesis object
  const synthesis = window.speechSynthesis;

  //Fetch english voices
  const voices = fetchEnVoices(synthesis);

  //Generate the voice for a given text
  // const utterance = new SpeechSynthesisUtterance(finalFormMessage);
  const utterance = new SpeechSynthesisUtterance(finalFormMessage);

  // Static settings
  utterance.voice = voice;
  utterance.pitch = pitch;
  utterance.rate = rate;
  utterance.volume = volume;

  // utterance.voice = voices[0];
  // utterance.pitch = 1;
  // utterance.rate = 1;
  // utterance.volume = 1;

  // Function that calls the speak method to generate audio for a given message
  synthesis.speak(utterance);
};

exports.speechSynthesis = speechSynthesis;
