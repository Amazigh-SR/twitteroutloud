// Import mock data - tested and validated
// const mockData = require("./mockData");
const checkSpeechSynthesis = require("./checkSpeechSynthesis");
const fetchEnVoices = require("./fetchEnVoices");
// const speechSettings = require("./speechSettings");

//-----------------------------------------------//

const speechSynthesis = function (tweetObject) {
  const tweetText = tweetObject.full_text;
  const name = tweetObject.user.name;
  const finalFormMessage = `${name} tweets ${tweetText}`;

  //Check browser support
  if (!checkSpeechSynthesis()) {
    return "Sorry this browser does not support speechSynthesis";
  }

  //Setup synthesis object
  const synthesis = window.speechSynthesis;

  //Fetch english voices
  const voices = fetchEnVoices(synthesis);

  //Generate the voice for a given text
  const utterance = new SpeechSynthesisUtterance(finalFormMessage);

  // speechSettings(utterance, settings);

  // Static settings
  utterance.voice = voices[0];
  utterance.pitch = 1;
  utterance.rate = 0.9;
  utterance.volume = 0.8;

  // Function that calls the speak method to generate audio for a given message
  synthesis.speak(utterance);
};

// speechSynthesis(mockData[0]);

exports.speechSynthesis = speechSynthesis;
