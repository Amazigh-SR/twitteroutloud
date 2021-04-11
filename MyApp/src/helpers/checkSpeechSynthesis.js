//Function 1 - function that verifies if browser supports speechSynthesis
const checkSpeechSynthesis = function () {
  if ("speechSynthesis" in window) {
    return true;
  }
  return false;
};

module.exports = checkSpeechSynthesis;
