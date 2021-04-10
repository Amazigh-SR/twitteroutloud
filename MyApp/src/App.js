import logo from "./logo.svg";
import "./App.css";
import Auth from "./components/Auth";
import Pull from "./components/Pull";
import TweetList from "./components/TweetList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Auth />
        <Pull />
        <TweetList />
      </header>
    </div>
  );
}

export default App;
