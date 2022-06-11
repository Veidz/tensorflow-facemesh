import { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";

// Style
import "./App.css";

// Utils
import { drawMesh } from './utils';

function App() {
  // Setup Refs
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Detect webcam
  const detectWebcam = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined'
      && webcamRef.current !== null
      && webcamRef.current.video.readyState === 4
    ) {
      // Video properties
      const video = webcamRef.current.video;
      const { videoWidth } = video;
      const { videoHeight } = video;

      // Set video size
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas size
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const face = await net.estimateFaces(video);
      console.log(face);

      // Get canvas context for drawning
      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx);
    }
  }

  // Load facemesh
  const handleFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: {
        width: 640,
        height: 480,
      },
      scale: 0.8
    });

    setInterval(() => {
      detectWebcam(net);
    }, 100);
  }

  handleFacemesh();

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
