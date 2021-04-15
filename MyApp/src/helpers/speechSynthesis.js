// Import mock data - tested and validated
// const mockData = require("./mockData");
const checkSpeechSynthesis = require("./checkSpeechSynthesis");

//-----------------------------------------------//

const speechSynthesis = function (tweetObject, settings) {
  const tweetText = tweetObject.full_text;
  const name = tweetObject.user.name;
  const finalFormMessage = `At ${name} tweets. ${tweetText}..`;
  const linkIndex = finalFormMessage.search(/(http|ftp|https):/i);
  const endMessage = finalFormMessage.slice(0, linkIndex);

  const { voice, pitch, rate, volume } = settings; //voiceId b/w 1 & 17.

  //Check browser support
  if (!checkSpeechSynthesis()) {
    return "Sorry this browser does not support speechSynthesis";
  }

  //Setup synthesis object
  const synthesis = window.speechSynthesis;

  //Fetch english voices
  // const voices = fetchEnVoices(synthesis);

  //Generate the voice for a given text
  // const utterance = new SpeechSynthesisUtterance(finalFormMessage);
  const utterance = new SpeechSynthesisUtterance(endMessage);

  return utterance;
};

exports.speechSynthesis = speechSynthesis;
