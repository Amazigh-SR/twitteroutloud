import axios from "axios";
import { useEffect, useState } from "react";
import fetchEnVoices from "./helpers/fetchEnVoices";
import getTweets from "./helpers/getTweets";

import "./App.css";

import Auth from "./components/Auth";
import Header from "./components/Header";
import TweetList from "./components/TweetList";
import Speech from "./components/Speech";
import Loading from "./components/Loading";
import Welcome from "./components/Welcome";

function App() {
  const voices = fetchEnVoices(window.speechSynthesis);
  const isLoggedIn = localStorage.getItem("isLoggedIn") || false;

  const [userAccess, setUserAccess] = useState(
    isLoggedIn === "true" ? true : false
  );
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    voice: window.speechSynthesis.getVoices()[0],
    volume: 5,
    rate: 1,
    pitch: 1,
  });

  const [userData, setUserData] = useState(localStorage.getItem("userData"));

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
          // console.log("APP.js line 53 -> RES DATA: ", res.data)
          if (res.data.valid) {
            setUserAccess(true);
            localStorage.setItem("isLoggedIn", true);
            setUserData(res.data);
            localStorage.setItem("userData", res.data);
          } else {
            setUserAccess(false);
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userData");
            setTimeout(() => setLoading(false), 1000);
          }
          return res.data;
        })
        .then((data) => {
          if (data.valid) {
            return getTweets().then((tweets) => {
              setTweets(tweets);
              setTimeout(() => setLoading(false), 1000);
            });

            //if x.setting is true setInterval
          }
        })
        .catch((err) => console.error(err));
    }
    if (isLoggedIn) {
      getTweets()
        .then((tweets) => {
          setTweets(tweets);
          setTimeout(() => setLoading(false), 1000);
        })
        .catch((err) => console.error(err));
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <header className="App-header">
        <Header userAccess={userAccess} setUserAccess={setUserAccess} />
        {loading && <Loading>Loading app!</Loading>}
        {!loading && userAccess && <Welcome userData={userData} />}
        {!loading && userAccess && (
          <Speech
            tweets={tweets}
            setTweets={setTweets}
            voices={voices}
            settings={settings}
            setSettings={setSettings}
            userAccess={userAccess}
            setUserAccess={setUserAccess}
            getTweets={getTweets}
          />
        )}
        {!loading && !userAccess && <Auth />}
        {/* {!loading && userAccess && <TweetList tweets={tweets} />} */}
      </header>
    </div>
  );
}

export default App;
