import { Tweet } from 'react-twitter-widgets';
import { useEffect, useState } from 'react';


const generateNewTweet = function(tweet, nextTrack, isLeft = false) {
  const conditionalClass = isLeft ? ' left-transition' : '';

  return (
        <div key={nextTrack} className={`individualTweet${conditionalClass}`} >
          <Tweet options={{width: 350}} key={tweet.id} tweetId={tweet.id_str}/>
        </div>
      )
  }

export default function TweetList(props){
  const { tweets, nextTrack, playerMode, PLAY, ONLOAD } = props;

  const [tweetList, setTweetList] = useState([]);
 
  useEffect(()=>{
    // console.log("outside tweetList conditionals => nextTrack: ", nextTrack)
    // console.log(playerMode)

    if (nextTrack !== -1 && (playerMode === PLAY || playerMode === ONLOAD)) {
      //nextTrack !== -1 => When we are calling previous, or stop early in the utterance queue nextTrack will be set to -1 - we don't want to update in this case
      // appMode !== STOP => when mode is  we should STOP should not advance the carousel
      
      const tweetListIndices = tweetList.map(tweet=> Number(tweet.key));
      // console.log("Tweetlist keys: ", tweetListIndices)
      // console.log("inside Tweetlist conditionals => nextTrack : ", nextTrack)
      // console.log(playerMode)

      if (tweetList.length < 1){
        //Will only happen on page load
        setTweetList(prev=>[...prev, generateNewTweet(tweets[nextTrack], nextTrack), generateNewTweet(tweets[nextTrack+1], nextTrack+1)])

      } else if (tweetList.length === 2 && nextTrack + 1 < tweets.length && nextTrack > 0) {
        // the condition nextTrack > 0 avoids a situation where play is called from stop and nextTrack is 1
        setTweetList(prev=>[...prev, generateNewTweet(tweets[nextTrack+1], nextTrack+1)])

      } else if (tweetList.length === 3 && nextTrack === 0 && tweetListIndices[0] === 0){
        // we use the condition nextTrack === 0 and then check the head of tweetList indices because this can happen when previous is called while tracks[1] is being read
        setTweetList(prev=>[...prev.slice(0,2)])

      } else if (tweetList.length === 3 && nextTrack === 1 && tweetListIndices[0] === 1) {
        //this last corner case is caused when track[2] is being read and previous is called
        setTweetList(prev=>[generateNewTweet(tweets[nextTrack-1], nextTrack-1, true), ...prev.slice(0,2)])

      } else if (tweetList.length === 3 && nextTrack !== 0) {

        if (tweetListIndices[2] === nextTrack){
          //when next is called
          
          if(nextTrack + 1 >= tweets.length) {
            //! conditionally apply css to tweetComponent
            // when nextTrack + 1 is undefined
            setTweetList(prev=>[...prev.slice(1)])

          } else {
            setTweetList(prev=>[...prev.slice(1), generateNewTweet(tweets[nextTrack+1], nextTrack+1)])

          }

        } else if(tweetListIndices[0] === nextTrack) {
          //when previous is called with a full queue
          setTweetList(prev=>[generateNewTweet(tweets[nextTrack-1], nextTrack-1, true), ...prev.slice(0,2)])

        } 
      }
    }
  },[nextTrack, playerMode])
  
  return (
    <div className="tweetComponent">
      {tweetList}
    </div>
  )
}