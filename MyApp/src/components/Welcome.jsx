export default function Welcome(props) {
  // console.log("welcome props: ", props)
  return <div 
            style={{display: "-webkit-inline-box", marginTop: "9px"}} 
            id="welcomeComponent">
          {props.userData.row && <h4 style={{marginRight: "15px"}}>Logged in as @{props.userData.row.username}</h4>}
          {props.userData.row && <img 
            style={{borderRadius: "100px"}} 
            id="profileImage" 
            src={props.userData.row.image_url} 
            alt="profile"/> }
          </div>
}