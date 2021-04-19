import {useEffect, useState} from "react";

const convertSeconds = function(seconds) {
  const remainderOfSeconds = seconds % 60;
  const secondsLength = String(remainderOfSeconds).length;
  const minutes = Math.floor(seconds / 60); 
  const minutesLength = String(minutes).length;
  return `${minutesLength > 1 ? minutes : "0" + minutes}:${secondsLength > 1 ? remainderOfSeconds : "0" + remainderOfSeconds}`;
}

export default function Countdown(props) {
  const { timeoutMessage, setTimeoutMessage } = props;
  const initialCount = localStorage.getItem("counter");
  const defaultTimeout = timeoutMessage === "Rate limit exceeded: try again later!" ? 900 : 300;
  const [counter, setCounter] = useState(Number(initialCount) || defaultTimeout);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
      localStorage.setItem("counter", counter)
    } else {
      setTimeoutMessage("");
      localStorage.removeItem("counter");
    }
  }, [counter]);

  return (
    <>
      {/* <h1>Rate Limit Exceeded</h1> */}
      <div>{convertSeconds(counter)}</div>
    </>  
  );
}