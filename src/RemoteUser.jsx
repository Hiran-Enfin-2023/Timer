import React, { useEffect, useRef, useState } from 'react'

function RemoteUser({ streams, twyng }) {
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
        <div style={{ display: "flex", flexDirection: "column", marginTop: "5px", position: "relative" }}>
            <h5 style={{ position: "absolute", top: "2px", left: "5px" }}>{`Stream Id : ${streams?.id}`}</h5>
            {

            }
            <video style={{ width: "400px", borderRadius: "10px" }} autoPlay ref={remoteRef} src=""></video>

            {/* <div style={{ width: "400px", borderRadius: "10px" }}>
                <h1>H</h1>
            </div> */}
            {/* buttons */}



            {/* <button style={{ padding: "8px 25px", borderRadius: "5px", backgroundColor: "red", color: "white", position: "absolute", bottom: "10px", left: "45%", border: "none" }} ><ImPhoneHangUp /></button> */}
        </div>
    )
}

export default RemoteUser