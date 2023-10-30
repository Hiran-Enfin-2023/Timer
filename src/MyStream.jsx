import React from 'react'
import { ImPhoneHangUp } from "react-icons/im"
import { AiFillAudio } from "react-icons/ai"
import { MdVideocam } from "react-icons/md"
function MyStream({ myVideo, setMuteAudio, setMuteVideo }) {

    const muteVideo = () => {
        setMuteVideo((prev)=> !prev)
    }

    const muteAudio=()=>{
        setMuteAudio((prev)=> !prev)
    }
    return (
        <div style={{ width: "400px", marginTop: "5px", position: "relative" }}>
            <video ref={myVideo} autoPlay style={{ width: "400px", borderRadius: "10px" }} src=""></video>
            {
                myVideo.current !== null && <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", position: "absolute", bottom: "10px" }} className="btns">
                    <button onClick={muteVideo} style={{ padding: "10px 10px", borderRadius: "50%", backgroundColor: "transparent", color: "white", border: "1px solid gray" }}>
                        <MdVideocam style={{ width: "15px", height: "15px" }} />
                    </button>
                    <button style={{ padding: "8px 25px", borderRadius: "5px", backgroundColor: "red", color: "white", border: "none" }} ><ImPhoneHangUp /></button>
                    <button onClick={muteAudio} style={{ padding: "10px 10px", borderRadius: "50%", backgroundColor: "transparent", color: "white", border: "1px solid gray" }}>
                        <AiFillAudio style={{ width: "15px", height: "15px" }} />
                    </button>
                </div>

            }


        </div>

    )
}

export default MyStream