import Cookies from "js-cookie";

export default function Header(props) {
  return (<nav>
    <h1 className="nav">#TwitterOutLoud 🔊</h1>
    
    <div className="signInOrOut">

    {!props.userAccess && <a href="http://localhost:3001/auth"><img src="../../sign-in-with-twitter-link.png" alt="Sign in with Twitter" /></a>}

    {props.userAccess && <a href="http://localhost:3000"><button onClick={Cookies.remove("userAccess")} className="btn btn-primary logout">Logout 👋</button></a>}

    {console.log("props.userAccess: ", props.userAccess)}

    </div>




  </nav>)
}