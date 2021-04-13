//Function 2 - a function that fetches all the EN voices (from a total of 67) that the API has to offer
const fetchEnVoices = function (synthesis) {
  let voices = synthesis.getVoices()
  
  if (voices.length > 0) {
    return filterEnVoices(voices);
  }
    
  window.speechSynthesis.onvoiceschanged = (event) => {
    voices = event.target.getVoices();
    return filterEnVoices(voices)
  }

  return voices;
};

const filterEnVoices= function(voices) {
  const englishRegex = /^en(-[a-z]{2})?$/i; // Regex to match all types of en e.g. en-US, en-CA etc.
  
  return voices.filter((voice) => englishRegex.test(voice.lang)); // returns all the english speaking voices - 14 in total.
}
module.exports = fetchEnVoices;
