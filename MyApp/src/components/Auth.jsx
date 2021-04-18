export default function Auth() {
  return (
    <div id="auth-container">
      <div id="auth-image">
        {" "}
        <img src="bird_headphones.png" alt="bird_headphones_logo" />
      </div>
      <div id="auth-header-text">
        <p>Give scrolling a break.</p>
        <p>
          <span>
            {" "}
            <strong>Listen</strong>{" "}
          </span>{" "}
          to your Twitter feed instead!
        </p>
      </div>
      <div id="auth-list">
        <div className="list-features">
          <ul>
            <li>Hands free Twitter</li>
            <li>Play, pause, and navigate with voice control</li>
            <li> Have your Tweets read to you</li>
          </ul>
        </div>
        <div className="list-features">
          <ul>
            <li>Increasing accessibility and usability</li>
            <li>Choose your mode - thread and binge</li>
            <li>Open Source</li>
          </ul>
        </div>
      </div>
      <div id="auth-options">
        <button className="btn auth">
          {" "}
          <a href={`${process.env.REACT_APP_BACK_END_HOST}/auth`}>
            Sign in with Twitter
          </a>
        </button>
        {/* <button className="btn">
          <a href="https://mobile.twitter.com/i/flow/signup">Sign up</a>
        </button> */}
      </div>
    </div>
  );
}
