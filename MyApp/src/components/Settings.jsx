import {useState} from 'react'

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

  
  return <div className="settingsComponent">

  <div class="option">
		<label for="voice">Voice</label>
		<select name="voice" id="voice"></select>
	</div>

	<div class="option">
		<label for="volume">Volume</label>
		<input type="range" min="0" max="1" step="0.1" name="volume" id="volume" value={settings.volume} onChange={handleChange}/>
	</div>

	<div class="option">
		<label for="rate">Rate</label>
		<input type="range" min="0.1" max="10" step="0.1" name="rate" id="rate" value={settings.rate} onChange={handleChange}/>
	</div>

	<div class="option">
		<label for="pitch">Pitch</label>
		<input type="range" min="0" max="2" step="0.1" name="pitch" id="pitch" value={settings.pitch} onChange={handleChange}/>
	</div>

  </div>
}