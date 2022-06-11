import { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";

import "./App.css";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

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
