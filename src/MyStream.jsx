import React from 'react'
import { ImPhoneHangUp } from "react-icons/im"
import { BsFillMicFill, BsFillMicMuteFill, BsFillCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs"
import { LuScreenShare } from "react-icons/lu"
function MyStream({ myVideo, setMuteAudio, setMuteVideo, muteAudio, muteVideo, setScreenShare, setCallEnd }) {

    const muteVideoFn = () => {
        setMuteVideo((prev) => !prev)
    }

    const muteAudioFn = () => {
        setMuteAudio((prev) => !prev)
    }
    const setScreenShareHandler = () => {
        setScreenShare((prev) => !prev)
    }

    const callHangupHandler = () => {
        setCallEnd((prev)=> !prev)
    }
    return (
        <div style={{ width: "400px", marginTop: "5px", position: "relative" }}>

            <video ref={myVideo} autoPlay style={{ width: "400px", borderRadius: "10px" }} src=""></video>
            {
                myVideo.current !== null && <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", position: "absolute", bottom: "10px" }} className="btns">
                    <button onClick={muteVideoFn} style={{ padding: "10px 10px", borderRadius: "50%", backgroundColor: "transparent", color: "white", border: "1px solid gray" }}>
                        {
                            muteVideo ? <BsFillCameraVideoOffFill /> : <BsFillCameraVideoFill style={{ width: "15px", height: "15px" }} />
                        }
                    </button>
                    <button onClick={setScreenShareHandler} style={{ padding: "8px 20px", borderRadius: "5px", backgroundColor: "transparent", border: "none" }} ><LuScreenShare /></button>
                    <button onClick={callHangupHandler} style={{ padding: "8px 25px", borderRadius: "5px", backgroundColor: "red", color: "white", border: "none" }} ><ImPhoneHangUp /></button>
                    <button onClick={muteAudioFn} style={{ padding: "10px 10px", borderRadius: "50%", backgroundColor: "transparent", color: "white", border: "1px solid gray" }}>
                        {
                            muteAudio ? <BsFillMicMuteFill style={{ width: "15px", height: "15px" }} /> : <BsFillMicFill />
                        }                     </button>
                </div>

            }

        </div>

    )
}

export default MyStream