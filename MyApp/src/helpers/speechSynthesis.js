// Import mock data - tested and validated
// const mockData = require("./mockData");
const checkSpeechSynthesis = require("./checkSpeechSynthesis");

//-----------------------------------------------//

const speechSynthesis = function (tweetObject, settings) {
  const tweetText = tweetObject.full_text || tweetObject.text;
  const name = tweetObject.user ? tweetObject.user.name : "";
  let finalFormMessage;
  name
    ? (finalFormMessage = `At ${name} tweets. ${tweetText}..`)
    : (finalFormMessage = `${tweetText}..`);
  // const finalFormMessage = `At ${name} tweets. ${tweetText}..`;
  // console.log("pre-regex", finalFormMessage);
  const regexReplaceLinks = finalFormMessage.replace(
    /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/gim,
    ""
  );
  const regexHashtag = regexReplaceLinks.replace(/#/i, "hashtag ");
  const regexRetweet = regexHashtag.replace(/tweets. RT/i, "retweeted. ");
  const regexAt = regexRetweet.replace(/@/i, "at ");
  const regexAnd = regexAt.replace(/&amp/i, "and");
  // console.log("post-regex", regexAt);
  const endMessage = regexAnd;

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
