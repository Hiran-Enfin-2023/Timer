import React from 'react'
import { ImPhoneHangUp } from "react-icons/im"
import { BsFillMicFill, BsFillPeopleFill, BsFillMicMuteFill, BsFillCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs"
import { LuScreenShare } from "react-icons/lu"
import { MdMessage } from "react-icons/md"
function ChatCtrl({ roomId, publisherId, setMuteAudio, setMuteVideo, muteAudio, muteVideo, setScreenShare, remoteStream, setRemoteStream }) {
   console.log(remoteStream);
    const muteVideoFn = () => {
        setMuteVideo((prev) => !prev)
    }

    const muteAudioFn = () => {
        setMuteAudio((prev) => !prev)
    }
    const setScreenShareHandler = () => {
        setScreenShare((prev) => !prev)
    }

    const callHangupHandler = (data) => {
        const filteredData =  remoteStream.filter((e)=>e.publisherId !== data);
        // const filteredData = remoteStream.forEach((ele)=>{
        //     console.log(ele.publisherId);
        // })
        setRemoteStream(filteredData)
        console.log(filteredData);
        
       
      }
    return (
        <div style={{ height: "80px", width: "100%", display: "flex", alignItems: "center", backgroundColor: "#181818", position: "absolute", bottom: "0px" }}>
            <h3 style={{ color: "white" }}>{roomId}</h3>
            <div style={{ width: "100%", display: "flex", gap: "100px", alignItems: "center", justifyContent: "center", marginTop: "20px" }} className="btns">
                <button onClick={muteVideoFn} style={{ padding: "10px 10px", borderRadius: "50%", backgroundColor: "	#383838", color: "white", border: "none" }}>
                    {
                        muteVideo ? <BsFillCameraVideoOffFill /> : <BsFillCameraVideoFill style={{ width: "15px", height: "15px" }} />
                    }
                </button>
                <button onClick={setScreenShareHandler} style={{ padding: "13px 13px", borderRadius: "50%", backgroundColor: "#383838", color: "white", border: "none" }} ><LuScreenShare /></button>
                <button onClick={()=>callHangupHandler(publisherId)} style={{ padding: "8px 25px", borderRadius: "5px", backgroundColor: "red", color: "white", border: "none" }} ><ImPhoneHangUp /></button>
                <button onClick={muteAudioFn} style={{ padding: "10px 10px", borderRadius: "50%", backgroundColor: "#383838", color: "white", border: "none" }}>
                    {
                        muteAudio ? <BsFillMicMuteFill style={{ width: "15px", height: "15px" }} /> : <BsFillMicFill />
                    }                     </button>

                <button style={{ padding: "10px 10px", borderRadius: "50%", backgroundColor: "	#383838", color: "white", border: "none" }}><MdMessage /></button>
                <button style={{ padding: "10px 10px", borderRadius: "50%", backgroundColor: "	#383838", color: "white", border: "none" }}><BsFillPeopleFill /></button>

            </div>

        </div>
    )
}

export default ChatCtrl