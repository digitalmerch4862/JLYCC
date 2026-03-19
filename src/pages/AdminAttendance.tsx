import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { useAppContext } from '../context/AppContext';

const AdminAttendance = () => {
  const { profiles } = useAppContext();
  const webcamRef = useRef<Webcam>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [status, setStatus] = useState('Loading models...');

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
      setStatus('Models loaded. Starting scanner...');
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (!modelsLoaded) return;

    const interval = setInterval(async () => {
      if (webcamRef.current && webcamRef.current.video) {
        const video = webcamRef.current.video;
        const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

        if (detection) {
          const labeledDescriptors = profiles
            .filter(p => p.faceDescriptor)
            .map(p => new faceapi.LabeledFaceDescriptors(p.fullName || 'Unknown', [new Float32Array(p.faceDescriptor!)]));

          if (labeledDescriptors.length > 0) {
            const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
            const match = faceMatcher.findBestMatch(detection.descriptor);
            setStatus(`Detected: ${match.label} (${match.distance < 0.6 ? 'Match' : 'No Match'})`);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [modelsLoaded, profiles]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Attendance Scanner</h2>
      <p className="mb-4">{status}</p>
      <Webcam 
        audio={false} 
        ref={webcamRef} 
        className="rounded-lg"
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "user" }}
        mirrored={true}
        disablePictureInPicture={true}
        forceScreenshotSourceSize={true}
        imageSmoothing={true}
        onUserMedia={() => {}}
        onUserMediaError={() => {}}
        screenshotQuality={0.8}
      />
    </div>
  );
};

export default AdminAttendance;
