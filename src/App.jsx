
import "./App.css";
import { useState, useRef, useEffect } from "react";
import MyStream from "./MyStream";
import RemoteUser from "./RemoteUser";
// import Child from "./Child";



const twyng = new window.Twyng({
  "clientId": "644754e83c6374bd9ba141a6",
  "apiKey": "83b78e6c50f751d2c1c6e415ef752a3b7f35ff26bc44745f5d9666df56a1d141",
  iceServers: [
    { urls: ['stun:stun.l.google.com:19302'] }
  ]
});


function App() {

  const twyngRef = useRef(null);
  const myVideo = useRef(null);
  const [user, setUser] = useState()
  const [userStream, setUserStream] = useState()
  const [publisherId, setPublisherId] = useState()
  const [remoteStream, setRemoteStream] = useState([])


  if (twyngRef.current === null) {
    twyngRef.current = twyng;
  }


  const addSubscriberNode = (data) => {
    // console.log(data);
    try {
      setRemoteStream((prevStream) => [
        ...prevStream,
        {
          ...data.data
        }
      ])
    } catch (error) {
      console.error(error);
    }
  }

  console.log(remoteStream);

  const join = async (e) => {
    try {
      const randomNumber = Math.floor(Math.random() * (100000 - 10000 + 1)) + 1000;

      const joinerInfo = {
        roomId: 'QWERTY15048401',
        userId: randomNumber.toString() + '-' + Date.now(),
        name: "Urgent join",
        attributes: {
          name: "Hiran"
        }
      }

      setUser(joinerInfo.userId)
      const response = await twyngRef.current.join(joinerInfo)
      if (response.status) {
        e.target.innerHTML = "Joined"
        response.result.streams.forEach((stream) => {
          return addSubscriberNode({ data: stream })
        }
        )

      }
    } catch (error) {
      console.error(error);
    }
  }

  // twyng publisher-----------------

  const publish = async () => {
    try {
      const localStream = await twyngRef.current.createMediastream({ video: "camera" })
      setUserStream(localStream.mediaStream);
      myVideo.current.srcObject = localStream.mediaStream
      let publish = await twyngRef.current.publish(localStream);

      setPublisherId(publish.conference.userId);
      twyng.addEventListener('new-publisher', async (event) => {
        addSubscriberNode(event)
      })

    } catch (error) {
      console.error(error);
    }
  }




  return (
    <div style={{ height: "100", backgroundColor: "whitesmoke" }} className="App">

      <div className="video-container">
        <h4>My Video</h4>
        <MyStream myVideo={myVideo} />
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <div>
          <button onClick={join} id="join-btn">Join</button>
        </div>
        <div>
          <button id="publish-btn" onClick={publish}>Publish</button>
        </div>
      </div>

      <hr />

      <div className="remote-user-videos">
        <h4>Remote video</h4>

        <div id="remote-video-container">
          <div style={{ height: "100%" }} id="layout">
            {
              remoteStream.length > 0 && remoteStream.map((stream, i) => {
                  return <RemoteUser key={i} streams={stream} twyng={twyngRef} />
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
