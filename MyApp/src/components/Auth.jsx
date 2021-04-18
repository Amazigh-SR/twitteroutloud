export default function Auth() {
  return (
    <div id="auth-container">
      <div id="auth-image">
        {" "}
        <img src="TOW_logo_auth_page.png" alt="bird_headphones_logo" />
      </div>
      <div id="auth-header-text">
        <h3>Give scrolling a break.</h3>
        <h3>
          <span>Listen</span> to your Twitter feed instead!
        </h3>
      </div>
      <div id="auth-lis">
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
      <div id="auth-options"></div>
    </div>

    // <div className="auth-container">
    //   <h2 key="header">
    //     Listen to your Twitter feed and give scrolling a break
    //   </h2>
    //   <ul key="list">
    //     <li key="1">Tweets read by a real life computer</li>
    //     <li key="2">Twitter themed</li>
    //     <li key="3">Open sign-ups</li>
    //     <li key="4">Full web support</li>
    //     <li key="5">Open source</li>
    //     <li key="6">Powered by coffee</li>
    //     <li key="6">Play, pause and navigate with voice control </li>
    //   </ul>
    //   <a key="link" href={`${process.env.REACT_APP_BACK_END_HOST}/auth`}>
    //     <button className="btn btn-primary logout">
    //       <i className="bi bi-twitter"></i> Sign in with Twitter
    //     </button>
    //   </a>
    // </div>
  );
}
