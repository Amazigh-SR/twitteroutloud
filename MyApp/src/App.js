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

function App() {
  
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  
  const [userAccess, setUserAccess] = useState(
    isLoggedIn === "true" ? true : false
    );
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({});
  const [voices, setVoices] = useState([]);

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
          const {valid, dbSettings, profile} = res.data;
          if (valid) {
            setUserAccess(valid);
            localStorage.setItem("isLoggedIn", true);

            for (const [key, value] of Object.entries(dbSettings)) {
              localStorage.setItem(key, value);
            }
            fetchEnVoices(window.speechSynthesis, setVoices, setSettings, dbSettings)
          } else {
            setUserAccess(valid);
            localStorage.removeItem("isLoggedIn");
            for (const [key] of Object.entries(settings)){
              localStorage.removeItem(key)
            }
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
    } else {
      const localSettings = {
        rate: Number(localStorage.getItem("rate")),
        pitch: Number(localStorage.getItem("pitch")),
        volume: Number(localStorage.getItem("volume")),
        voice: localStorage.getItem("voice")
      }
      fetchEnVoices(window.speechSynthesis, setVoices, setSettings, localSettings)
      getTweets()
        .then((tweets) => {
          setTweets(tweets);
          setTimeout(() => setLoading(false), 1000);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Header userAccess={userAccess} setUserAccess={setUserAccess} settings={settings} />
        {loading && <Loading>Loading app!</Loading>}
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
        {!loading && userAccess && <TweetList tweets={tweets} />}
      </header>
    </div>
  );
}

export default App;
