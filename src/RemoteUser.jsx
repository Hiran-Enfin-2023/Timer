import React, { useEffect, useRef } from 'react'

function RemoteUser({ stream, twyng }) {
    console.log(stream);
    // console.log(twyng.current);
    const remoteRef = useRef(null)
    const subscriberFunc = async () => {
        let subscribe = await twyng.current.subscribe(stream)
        console.log(subscribe.mediaStream);

        remoteRef.current.srcObject = await subscribe.mediaStream
        // if(remoteRef === null){
        //     remoteRef.current.srcObject = subscribe.mediaStream
        // }


    }

    // useEffect(async()=>{
    // subScriberFn()
    // },[])
    return (
        <div>
            <video style={{ width: "400px",height:"400px", borderRadius: "10px" }} autoPlay ref={remoteRef} src=""></video> 
            <button onClick={subscriberFunc}>Subscribe</button>
        </div>
    )
}

export default RemoteUser