const fetchEnVoices = require("./fetchEnVoices");
const checkSpeechSynthesis = require("./checkSpeechSynthesis");

const voiceCommandStatus = function (message) {
  //Check browser support
  if (!checkSpeechSynthesis()) {
    return "Sorry this browser does not support speechSynthesis";
  }

  //Setup synthesis object
  const synthesis = window.speechSynthesis;

  // let voices = synthesis.getVoices();

  // Regex to match all types of en e.g. en-US, en-CA etc.
  // const englishRegex = /^en(-[a-z]{2})?$/i;

  //Fetch english voices
  // voices = voices.filter((voice) => englishRegex.test(voice.lang));

  //Generate the voice for a given text
  const utterance = new SpeechSynthesisUtterance(message);

  // utterance.voice = voices[2];
  // utterance.pitch = 1;
  // utterance.rate = 1;
  // utterance.volume = 1;

  console.log("I EXIST!!");

  synthesis.speak(utterance);
};

// console.log(voiceCommandStatus("Voice command enabled"));

exports.voiceCommandStatus = voiceCommandStatus;
