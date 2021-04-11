import axios from 'axios';
import { useEffect } from 'react';

export default function Header(props) {

  const deleteSession = function() {
    console.log("I am delet")
    axios.delete('http://localhost:3001/session', {withCredentials: true, headers: {"Access-Control-Allow-Origin": "http://localhost:3000/"}})
    .then(res => {
      console.log(res)
      props.setUserAccess(false);
    })
    .catch(err => console.error(err))
  };

  return (<nav>
    <h1 className="nav">#TwitterOutLoud 🔊</h1>
    
    <div className="signInOrOut">

    {!props.userAccess && <a href="http://localhost:3001/auth"><img src="../../sign-in-with-twitter-link.png" alt="Sign in with Twitter" /></a>}

    {props.userAccess && <button onClick={()=>deleteSession()} className="btn btn-primary logout">Logout 👋</button>}

    {console.log("props.userAccess: ", props.userAccess)}

    </div>




  </nav>)
}