import axios from 'axios';

export default function Header(props) {
  
  const { userAccess, setUserAccess, settings } = props;

  const deleteSession = function() {
    axios.delete(
      `${process.env.REACT_APP_BACK_END_HOST}/session`,
      {data: { ...settings, voice: settings.voice.name,},
        withCredentials: true,
        headers: {"Access-Control-Allow-Origin": process.env.REACT_APP_FRONT_END_HOST}
      }
      )
    .then(res => {
      setUserAccess(false);
      localStorage.removeItem('isLoggedIn')
      for (const [key] of Object.entries(settings)) {
        localStorage.removeItem(key)
      }
      localStorage.removeItem('username')
      localStorage.removeItem('image_url')
    })
    .catch(err => console.error(err))
  };

  return (<nav>
    <h1 className="nav">#TwitterOutLoud 🔊</h1>
    
    <div className="signInOrOut">

    {!userAccess && <a href={`${process.env.REACT_APP_BACK_END_HOST}/auth`}><button className="btn btn-primary logout" ><i className="bi bi-twitter"></i> Sign in with Twitter</button></a>}

    {userAccess && <button onClick={()=>deleteSession()} className="btn btn-primary logout">Logout 👋</button>}

    </div>




  </nav>)
}