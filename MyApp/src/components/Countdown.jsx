import {useEffect, useState} from "react";

const convertSeconds = function(seconds) {
  const remainderOfSeconds = seconds % 60;
  const secondsLength = String(remainderOfSeconds).length;
  const minutes = Math.floor(seconds / 60); 
  const minutesLength = String(minutes).length;
  return `${minutesLength > 1 ? minutes : "0" + minutes}:${secondsLength > 1 ? remainderOfSeconds : "0" + remainderOfSeconds}`;
}

export default function Countdown(props) {
  const { setRateLimitExceeded } = props;
  const initialCount = localStorage.getItem("counter");
  const [counter, setCounter] = useState(Number(initialCount) || 900);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
      localStorage.setItem("counter", counter)
    } else {
      setRateLimitExceeded(false);
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