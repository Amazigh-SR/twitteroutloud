import { Tweet } from 'react-twitter-widgets'

export default function TweetList(props){
  const { tweets } = props;

  const tweetList = tweets.map((tweet, index) => <div key={index} className="individualTweet"> <Tweet options={{width: 350}} key={index} tweetId={tweet.id_str}/></div>)
  
  return (<div className="tweetComponent">

  {tweetList}


  </div>
  )
}