import React, { useEffect, useRef, useState } from 'react'
import { BsFillMicFill, BsFillMicMuteFill, BsFillCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs"
import { LuPin, LuPinOff } from "react-icons/lu"
function RemoteUser({layoutRef, muteAudio, muteVideo, streams, twyng }) {
    const [endBtn, setEndBtn] = useState(false)
    const [videoStatus, setVideoStatus] = useState(null);
    const [isPinned, setIsPinned] = useState(false);
    const [pinned, setPinned] = useState()
    // console.log(streams.id);
    console.log(isPinned);


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

    const changePin = () => {
        setIsPinned(prev => !prev);
        layoutRef.current.layout();
    }


    useEffect(() => {
        subscriberFunc();
    }, [streams])

   

    return (
        <div className={isPinned ? "OT_big" : null} class style={{ backgroundColor: "black", transition: "all", transitionDuration: ".5s", border: "5px solid violet", borderRadius: "10px", marginTop: "5px", marginBottom: "10px" }}>
            <h5 style={{ position: "absolute", top: "10px", left: "5px" }}>{`Stream Id : ${streams?.id}`}</h5>
            {
                muteAudio && <div style={{ position: "absolute", top: "10px", right: "5px" }}>  <BsFillMicMuteFill /></div>
            }
            <video style={{ width: "100%", height: "100%", borderRadius: "10px", objectFit: "cover" }} autoPlay ref={remoteRef} src=""></video>
            <button onClick={changePin} style={{ position: "absolute", fontSize: "18px", left: "10px", padding: "5px", border: "none", bottom: "10px", backgroundColor: "transparent", color: "black" }}>
                {
                    isPinned ? <LuPinOff /> : <LuPin />
                }
            </button>

        </div>
    )
}

export default RemoteUser