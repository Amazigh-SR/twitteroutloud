import {useState, useEffect} from 'react'

export default function Settings(props) {
  
  const [settings, setSettings] = useState({
    voice: 1,
    volume: 1,
    rate: 1,
    pitch: 1
  })

  function handleChange(evt) {
    const value = evt.target.value;
    setSettings({
      ...settings,
      [evt.target.name]: value
    })
  }

  useEffect(() =>{loadVoices()})

  function loadVoices() {
    // Get the voice select element.
    var voiceSelect = document.getElementById('voice');
    // Fetch the available voices.
    var voices = speechSynthesis.getVoices();
    
    // Loop through each of the voices.
    voices.forEach(function(voice, i) {
      // Create a new option element.
      var option = document.createElement('option');
      
      // Set the options value and text.
      option.value = voice.name;
      option.innerHTML = voice.name;
        
      // Add the option to the voice selector.
      voiceSelect.appendChild(option);
    });
  }
  // Execute loadVoices.

  
  return <div className="settingsComponent">

  <div className="option">
		<label style={{marginRight: "20px"}} for="voice">Voice</label>
		<select name="voice" id="voice" onChange={handleChange}></select>
	</div>

	<div className="option">
		<label for="volume">Volume</label>
		<input type="range" min="0" max="1" step="0.01" name="volume" id="volume" value={settings.volume} onChange={handleChange}/>
	</div>

	<div className="option">
		<label for="rate">Rate</label>
		<input type="range" min="0.1" max="10" step="0.1" name="rate" id="rate" value={settings.rate} onChange={handleChange}/>
	</div>

	<div className="option">
		<label for="pitch">Pitch</label>
		<input type="range" min="0" max="2" step="0.01" name="pitch" id="pitch" value={settings.pitch} onChange={handleChange}/>
	</div>

  <button className="btn player"
      onClick={()=> console.log("done click")}>Done</button>

  </div>
}