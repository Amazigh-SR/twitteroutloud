import axios from "axios";
import { useEffect, useState } from "react";
import fetchEnVoices from "./helpers/fetchEnVoices";
import threadHelper from "./helpers/threadHelpers";
import getTweets from "./helpers/getTweets";
import { useAppMode, appModeConstants } from "./hooks/useAppMode";

import "./App.css";

import Auth from "./components/Auth";
import Header from "./components/Header";
import TweetList from "./components/TweetList";
import Speech from "./components/Speech";
import Loading from "./components/Loading";
import Welcome from "./components/Welcome";

function App() {
  const { CURATE, BINGE, THREAD } = appModeConstants;

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true" ? true : false;
  const [userAccess, setUserAccess] = useState(isLoggedIn);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({});
  const [voices, setVoices] = useState([]);
  const [appMode, setAppMode] = useState(BINGE);

  // useEffect(() => {
  //   // if(MODE ==="Thread")
  //   getTweets(tweets).then((tweets) => {
  //     threadHelper(tweets).then((tweets) => {
  //       console.log("Line 28 of App => Tweets: ", tweets);
  //       setTweets(tweets);
  //     });
  //   });
  // }, []);

  useEffect(() => {
    const handleWindowClose = function () {
      window.speechSynthesis.cancel();
    };

    window.addEventListener("onbeforeunload", handleWindowClose);

    if (!isLoggedIn) {
      axios
        .get(`${process.env.REACT_APP_BACK_END_HOST}/validate`, {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": process.env.REACT_APP_FRONT_END_HOST,
          },
        })
        .then((res) => {
          const { valid, dbSettings, profile } = res.data;
          if (valid) {
            const { username, image_url } = profile;

            setUserAccess(valid);
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("username", username);
            localStorage.setItem("image_url", image_url);
            for (const [key, value] of Object.entries(dbSettings)) {
              localStorage.setItem(key, value);
            }
            fetchEnVoices(
              window.speechSynthesis,
              setVoices,
              setSettings,
              dbSettings
            );
          } else {
            setUserAccess(valid);
            //!  we need to look at the error that this code is causing
            // localStorage.removeItem("isLoggedIn");
            // for (const [key] of Object.entries(settings)) {
            //   localStorage.removeItem(key);
            // }
            // localStorage.removeItem("username");
            // localStorage.removeItem("image_url");
            setTimeout(() => setLoading(false), 1000);
          }
          return res.data;
        })
        .then((data) => {
          if (data.valid) {
            // IF BASED ON MODE:

            return getTweets().then((tweets) => {
              if (appMode === THREAD) {
                threadHelper(tweets).then((res) => {
                  console.log("res from threadHelper", res);
                  setTweets(res);
                  setTimeout(() => setLoading(false), 1000);
                });
              } else if (appMode === BINGE) {
                setTweets(tweets);
                setTimeout(() => setLoading(false), 1000);
              }

              // threadHelper(tweets);
              // setTweets(tweets);
              // setTimeout(() => setLoading(false), 1000);
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
        voice: localStorage.getItem("voice"),
      };
      fetchEnVoices(
        window.speechSynthesis,
        setVoices,
        setSettings,
        localSettings
      );

      // IF BASED ON MODE

      getTweets()
        .then((tweets) => {
          if (appMode === THREAD) {
            threadHelper(tweets).then((res) => {
              console.log("res from threadHelper", res);
              setTweets(res);
              setTimeout(() => setLoading(false), 1000);
            });
          } else if (appMode === BINGE) {
            setTweets(tweets);
            setTimeout(() => setLoading(false), 1000);
          }
        })
        .catch((err) => console.error(err));
    }

    return window.removeEventListener("onbeforeunload", handleWindowClose);
  }, [appMode]);

  return (
    <div className="App">
      <header className="App-header">
        <Header
          userAccess={userAccess}
          setUserAccess={setUserAccess}
          settings={settings}
        />
        {userAccess && <Welcome />}
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
            appMode={appMode}
            setAppMode={setAppMode}
            setLoading={setLoading}
          />
        )}
        {!loading && !userAccess && <Auth />}
        {/* {!loading && userAccess && <TweetList tweets={tweets} />} */}
      </header>
    </div>
  );
}

export default App;
