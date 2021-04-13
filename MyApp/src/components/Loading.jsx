import "./Loading.css";

export default function Loading(props) {
  return (
    <>
      <img className="circle loading top" src="twitter_bird.svg" alt="twitter bird" />
        <h1 className="loading linear-wipe">{props.children}</h1>
      <img className="circle loading bottom" src="twitter_bird_flipped.svg" alt="twitter bird" /> 
    </>
  )

}
