export default function diffTweets(prev, newTweets) {
  console.log("Prev: ", prev)
  console.log("newTweets: ", newTweets)
  return prev = [...prev, ...newTweets.filter(tweet => {
    for (const prevTweet of prev) {
      if (tweet.id_str === prevTweet.id_str) {
        return false
      }
    }
    return true
  })]
}