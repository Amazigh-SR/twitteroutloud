import axios from "axios";
import mockData from "./mockData";

export default function threadHelper(timelineArray) {
  const isThread = (tweetObject) => {
    if (tweetObject.in_reply_to_user_id === tweetObject.user.id) {
      return true;
    } else {
      return false;
    }
  };

  const repliedToSelfInConversation = (conversationObject) => {
    if (
      conversationObject.author_id === conversationObject.in_reply_to_user_id
    ) {
      return true;
    } else {
      return false;
    }
  };

  const tweetOrganizer = async function (timelineArray) {
    const arrayOfThreadTweetIDs = [];
    const arrayOfConversationIDs = [];
    const arrayOfThreadedTweets = [];

    // loop through timeline array
    timelineArray.forEach((tweetObject) => {
      // find tweets that are part of threads
      if (isThread(tweetObject)) {
        // get the ids of the tweets that are part of threads
        arrayOfThreadTweetIDs.push(tweetObject.id_str);
      }
    });

    const tweets2Params = arrayOfThreadTweetIDs.join(",");
    // console.log("tweets2Params:", tweets2Params);
    axios
      .get(`${process.env.REACT_APP_BACK_END_HOST}/tweets2/${tweets2Params}`, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_FRONT_END_HOST,
        },
      })
      .then((res) => {
        conversationIDsToTweets(res.data);
      });

    const conversationIDsToTweets = (conversationObject) => {
      conversationObject.data.forEach((tweet) => {
        axios
          .get(
            `${process.env.REACT_APP_BACK_END_HOST}/thread/${tweet.conversation_id}`,
            {
              withCredentials: true,
              headers: {
                "Access-Control-Allow-Origin":
                  process.env.REACT_APP_FRONT_END_HOST,
              },
            }
          )
          .then((res) => {
            if (res.data.data !== undefined) {
              res.data.data.forEach((response) => {
                if (repliedToSelfInConversation(response)) {
                  arrayOfThreadedTweets.push(response);
                }
              });
            }

            getAndInsertRootTweets(arrayOfThreadedTweets);
          });
      });
    };

    const getAndInsertRootTweets = (arrayOfThreadedTweets) => {
      const threadedTweetsWithRoot = [];

      arrayOfThreadedTweets.forEach((tweet) => {
        if (tweet.id) {
          threadedTweetsWithRoot.push(tweet.id);
        }

        if (tweet.referenced_tweets[0].id) {
          threadedTweetsWithRoot.push(tweet.referenced_tweets[0].id);
        }
      });

      const uniqueThreads = [...new Set(threadedTweetsWithRoot)];

      const orderedThreads = uniqueThreads.reverse();

      const threadArrayObjectified = [];

      orderedThreads.forEach((id) => {
        threadArrayObjectified.push({ id_str: id });
      });

      console.log(threadArrayObjectified);

      return threadArrayObjectified;
    };
  };

  tweetOrganizer(timelineArray);
}
