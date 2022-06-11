import { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";

import "./App.css";

function App() {
  // Setup Refs
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Load facemesh
  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputresolution: {
        width: 640,
        height: 480,
      },
      scale: 0.8
    });
  }

  // Detect webcam
  const detectWebcam = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined'
      && webcamRef.current !== null
      && webcamRef.current.video.readState === 4
    ) {

    }
  }

  return (
    <div className="container">
      <Webcam
        ref={ webcamRef }
        className="webcam"
      />
      <canvas
        ref={ canvasRef }
        className="webcam"
      />
    </div>
  )
}

export default App;
