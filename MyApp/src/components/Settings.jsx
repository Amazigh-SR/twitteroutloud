import "../App.css";

export default function Settings(props) {
  console.log("props: ", props);

  function handleChange(evt) {
    const value = Number(evt.target.value);
    props.setSettings((prev) => ({
      ...prev,
      [evt.target.name]: (value),
    }));
  }

  return (
    <div className="settingsComponent">
      <div class="option">
        <label for="voice">Voice</label>
        <select name="voice" id="voice" onChange={handleChange}>
          <option value="0">NameA</option>
          <option value="1">NameB</option>
          <option value="2">NameC</option>
          <option value="3">NameD</option>
          <option value="4">NameE</option>
          <option value="5">NameF</option>
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
      </div>
    </div>
  );
}
