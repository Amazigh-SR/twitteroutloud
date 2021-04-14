import axios from "axios";

export default function getTweets() {
  return axios.get(`${process.env.REACT_APP_BACK_END_HOST}/tweets`, {
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": process.env.REACT_APP_FRONT_END_HOST,
    },
  })
    .then(res => res.data)
}
