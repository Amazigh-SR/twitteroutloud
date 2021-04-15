//Function 2 - a function that fetches all the EN voices (from a total of 67) that the API has to offer
const fetchEnVoices = function (synthesis, setVoices, setSettings, settings) {
  const voices = synthesis.getVoices();
  console.log("inside fetchEnVoices -> voices: ", voices);
  
  if (voices.length > 0) {
    setVoices([...filterEnVoices(voices)]);
    setSettings({...settings, voice: voices.find(voice => voice.name === settings.voice)})
  } else {
    //chrome requires this event to be handled somewhat inconsistently
    window.speechSynthesis.onvoiceschanged = (event) => {
      const voices = event.target.getVoices();
      console.log("Inside event handler - event: ", event.target)
      setVoices([...filterEnVoices(voices)])
      setSettings({...settings, voice: voices.find(voice => voice.name === settings.voice)})
    }
  }
};

const filterEnVoices= function(voices) {
  const englishRegex = /^en(-[a-z]{2})?$/i; // Regex to match all types of en e.g. en-US, en-CA etc.
  
  return voices.filter((voice) => englishRegex.test(voice.lang)); // returns all the english speaking voices - 14 in total.
}
module.exports = fetchEnVoices;
