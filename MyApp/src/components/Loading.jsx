import "./Loading.css";

export default function Loading(props) {
  return (
    <>
      <img class="circle loading top" src="twitter_bird.svg" />
        <div class="loading">{props.children}</div>
      {/* <img class="circle loading bottom" src="twitter_bird_flipped.svg" />  */}
    </>
  )

}
