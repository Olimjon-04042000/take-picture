import useCamera from "../hooks/useCamera"

const Photo = () => {

  const {videoRef,takepicture,imgURL,download}=useCamera();
  
  return (
  <div className="container">
    <div className='media'>
     {imgURL ? <img src={imgURL}/> : <video ref={videoRef}> </video>}
     <div className="btns"> 
      <button onClick={takepicture} className="btn">
        {imgURL ? "Retake" : "Take"}
      </button>
      {imgURL && <button onClick={download} className="btn">Download</button>}
     </div>
    </div>
    <canvas className="canvas"></canvas>
  </div>
  )
}

export default Photo