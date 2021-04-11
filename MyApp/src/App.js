import axios from 'axios';
import { useEffect, useState } from 'react';

import "./App.css";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Pull from "./components/Pull";
import TweetList from "./components/TweetList";

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') || false;
  
  const [userAccess, setUserAccess] = useState(isLoggedIn === "true" ? true : false);
  
  useEffect(() =>{
    if (!isLoggedIn){
      axios.get('http://localhost:3001/validate', {withCredentials: true, headers: {"Access-Control-Allow-Origin": "http://localhost:3000/"}})
        .then(res => {
          console.log(res.data)
          if (res.data === "valid") {
            setUserAccess(true);
            localStorage.setItem('isLoggedIn', true);
          } else {
            setUserAccess(false);
            localStorage.removeItem('isLoggedIn');
          }
        })
        .catch(err => console.error(err))
      }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Header 
          userAccess={userAccess}
          setUserAccess={setUserAccess}
        />
        {!userAccess && <Auth />}
        {/* <Pull /> */}
        {userAccess && <TweetList />}
      </header>
    </div>
  );
}

export default App;
