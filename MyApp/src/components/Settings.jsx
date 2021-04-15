export default function Settings(props) {
  const {voices, settings, setSettings, $} = props;
  function handleChange(evt) {
    const value = Number(evt.target.value);
    setSettings((prev) => ({
      ...prev,
      [evt.target.name]: (value),
    }));
    localStorage.setItem(evt.target.name, value)
  }

  function handleVoiceChange(evt) {
    const voice = voices.find(voice => voice.name === evt.target.value);
    setSettings((prev) => ({
      ...prev, 
      [evt.target.name]: voice,
    }))
    localStorage.setItem("voice", voice.name)
  }

  const voiceNameList = voices.map((voice, index) => {
    return (
      <option value={voice.name} key={index}>{voice.name}</option>
    )
  })

  const handleClick = function() {
    $( "div.settingsComponent" ).slideUp();
  }

  return (
    <div className="settingsComponent">
      <div className="option voiceDiv">
        <label htmlFor="voice">Voice </label>
        <select value={settings.voice && settings.voice.name} name="voice" id="voice" onChange={handleVoiceChange}>
          {voiceNameList}
        </select>
      </div>
      <div className="option">
        <label htmlFor="volume">Volume</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          name="volume"
          id="volume"
          value={settings.volume}
          onChange={handleChange}
        />
      </div>
      <div className="option">
        <label htmlFor="rate">Rate</label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          name="rate"
          id="rate"
          value={settings.rate}
          onChange={handleChange}
        />
      </div>
      <div className="option">
        <label htmlFor="pitch">Pitch</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          name="pitch"
          id="pitch"
          value={settings.pitch}
          onChange={handleChange}
        />
        <button 
          id="doneButton"
          className="btn player"
          onClick={()=>{handleClick()}}
        >
          Done
        </button>
      </div>
    </div>
  );
}
