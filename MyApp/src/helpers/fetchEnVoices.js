//Function 2 - a function that fetches all the EN voices (from a total of 67) that the API has to offer
const fetchEnVoices = function (synthesis) {
  const englishRegex = /^en(-[a-z]{2})?$/i; // Regex to match all types of en e.g. en-US, en-CA etc.
  const voices = synthesis
    .getVoices()
    .filter((voice) => englishRegex.test(voice.lang)); // returns all the english speaking voices - 14 in total.

  return voices;
};

module.exports = fetchEnVoices;
