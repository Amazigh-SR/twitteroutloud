export default function Auth() {
  return (
    <div className="auth-container">
      <h2 key="header">Listen to your Twitter feed and give scrolling a break</h2>
      <ul key="list">
      <li key="1">Tweets read by a real life computer</li>
      <li key="2">Twitter themed</li>
      <li key="3">Open sign-ups</li>
      <li key="4">Full web support</li>
      <li key="5">Open source</li>
      <li key="6">Powered by coffee</li>
      </ul>
      <br/>
      <a key="link" href="http://localhost:3001/auth"><button className="btn btn-primary logout" ><i className="bi bi-twitter"></i> Sign in with Twitter</button></a>
    </div>
  );
}
