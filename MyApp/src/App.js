import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";
import Auth from "./components/Auth";
import Header from "./components/Header";
import TweetList from "./components/TweetList";
import Speech from "./components/Speech";
import Loading from "./components/Loading";
import Settings from "./components/Settings";

function App() {
  // console.log(process.env.REACT_APP_FRONT_END_HOST);
  const isLoggedIn = localStorage.getItem("isLoggedIn") || false;

  const [userAccess, setUserAccess] = useState(
    isLoggedIn === "true" ? true : false
  );
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTweets = function () {
    return axios
      .get(`${process.env.REACT_APP_BACK_END_HOST}/tweets`, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_FRONT_END_HOST,
        },
      })
      .then((tweets) => {
        setTweets(tweets.data);
        setTimeout(() => setLoading(false), 1000);
      });
  };

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
          if (res.data === "valid") {
            setUserAccess(true);
            localStorage.setItem("isLoggedIn", true);
          } else {
            setUserAccess(false);
            localStorage.removeItem("isLoggedIn");
            setTimeout(() => setLoading(false), 1000);
          }
          return res.data;
        })
        .then((data) => {
          if (data === "valid") {
            return getTweets();
          }
        })
        .catch((err) => console.error(err));
    }
    if (isLoggedIn) {
      getTweets().catch((err) => console.error(err));
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <header className="App-header">
        <Header userAccess={userAccess} setUserAccess={setUserAccess} />
        {loading && <Loading>Loading app!</Loading>}
        {!loading && userAccess && (
          <Speech tweets={tweets} setTweets={setTweets} />
        )}
        {!loading && userAccess && <Settings />}
        {!loading && !userAccess && <Auth />}
        {!loading && userAccess && <TweetList tweets={tweets} />}
      </header>
    </div>
  );
}

export default App;
