import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Pull from "./components/Pull";
import TweetList from "./components/TweetList";
import Speech from "./components/Speech";
import Loading from "./components/Loading";
import Settings from "./components/Settings";

function App() {
  console.log(process.env.REACT_APP_FRONT_END_HOST);
  const isLoggedIn = localStorage.getItem("isLoggedIn") || false;

  const [userAccess, setUserAccess] = useState(
    isLoggedIn === "true" ? true : false
  );
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      axios
        .get(`${process.env.REACT_APP_BACK_END_HOST}/validate`, {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": process.env.REACT_APP_FRONT_END_HOST,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === "valid") {
            setUserAccess(true);
            localStorage.setItem("isLoggedIn", true);
          } else {
            setUserAccess(false);
            localStorage.removeItem("isLoggedIn");
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Header userAccess={userAccess} setUserAccess={setUserAccess} />
        {/* <Loading /> */}
        {userAccess && <Speech tweets={tweets} setTweets={setTweets} />}
        <Settings />
        {!userAccess && <Auth />}
        {/* <Pull /> */}
        {userAccess && <TweetList tweets={tweets} setTweets={setTweets} />}
      </header>
    </div>
  );
}

export default App;
