export default function Auth() {
  return (
    <div className="auth-container">
      <h2>Listen to your Twitter feed and give scrolling a break</h2>
      <ul>
      <li>Tweets read by a real life computer</li>
      <li>Twitter themed</li>
      <li>Open sign-ups</li>
      <li>Full web support</li>
      <li>Open source</li>
      <li>Powered by coffee</li>

      </ul>
      <a href="http://localhost:3001/auth"><button className="btn btn-primary logout" ><i class="bi bi-twitter"></i> Sign in with Twitter</button></a>
    </div>
  );
}
