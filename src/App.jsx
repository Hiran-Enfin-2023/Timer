
import "./App.css";
import { useState, useEffect, useRef } from "react";
// import Child from "./Child";

function App() {


  // const options = {
  //   maxRatio: 3 / 2,             // The narrowest ratio that will be used (default 2x3)
  //   minRatio: 9 / 16,            // The widest ratio that will be used (default 16x9)
  //   fixedRatio: false,         // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
  //   scaleLastRow: true,        // If there are less elements on the last row then we can scale them up to take up more space
  //   alignItems: 'center',      // Can be 'start', 'center' or 'end'. Determines where to place items when on a row or column that is not full
  //   bigClass: "OT_big",        // The class to add to elements that should be sized bigger
  //   bigPercentage: 0.8,        // The maximum percentage of space the big ones should take up
  //   minBigPercentage: 0,       // If this is set then it will scale down the big space if there is left over whitespace down to this minimum size
  //   bigFixedRatio: false,      // fixedRatio for the big ones
  //   bigScaleLastRow: true,     // scale last row for the big elements
  //   bigAlignItems: 'center',   // How to align the big items
  //   smallAlignItems: 'center', // How to align the small row or column of items if there is a big one
  //   maxWidth: Infinity,        // The maximum width of the elements
  //   maxHeight: Infinity,       // The maximum height of the elements
  //   smallMaxWidth: Infinity,   // The maximum width of the small elements
  //   smallMaxHeight: Infinity,  // The maximum height of the small elements
  //   bigMaxWidth: Infinity,     // The maximum width of the big elements
  //   bigMaxHeight: Infinity,    // The maximum height of the big elements
  //   bigMaxRatio: 3 / 2,          // The narrowest ratio to use for the big elements (default 2x3)
  //   bigMinRatio: 9 / 16,         // The widest ratio to use for the big elements (default 16x9)
  //   bigFirst: true,            // Whether to place the big one in the top left (true) or bottom right (false).                              // You can also pass 'column' or 'row' to change whether big is first when you are in a row (bottom) or a column (right) layout
  //   animate: true,             // Whether you want to animate the transitions using jQuery (not recommended, use CSS transitions instead)
  //   window: window,            // Lets you pass in your own window object which should be the same window that the element is in
  //   ignoreClass: 'OT_ignore',  // Elements with this class will be ignored and not positioned. This lets you do things like picture-in-picture
  //   onLayout: null,            // A function that gets called every time an element is moved or resized, (element, { left, top, width, height }) => {} 
  // };

  // const videoRef = useRef(null);

  // const updateLayout = () => {
  //   if (videoRef.current === null) {
  //     const name = window.initLayoutContainer(document.getElementById("layout"), options);
  //     name.layout();
  //     videoRef.current = name;
  //   } else {
  //     videoRef.current.layout();
  //   }
  // }



  // const [state, setState] = useState(0);
  // const [divIds, setDivIds] = useState([]);

  // const add = () => {
  //   setState((state) => state + 1)
  //   setDivIds(prevIds => [...prevIds, state]);
  // }



  // useEffect(() => {
  //   updateLayout()
  // }, [divIds])


  // const [users,setUsers] = use

  const myVideo = useRef(null);

  const twyngRef = useRef(null);
  const publisherRef = useRef(null)
  const remoteVideo = useRef(null)




  const [showSubscribeBtn, setShowSubscribeBtn] = useState(false)
  const [joined, setJoined] = useState(false)
  // const [userStream, setUserStream] = useState()
  const [publisherId, setPublisherId] = useState()
  const [remoteStream, setRemoteStream] = useState([])

  const twyng = new window.Twyng({
    "clientId": "644754e83c6374bd9ba141a6",
    "apiKey": "83b78e6c50f751d2c1c6e415ef752a3b7f35ff26bc44745f5d9666df56a1d141",
    iceServers: [
      { urls: ['stun:stun.l.google.com:19302'] }
    ]
  });

  if (twyngRef.current === null) {
    twyngRef.current = twyng;
  }




  const subscribe = async () => {

    console.log();
    let subscription = await twyngRef.current.subscribe(publisherRef.current)
    const remoteStream = subscription.mediaStream
    // console.log(remoteStream);
    remoteVideo.current.srcObject = remoteStream

  }

  const addSubscriberNode = (stream) => {
    // console.log(JSON.stringify(data.publisherId));
    publisherRef.current = stream
    const streamId = document.getElementById('stream-id')
    streamId.innerHTML = `streamId: ${stream.id}`
    console.log(stream);
    // setRemoteStream((prev) =>
    //   [...prev, stream]
    // )
  }


  console.log(remoteStream);


  const join = async (e) => {
    try {
      const randomNumber = Math.floor(Math.random() * (100000 - 10000 + 1)) + 1000;

      const joinerInfo = {
        roomId: 'QWERTY15048401',
        userId: randomNumber.toString() + '-' + Date.now(),
        name: "Hiran",
        attributes: {
          name: "Hiran"
        }
      }

      const response = await twyng.join(joinerInfo)
      // console.log("twyng join response" + " " + JSON.stringify(response.result));
      if (response.status) {
        e.target.innerHTML = "Joined"
        console.log(response.result);
        response.result.streams.forEach((stream) => {
          addSubscriberNode(stream)

        }
        )

      }

    } catch (error) {
      console.error(error);
    }


  }



  const publish = async () => {
    const localStream = await twyng.createMediastream({ video: "camera" })
    // setUserStream(localStream.mediaStream);
    console.log(localStream);
    const publication = await twyng.publish(localStream)
    console.log(publication);
    setPublisherId(publication.conference.userId)
    publication.addEventListener('error', (err) => {
      console.log("publication err", err)
    })
    myVideo.current.srcObject = localStream.mediaStream;
    // const publishBtn = document.getElementById("publish-btn");
    // publishBtn.innerHTML = "Published";
    setShowSubscribeBtn(true)


    twyng.addEventListener('new-publisher', async (event) => {
      // console.log("new-publisher entered ")
      addSubscriberNode(event.data)
    })

  }




  return (
    <div style={{ height: "100vh", backgroundColor: "whitesmoke" }} className="App">
      {/* 
      <div style={{ height: "50px" }} className="controls">
        <button onClick={add} style={{ marginTop: "10px", backgroundColor: "green", border: "none", marginLeft: "10px", padding: "5px" }}>Add</button>
      </div>

   

      <div style={{ backgroundColor: "gray", height: "90%" }}>


        <div style={{ height: "100%", backgroundColor: "black" }} id="layout">
         
          {
            divIds.map((v, i) => (

              <Child key={i} id={v} divs={divIds} setDiv={setDivIds} />

            ))
          }
        </div>




      </div> */}



      <div className="video-container">
        <h4>Me</h4>
        <video style={{ width: "400px", borderRadius: "10px" }} id="my-video" autoPlay ref={myVideo} src=""></video>
        <div className="btns">
          {/* <button onClick={() => setAudio("inactive" ? "active" : "inactive")}>Mute</button>
          <button>Video</button> */}
        </div>
      </div>
      <div>
        <ol>
          <div>
            <button onClick={join} id="join-btn">Join</button>
          </div>
          <div>
            <button id="publish-btn" onClick={publish}>Publish</button>
          </div>

        </ol>
      </div>

      <hr />

      <div className="remote-user-videos">
        <h4>Remote video</h4>


        <ol id="remote-video-container">
        
                <li>
                  <div>
                    <h5 id="stream-id"></h5>
                    {
                      showSubscribeBtn && <button id="sub-btn" onClick={subscribe}>subscribe</button>
                    }
                  </div>
                  <video style={{ width: "400px", borderRadius: "10px" }} id="remote-video" autoPlay ref={remoteVideo}></video>
                </li>
          
          {/* <video style={{ width: "400px", borderRadius: "10px" }} id="remote-video" autoPlay ref={remoteVideo} src="" /> */}


        </ol>
      </div>



    </div>
  );
}

export default App;
