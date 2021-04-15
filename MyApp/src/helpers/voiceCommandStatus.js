const fetchEnVoices = require("./fetchEnVoices");
const checkSpeechSynthesis = require("./checkSpeechSynthesis");

const voiceCommandStatus = function (message) {
  //Check browser support
  if (!checkSpeechSynthesis()) {
    return "Sorry this browser does not support speechSynthesis";
  }

  //Setup synthesis object
  const synthesis = window.speechSynthesis;

  //Fetch english voices
  const voices = fetchEnVoices(synthesis);

  //Generate the voice for a given text
  const utterance = new SpeechSynthesisUtterance(message);

  utterance.voice = voices[2];
  utterance.pitch = 1;
  utterance.rate = 1;
  utterance.volume = 1;

  synthesis.speak(utterance);
};

// console.log(voiceCommandStatus("Voice command enabled"));

exports.voiceCommandStatus = voiceCommandStatus;
