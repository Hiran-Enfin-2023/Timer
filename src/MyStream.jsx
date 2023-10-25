import React from 'react'

function MyStream({ myVideo }) {

    // console.log(myVideo);
    return (
        <div>
            <video ref={myVideo} autoPlay style={{ width: "400px", borderRadius: "10px" }} src=""></video>
        </div>
    )
}

export default MyStream