// The SpeechSynthesis function will contain the following functions & will take an array of tweets as a parameters
//Will need to fetch the tweet, name, replied to etc. from the tweet timeline // ? Which fields do we want to include?
const tweet;
const name;
const urls;//use regex to match with http and if match is found use urls.expanded and use regex to capture what is b/w // and .com
const userMentions; // @johnny, @toyota in the tweet

const finalFormMessage = `tweet from ${name}, ${tweet}`; //Add additional filters based on how this sounds and where it messes up


//Modular Functions
//Function 1 - function that verifies if browser supports speechSynthesis
if("speechSynthesis" in window) {
  const synthesis = window.speechSynthesis;
  //function from step 2 comes here if browser support is true
} else {
  console.log("This browser does not support speechSynthesis")
}

//Function 2 - a function that fetches all the EN voices (from a total of 67) that the API has to offer
const englishRegex = /^en(-[a-z]{2})?$/i; // Regex to match all types of en e.g. en-US, en-CA etc.
const voices = synthesis.voices().filter(voice => englishRegex.test(voice.lang)); // returns all the english speaking voices
// console.log(voices);

//Function 3 - a function that will generate the voice for a given text 
const utterance = new SpeechSynthesisUtterance(finalFormMessage);

//Function 4 that sets up the voice (pick from the result of function 2) need to give a voice object
//Can also setup pitch, rate and volume here as well - see below methods associated with the utterance object.
utterance.voice = voice;
utterance.pitch = 1.5;
utterance.rate = 1.25;
utterance.volume = 0.8;

// Function 5 calls the speak method to generate audio for a given message
synthesis.speak(utterance);



