import {useState, useEffect} from 'react'
import "../App.css";
import fetchEnVoices from "../helpers/fetchEnVoices.js"
// MyApp/src/helpers/fetchEnVoices.js
export default function Settings(props) {
  console.log("props: ", props);

  function handleChange(evt) {
    const value = Number(evt.target.value);
    props.setSettings((prev) => ({
      ...prev,
      [evt.target.name]: (value),
    }));
  }

  useEffect(() =>{loadVoices()})

  function loadVoices() {
    // Get the voice select element.
    var voiceSelect = document.getElementById('voice');
    // Fetch the available voices.
    const voices = fetchEnVoices(window.speechSynthesis);
    
    // Loop through each of the voices.
    voices.forEach(function(voice, i) {
      // Create a new option element.
      var option = document.createElement('option');
      
      // Set the options value and text.
      option.value = voice.name;
      option.innerHTML = voice.name;
      option.voiceId = i
        
      // Add the option to the voice selector.
      voiceSelect.appendChild(option);
    });
  }
  // Execute loadVoices.

  
//   return <div className="settingsComponent">

//   <div className="option">
// 		<label style={{marginRight: "20px"}} htmlFor="voice">Voice</label>
// 		<select name="voice" id="voice" onChange={handleChange}></select>
// 	</div>

// 	<div className="option">
// 		<label htmlFor="volume">Volume</label>
// 		<input type="range" min="0" max="1" step="0.01" name="volume" id="volume" value={settings.volume} onChange={handleChange}/>
// 	</div>

// 	<div className="option">
// 		<label htmlFor="rate">Rate</label>
// 		<input type="range" min="0.1" max="10" step="0.1" name="rate" id="rate" value={settings.rate} onChange={handleChange}/>
// 	</div>

// 	<div className="option">
// 		<label htmlFor="pitch">Pitch</label>
// 		<input type="range" min="0" max="2" step="0.01" name="pitch" id="pitch" value={settings.pitch} onChange={handleChange}/>
// 	</div>


// }
  return (
    <div className="settingsComponent">
      <div class="option">
        <label for="voice">Voice</label>
        <select name="voice" id="voice" onChange={handleChange}>
        </select>
      </div>

      <div class="option">
        <label for="volume">Volume</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          name="volume"
          id="volume"
          value={props.settings.volume}
          onChange={handleChange}
        />
      </div>

      <div class="option">
        <label for="rate">Rate</label>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          name="rate"
          id="rate"
          value={props.settings.rate}
          onChange={handleChange}
        />
      </div>

      <div class="option">
        <label for="pitch">Pitch</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          name="pitch"
          id="pitch"
          value={props.settings.pitch}
          onChange={handleChange}
        />

      <button className="btn player"
        onClick={()=> console.log("done click")}>Done</button>


      </div>
      
    </div>
  );
}
