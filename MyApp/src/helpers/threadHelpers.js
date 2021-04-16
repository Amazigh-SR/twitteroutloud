import axios from "axios";
import mockData from "./mockData";

const isThread = (tweetObject) => {
  if (tweetObject.in_reply_to_user_id === tweetObject.user.id) {
    return true;
  } else {
    return false;
  }
};

const repliedToSelfInConversation = (conversationObject) => {
  if (conversationObject.author_id === conversationObject.in_reply_to_user_id) {
    return true;
  } else {
    return false;
  }
};

//--------------------------------------------------------------------//
//--------------------------------------------------------------------//

export default async function threadHelper(timelineArray) {
  const arrayOfThreadTweetIDs = [];
  const arrayOfConversationIDs = [];
  const arrayOfThreadedTweets = [];

  // console.log("timelineArray: " + timelineArray);

  // loop through timeline array
  timelineArray.forEach((tweetObject) => {
    // find tweets that are part of threads
    if (isThread(tweetObject)) {
      // get the ids of the tweets that are part of threads
      arrayOfThreadTweetIDs.push(tweetObject.id_str);
    }
  });

  const getAndInsertRootTweets = function (arrayOfThreadedTweets) {
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

    if (orderedThreads.length > 99) {
      orderedThreads.splice(98);
    }

    // orderedThreads.length = 99;

    const queryForTweetText = orderedThreads.join(",");

    return axios
      .get(
        `${process.env.REACT_APP_BACK_END_HOST}/tweets2/${queryForTweetText}`,
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": process.env.REACT_APP_FRONT_END_HOST,
          },
        }
      )
      .then((res) => {
        console.log(res);

        const includeID_str = [];

        res.data.data.forEach((tweet) =>
          includeID_str.push({
            ...tweet,
            id_str: tweet.id,
            full_text: tweet.text,
          })
        );

        console.log(includeID_str);
        // threadArrayObjectified = res;
        return includeID_str;
        // return threadArrayObjectified;
      });
  };

  const conversationIDsToTweets = (conversationObject) => {
    const promiseMap = conversationObject.data.map((tweet) => {
      return axios
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
          // console.log("res from 108 THREADHELPERS ", res);
          if (res.data.data !== undefined) {
            res.data.data.forEach((response) => {
              //if part of thread (and not other user reply)
              if (repliedToSelfInConversation(response)) {
                arrayOfThreadedTweets.push(response);
                // console.log("arrayOfThreadedTweets: ", arrayOfThreadedTweets);
              }
            });
          }
        });
    });

    return Promise.all(promiseMap).then(() => {
      return getAndInsertRootTweets(arrayOfThreadedTweets);
    });
  };

  const tweets2Params = arrayOfThreadTweetIDs.join(",");

  return axios
    .get(`${process.env.REACT_APP_BACK_END_HOST}/tweets2/${tweets2Params}`, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_FRONT_END_HOST,
      },
    })
    .then((res) => {
      return conversationIDsToTweets(res.data);
    });

  // return threadArrayObjectified;
}

// console.log(threadHelper(mockData));
