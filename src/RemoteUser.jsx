import React, { useEffect, useRef, useState } from 'react'
import { BsFillMicFill, BsFillMicMuteFill, BsFillCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs"

function RemoteUser({ muteAudio, muteVideo, streams, twyng }) {
    const [endBtn, setEndBtn] = useState(false)
    const [videoStatus, setVideoStatus] = useState(null)
    // console.log(streams.audio);



    const remoteRef = useRef(null)
    const subscriberFunc = async () => {
        try {
            let subscribe = await twyng.current.subscribe(streams)
            remoteRef.current.srcObject = subscribe.mediaStream;
            // setVideoStatus(streams.video)
        } catch (error) {
            console.error(error);
        }

    }


    useEffect(() => {
        subscriberFunc();
    }, [streams])



    return (
        <div className='OT_big' class style={{ backgroundColor: "black", transition: "all", transitionDuration: ".5s", border: "5px solid violet", borderRadius: "10px", marginTop: "5px", marginBottom:"10px"}}>
            <h5 style={{ position: "absolute", top: "10px", left: "5px" }}>{`Stream Id : ${streams?.id}`}</h5>
            {
                muteAudio && <div style={{ position: "absolute", top: "10px", right: "5px" }}>  <BsFillMicMuteFill /></div>
            }
            {/* <div style={{ width: "100%", height: "100%", borderRadius: "10px", objectFit: "cover" }}>
                <h1>H</h1>
            </div> */}
            <video style={{ width: "100%", height: "100%", borderRadius: "10px", objectFit: "cover" }} autoPlay ref={remoteRef} src=""></video>

        </div>
    )
}

export default RemoteUser