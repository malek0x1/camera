import React, { useRef } from "react";
import Webcam from "react-webcam";
import { createWorker } from "tesseract.js";

const CaptureIngredients = () => {
  const webcamRef = useRef(null);
  const worker = createWorker({
    logger: (m) => console.log(m), // Optional: Add logger for more detailed OCR output
  });

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(imageSrc);
      console.log("Captured ingredients:", text);
      await worker.terminate();
    }
  };

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Capture Ingredients</button>
    </div>
  );
};

export default CaptureIngredients;
