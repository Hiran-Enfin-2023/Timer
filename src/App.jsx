import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
function App() {


  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [running, setRunning] = useState(false);

  const start = () => {
    setRunning(true);
  };

  useEffect(() => {
    if (running || (minute > 0 && second > 0)) {
      const timer = setInterval(() => {
        if (second === 0) {
          setSecond(60);
          setMinute(minute - 1);
        }
        setSecond((second) => second - 1);

        if(minute <= 0 && second <= 0){
          setRunning(false)
        }

      }, 1000);

      return () => clearInterval(timer);
    }
  }, [start]);

  const resume = () => {
    setRunning(true)
  };

  const reset = () => {
    setRunning(false);
    setMinute(0);
    setSecond(0);
  };

  const pause = () => {
    setRunning(false);
  };

  return (
    <div className="App">
      <div  style={{padding:"25px"}} className="fields">
        <div className="input__fields">
          <label>Minute : </label>
          <input
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            placeholder="minute"
          />
          <label style={{marginLeft:"10px"}}>Second:</label>

          <input
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            placeholder="second"
          />
        </div>

        <div style={{display:"flex", justifyContent:"center", gap:"20px"}}>
          <h4>Minute: {minute}</h4>
          <h4>Second: {second}</h4>
        </div>
      </div>

      <div className="btn__div">
        <button onClick={start}>Start</button>
        <button onClick={reset}>Reset</button>
        {running ? (
          <button onClick={pause}>Pause</button>
        ) : (
          <button onClick={resume}>Resume</button>
        )}
      </div>

    

    </div>
  );
}

export default App;
