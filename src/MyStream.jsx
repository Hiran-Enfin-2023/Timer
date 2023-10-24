import React, { useEffect, useRef } from 'react'

function MyStream({ ref }) {
    // const myVideoRef = useRef(null)
    // useEffect(() => {
    //     if(myVideoRef.current === null){
    //         myVideoRef.current.srcObject = stream
    //     }
    // }, [])
    // console.log(stream);
    return (
        <div>
             <video ref={ref} autoPlay width="100%" height="100%" src=""></video>

        </div>
    )
}
   
export default MyStream