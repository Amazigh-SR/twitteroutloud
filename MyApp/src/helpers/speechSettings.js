const speechSettings = function (utterance, voice, pitch, rate, volume) {
  utterance.voice = voice; // whole voice object
  utterance.pitch = pitch;
  utterance.rate = rate;
  utterance.volume = volume;

  return utterance;
};

module.export = speechSettings;
