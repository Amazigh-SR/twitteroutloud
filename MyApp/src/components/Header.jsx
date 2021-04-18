import axios from "axios";
// import Welcome from './Welcome'

export default function Header(props) {
  const image_url = localStorage.getItem("image_url");
  const username = localStorage.getItem("username");

  const { userAccess, setUserAccess, settings } = props;

  const deleteSession = function () {
    axios
      .delete(`${process.env.REACT_APP_BACK_END_HOST}/session`, {
        data: { ...settings, voice: settings.voice.name },
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_FRONT_END_HOST,
        },
      })
      .then((res) => {
        setUserAccess(false);
        localStorage.removeItem("isLoggedIn");
        for (const [key] of Object.entries(settings)) {
          localStorage.removeItem(key);
        }
        localStorage.removeItem("username");
        localStorage.removeItem("image_url");
        localStorage.removeItem("counter");
        window.speechSynthesis.cancel();
      })
      .catch((err) => console.error(err));
  };

  return (
    <nav>
      <h1 className="nav">
        #TwitterOutLoud{" "}
        <i style={{ marginLeft: "10px" }} className="fas fa-volume-up"></i>
      </h1>

      <div className="signInOrOut">
        {!userAccess && (
          <a href={`${process.env.REACT_APP_BACK_END_HOST}/auth`}>
            <button id="header-top-sign-in" className="btn btn-primary logout">
              <i className="bi bi-twitter"></i> Sign in with Twitter
            </button>
          </a>
        )}

        <div>
          {userAccess && image_url && (
            <img
              style={{ borderRadius: "100px", marginRight: "15px" }}
              src={image_url}
              alt="user"
            />
          )}
        </div>
        {userAccess && (
          <button
            onClick={() => deleteSession()}
            className="btn btn-primary logout"
          >
            Logout {username ? "@" + username : ""} 👋
          </button>
        )}
      </div>
    </nav>
  );
}
