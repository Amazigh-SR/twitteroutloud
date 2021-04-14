export default function diffTweets(oldTweets, newTweets) {
  console.log("oldTweets: ", oldTweets)
  console.log("newTweets: ", newTweets)
  return oldTweets = [...oldTweets, ...newTweets.filter(tweet => {
    for (const oldTweetsTweet of oldTweets) {
      if (tweet.id_str === oldTweetsTweet.id_str) {
        return false
      }
    }
    return true
  })]
}