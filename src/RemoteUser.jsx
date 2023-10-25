import React, {useRef, useState } from 'react'
import userImage from "./images/user-temp.jpg"
function RemoteUser({ streams, twyng }) {
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


    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h5>{`Stream Id : ${streams?.id}`}</h5>
            <button style={{ width: "100px" }} onClick={subscriberFunc}>Subscribe</button>
     <video style={{ width: "400px", height: "400px", borderRadius: "10px" }} autoPlay ref={remoteRef} src=""></video> 

         
        </div>
    )
}

export default RemoteUser