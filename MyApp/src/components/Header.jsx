import axios from 'axios';

export default function Header(props) {

  const deleteSession = function() {
    axios.delete(`${process.env.REACT_APP_BACK_END_HOST}/session`, {withCredentials: true, headers: {"Access-Control-Allow-Origin": process.env.REACT_APP_FRONT_END_HOST}})
    .then(res => {
      console.log(res)
      props.setUserAccess(false);
      localStorage.removeItem('isLoggedIn')
    })
    .catch(err => console.error(err))
  };

  return (<nav>
    <h1 className="nav">#TwitterOutLoud 🔊</h1>
    
    <div className="signInOrOut">

    {!props.userAccess && <a href={`${process.env.REACT_APP_BACK_END_HOST}/auth`}><img src="../../sign-in-with-twitter-link.png" alt="Sign in with Twitter" /></a>}

    {props.userAccess && <button onClick={()=>deleteSession()} className="btn btn-primary logout">Logout 👋</button>}

    {console.log("props.userAccess: ", props.userAccess)}

    </div>




  </nav>)
}