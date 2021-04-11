import "./App.css";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Pull from "./components/Pull";
import TweetList from "./components/TweetList";
import Cookies from "js-cookie";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header userAccess={Cookies.get("userAccess")} />
        {!Cookies.get("userAccess") && <Auth />}
        {/* <Pull /> */}
        {Cookies.get("userAccess") && <TweetList />}
        {/* {console.log(Cookies.set("name", "value"))} */}
        {console.log("Cookies.get(): ", Cookies.get())}
      </header>
    </div>
  );
}

export default App;
