
import "./App.css";
import { useState, useRef, useEffect } from "react";
import MyStream from "./MyStream";
import RemoteUser from "./RemoteUser";
// import Child from "./Child";
// import { options } from "./utils/options"
import ChatCtrl from "./ChatCtrl";


const twyng = new window.Twyng({
  "clientId": "644754e83c6374bd9ba141a6",
  "apiKey": "83b78e6c50f751d2c1c6e415ef752a3b7f35ff26bc44745f5d9666df56a1d141",
  iceServers: [
    { urls: ['stun:stun.l.google.com:19302'] }
  ]
});

const options = {
  maxRatio: 3 / 2,             // The narrowest ratio that will be used (default 2x3)
  minRatio: 9 / 16,            // The widest ratio that will be used (default 16x9)
  fixedRatio: false,         // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
  scaleLastRow: true,        // If there are less elements on the last row then we can scale them up to take up more space
  alignItems: 'center',      // Can be 'start', 'center' or 'end'. Determines where to place items when on a row or column that is not full
  bigClass: "OT_big",        // The class to add to elements that should be sized bigger
  bigPercentage: 0.8,        // The maximum percentage of space the big ones should take up
  minBigPercentage: 0,       // If this is set then it will scale down the big space if there is left over whitespace down to this minimum size
  bigFixedRatio: false,      // fixedRatio for the big ones
  bigScaleLastRow: true,     // scale last row for the big elements
  bigAlignItems: 'center',   // How to align the big items
  smallAlignItems: 'center', // How to align the small row or column of items if there is a big one
  maxWidth: Infinity,        // The maximum width of the elements
  maxHeight: Infinity,       // The maximum height of the elements
  smallMaxWidth: Infinity,   // The maximum width of the small elements
  smallMaxHeight: Infinity,  // The maximum height of the small elements
  bigMaxWidth: Infinity,     // The maximum width of the big elements
  bigMaxHeight: Infinity,    // The maximum height of the big elements
  bigMaxRatio: 3 / 2,          // The narrowest ratio to use for the big elements (default 2x3)
  bigMinRatio: 9 / 16,         // The widest ratio to use for the big elements (default 16x9)
  bigFirst: true,            // Whether to place the big one in the top left (true) or bottom right (false).                              // You can also pass 'column' or 'row' to change whether big is first when you are in a row (bottom) or a column (right) layout
  animate: true,             // Whether you want to animate the transitions using jQuery (not recommended, use CSS transitions instead)
  window: window,            // Lets you pass in your own window object which should be the same window that the element is in
  ignoreClass: 'OT_ignore',  // Elements with this class will be ignored and not positioned. This lets you do things like picture-in-picture
  onLayout: null,            // A function that gets called every time an element is moved or resized, (element, { left, top, width, height }) => {} 
};

function Main() {

  const twyngRef = useRef(null);
  const [currentPinned, setCurrentPinned] = useState()
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
  const addSubscriberNode = async (data) => {
    try {
      if (data.data) {
        let sub = await twyngRef.current.subscribe(data.data)
        if (sub.streamInfo.mediaSource.videoSourceInfo.name === "screen") {
          setCurrentPinned(sub.streamId)
        };
      }
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
        name: "Hiran Raj",
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
        response.result.streams.forEach(async (stream) => {
          return addSubscriberNode({ data: stream })
        }
        )
      }


      const localStream = await twyngRef.current.createMediastream({ video: "camera", audio: "mic" })
      setUserStream(localStream.mediaStream);
      let publish = await twyngRef.current.publish(localStream);
      setPublishedStream(publish);
      console.log(publish);
      setPublisherId(publish.conference.userId);
      twyngRef.current.addEventListener('new-publisher', async (event) => {
        addSubscriberNode(event)
      })
      setPublishStatus(false)
    } catch (error) {
      console.error(error);
    }
  }

  screenSharePublish?.localStream?.mediaStream.addEventListener("ended", (event) => {
    console.log(event, "event res");
  })
  onended = (event) => {
    console.log(event, "onended event");
  };
  
  // screenSharePublish?.localStream?.mediaStream.onended = () => {
  //   console.log("sharing ended");
  // };
  // twyng publisher-----------------

  // const publish = async () => {
  //   try {
  //     const localStream = await twyngRef.current.createMediastream({ video: "camera", audio: "mic" })
  //     setUserStream(localStream.mediaStream);
  //     // myVideo.current.srcObject = localStream.mediaStream
  //     let publish = await twyngRef.current.publish(localStream);
  //     setPublishedStream(publish);
  //     setPublisherId(publish.conference.userId);
  //     twyng.addEventListener('new-publisher', async (event) => {
  //       addSubscriberNode(event)
  //     })
  //     setPublishStatus(false)

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  console.log(remoteStream);
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

  // useEffect for audio changes
  useEffect(() => {
    if (publishedStream) {
      if (muteAudio === true) {
        publishedStream.mute("audio")
      } if (muteAudio === false) {
        publishedStream.unmute("audio");
      }
    }
  }, [muteAudio])



  const screenShareHandler = async () => {
    if (screenShare) {
      const screenStream = await twyngRef.current.createMediastream({ video: "screen" });
      // console.log(screenStream);
      const screenPublish = await twyngRef.current.publish(screenStream);
      // console.log(screenPublish.conference.userId);
      setCurrentPinned(screenPublish?.conference?.userId)
      setScreenSharePublish(screenPublish)
    } else {

    }
  }

  console.log(screenSharePublish?.localStream?.mediaStream, "screenSharePublish");


  if (screenShare === false) {
    if (screenSharePublish) {
      screenSharePublish.stop()
    }
  }

  useEffect(() => {

    screenShareHandler()

  }, [screenShare])



  //opentok layout
  useEffect(() => {
    updateLayout();
  }, [remoteStream]);

  // remoteStream.forEach((stream) => {
  //   console.log(stream.id);
  // });



  const handleStreamEnd = (data) => {
    const filterRemote = remoteStream.filter((stream) => stream.id !== data.data.id)

    setRemoteStream(filterRemote)
  }
  twyngRef.current.addEventListener("stream-ended", handleStreamEnd);
  console.log(remoteStream);

  window.onbeforeunload = () => twyngRef.current.leave()


  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white", position: "relative" }} className="App">
      <div style={{ display: "flex", gap: "10px", padding: "25px", backgroundColor: "whitesmoke", }} className="myVideo">
        <div>
          <button style={{ padding: "10px 25px", backgroundColor: "Black", border: "none", color: "white" }} onClick={join} id="join-btn">Join</button>
        </div>
        {/* <div >
          {
            publishStatus && <button id="publish-btn" style={{ padding: "10px 25px", backgroundColor: "white", color: "black", border: ".1px solid gray" }} onClick={publish}>Publish</button>
          }
        </div> */}
      </div>
      <hr />
      <div style={{ height: "80vh" }} className="remote-user-videos">
        <div style={{ position: "relative", height: "90%", padding: "10px", backgroundColor: "black" }} id="layout">
          {
            remoteStream.length > 0 && remoteStream.map((stream, i) => {
              return <RemoteUser layoutRef={layoutRef} muteAudio={muteAudio} muteVideo={muteVideo} key={i} streams={stream} twyng={twyngRef} setCurrentPinned={setCurrentPinned} currentPinned={currentPinned} />
            })
          }
        </div>
      </div>


      {/* ------------------Controllers--------------------- */}

      {
        remoteStream.length > 0 && <ChatCtrl
          roomId={roomId}
          publisherId={publisherId}
          setMuteAudio={setMuteAudio}
          setMuteVideo={setMuteVideo}
          muteAudio={muteAudio}
          muteVideo={muteVideo}
          setScreenShare={setScreenShare}
          remoteStream={remoteStream}
          setRemoteStream={setRemoteStream}
        />
      }
    </div>
  );
}

export default Main;
