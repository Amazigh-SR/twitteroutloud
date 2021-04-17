export default function Welcome() {
  const username = localStorage.getItem("username");
  const image_url = localStorage.getItem("image_url");

  return <div 
            style={{display: "-webkit-inline-box", marginTop: "9px"}} 
            id="welcomeComponent">
          <h4 style={{marginRight: "15px"}}>@{username}</h4>
          <img 
            style={{borderRadius: "100px"}} 
            id="profileImage" 
            src={image_url} 
            alt="profile"/>
          </div>
}