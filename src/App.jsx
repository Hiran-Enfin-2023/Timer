
import "./App.css";
import { useState, useRef, useEffect } from "react";
import MyStream from "./MyStream";
import RemoteUser from "./RemoteUser";
// import Child from "./Child";
import { options } from "./utils/options"
import ChatCtrl from "./ChatCtrl";


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
  const displayRef = useRef(null);
  const [user, setUser] = useState()
  const [userStream, setUserStream] = useState();
  const [publishedStream, setPublishedStream] = useState();
  const [publisherId, setPublisherId] = useState()
  const [remoteStream, setRemoteStream] = useState([])
  const [publishStatus, setPublishStatus] = useState(false)
  const [muteAudio, setMuteAudio] = useState(false);
  const [muteVideo, setMuteVideo] = useState(false)
  const [screenShare, setScreenShare] = useState(false)
  const [screenSharePublish, setScreenSharePublish] = useState();
  const [callEnd, setCallEnd] = useState(false)
  const layoutRef = useRef(null)
  const [roomId, setRoomId] = useState()

  if (twyngRef.current === null) {
    twyngRef.current = twyng;
  }


  const updateLayout = () => {
    const layout = window.initLayoutContainer(document.getElementById("layout"), options);
    if (layoutRef.current === null) {
      layoutRef.current = layout;
      layoutRef.current.layout()
    } else {
      layoutRef.current.layout()
    }
  }

  // subscriber node
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




  //twyng join func 
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
      setRoomId(joinerInfo.roomId)
      const response = await twyngRef.current.join(joinerInfo)
      console.log(response, "Join successful");
      if (response.status) {
        e.target.innerHTML = "Joined"
        setPublishStatus(true)
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
      const localStream = await twyngRef.current.createMediastream({ video: "camera", audio: "mic" })
      setUserStream(localStream.mediaStream);
      // myVideo.current.srcObject = localStream.mediaStream
      let publish = await twyngRef.current.publish(localStream);
      setPublishedStream(publish)
      setPublisherId(publish.conference.userId);
      twyng.addEventListener('new-publisher', async (event) => {
        addSubscriberNode(event)
      })
      setPublishStatus(false)

    } catch (error) {
      console.error(error);
    }
  }


  // useEffect for video changes
  useEffect(() => {
    if (publishedStream) {
      if (muteVideo === true) {
        publishedStream.mute("video", userStream)
      }
      if (muteVideo === false) {
        publishedStream.unmute("video")
      }
    }

  }, [muteVideo])


  // const changeDevice = async () => {
  //   const localStream = await twyngRef.current.createMediastream({
  //     video: 'camera',
  //     audio: 'mic'
  //   })

  //   publishedStream.changeDevice(localStream)
  // }


  // useEffect for audio changes
  useEffect(() => {
    if (publishedStream) {
      if (muteAudio === true) {
        publishedStream.mute("audio")

      } if (muteAudio === false) {
        publishedStream.unmute("audio");
        // changeDevice()
      }
    }
  }, [muteAudio])



  const screenShareHandler = async () => {
    if (screenShare) {
      const screenStream = await twyngRef.current.createMediastream({ video: "screen" });
      // console.log(screenStream);
      const screenPublish = await twyngRef.current.publish(screenStream);
      setScreenSharePublish(screenPublish)
    }
  }
  if (screenShare === false) {
    if (screenSharePublish) {
      screenSharePublish.stop()
    }
  }
  // console.log(screenShare);

  useEffect(() => {
    screenShareHandler()
  }, [screenShare])

  console.log(publishedStream);
  console.log(screenSharePublish);

  //opentok layout
  useEffect(() => {
    updateLayout()
  }, [remoteStream]);

  console.log(remoteStream);
  useEffect(() => {

    const handleStreamEnd = (data) => {
      // setRemoteStream((event) => {
      //   event.filter(event.id !== data.data.id)
      // })
      console.log(data.data.id);
    }
    twyngRef.current.addEventListener("stream-ended", handleStreamEnd);
  }, [])

  window.onbeforeunload = () => twyngRef.current.leave()


  return (
    <div style={{ minHeight: "100vh", backgroundColor: "whitesmoke", position: "relative" }} className="App">

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className="myVideo">


        {/* <div className="video-container">
          <h4>My Video</h4> */}
        {/* <MyStream
            myVideo={myVideo}
            setMuteAudio={setMuteAudio}
            setMuteVideo={setMuteVideo}
            muteAudio={muteAudio}
            muteVideo={muteVideo}
            setScreenShare={setScreenShare}
            setCallEnd={setCallEnd} /> */}
        {/* </div> */}

        <div style={{ display: "flex", gap: "10px", margin: "20px" }}>
          <div>
            <button style={{ padding: "10px 25px", backgroundColor: "Black", border: "none", color: "white" }} onClick={join} id="join-btn">Join</button>
          </div>
          <div >
            {
              publishStatus && <button id="publish-btn" style={{ padding: "10px 25px", backgroundColor: "white", color: "black", border: ".1px solid gray" }} onClick={publish}>Publish</button>
            }
          </div>
        </div>

      </div>



      <hr />

      <div style={{ height: "80%", width: "100%", backgroundColor: "red", }} className="remote-user-videos">

        <div style={{ position: "relative" , height:"75%", backgroundColor:"red"}} id="layout">
          {
            remoteStream.length > 0 && remoteStream.map((stream, i) => {
              return <RemoteUser muteAudio={muteAudio} muteVideo={muteVideo} key={i} streams={stream} twyng={twyngRef} />
            })
          }
        </div>

      </div>

      {/* ------------------Controllers--------------------- */}

      {
        remoteStream.length > 0 && <ChatCtrl
          roomId={roomId}
          myVideo={myVideo}
          setMuteAudio={setMuteAudio}
          setMuteVideo={setMuteVideo}
          muteAudio={muteAudio}
          muteVideo={muteVideo}
          setScreenShare={setScreenShare}
          setCallEnd={setCallEnd}
        />}


    </div>
  );
}

export default App;
