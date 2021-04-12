import "./Loading.css";

export default function Loading(props) {
  return (
    <>
      <img className="circle loading top" src="twitter_bird.svg" alt="twitter bird" />
        <div className="loading">{props.children}</div>
      {/* <img className="circle loading bottom" src="twitter_bird_flipped.svg" alt="twitter bird" />  */}
    </>
  )

}
