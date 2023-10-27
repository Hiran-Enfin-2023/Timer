import React, { useEffect, useRef, useState } from 'react'
import userImage from "./images/user-temp.jpg"
import { ImPhoneHangUp } from "react-icons/im"
import { AiFillAudio } from "react-icons/ai"
import { MdVideocam } from "react-icons/md"
function RemoteUser({ streams, twyng }) {
    const [endBtn, setEndBtn] = useState(false)
    console.log(streams);
    const remoteRef = useRef(null)
    const subscriberFunc = async () => {
        try {
            let subscribe = await twyng.current.subscribe(streams)
            remoteRef.current.srcObject = subscribe.mediaStream;

        } catch (error) {
            console.error(error);
        }
        // setShowVideo(true)
    }


    useEffect(() => {
        subscriberFunc();

    }, [streams])



    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "5px", position: "relative" }}>
            <h5 style={{ position: "absolute", top: "2px", left: "5px" }}>{`Stream Id : ${streams?.id}`}</h5>
            <video style={{ width: "400px", borderRadius: "10px" }} autoPlay ref={remoteRef} src=""></video>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", position: "absolute", bottom: "10px" }} className="btns">
                <button style={{ padding: "10px 10px", borderRadius: "50%", backgroundColor: "transparent", color: "white", border: "1px solid gray" }}>
                    <MdVideocam style={{ width: "15px", height: "15px" }} />
                </button>
                <button style={{ padding: "8px 25px", borderRadius: "5px", backgroundColor: "red", color: "white", border: "none" }} ><ImPhoneHangUp /></button>
                <button style={{ padding: "10px 10px", borderRadius: "50%", backgroundColor: "transparent", color: "white", border: "1px solid gray" }}>
                    <AiFillAudio style={{ width: "15px", height: "15px" }} />
                </button>
            </div>

            {/* <button style={{ padding: "8px 25px", borderRadius: "5px", backgroundColor: "red", color: "white", position: "absolute", bottom: "10px", left: "45%", border: "none" }} ><ImPhoneHangUp /></button> */}
        </div>
    )
}

export default RemoteUser