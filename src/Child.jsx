import { useCallback, useEffect, useRef } from "react"

function Child({ id, divs, setDiv }) {

  const rmDiv = (id) => {
    const filterDiv = divs.filter((e) => e !== id)
    setDiv(filterDiv)
  }

  const removeDiv = useCallback(()=>{
    const filterDiv = divs.filter((e) => e !== id);
    setDiv(filterDiv)
  },[divs])

  const videoRef = useRef(null)

  const getMedia = () => {
    navigator.mediaDevices.getUserMedia({
      video: true, audio: false
    }).then((stream) => {
      videoRef.current.srcObject = stream
    })
  }

  useEffect(()=>{
    getMedia()
  },[])

  return (
    <div style={{ transition: "all", transitionDuration: "0.5s", width: "100%", height: "100px", textAlign: "center", margin: "50px", backgroundColor: "#181818", border: "1px solid black" }} >
      <div style={{ height:"10%",color:"white" ,display: "flex", alignItems:"center", justifyContent: "space-between" }} className="btn">
        <div style={{textAlign:"center"}}>

        <h5>User {id}</h5>
        </div>
        <button style={{padding:"0px 10px"}} onClick={() => removeDiv(id)}>X</button>
      </div>

      <div style={{ height: "100%", width:"100%", alignItems: "center" }} className="video">
        <video style={{height:"100%", width:"100%", display:"flex", alignItems:"center", objectFit:"cover"}} ref={videoRef} autoPlay src="" />
      </div>
    </div>
  )
}

export default Child    