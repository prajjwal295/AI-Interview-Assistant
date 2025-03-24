"use client";

import { useState, useRef, useEffect } from "react";

const VideoRecorder = ({ onTranscript }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);
  const [showTranscript, setShowTranscript] = useState(false); // ✅ Show transcript after stopping
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  let recognition = null;

  const recognitionRef = useRef(null); 

  const startRecording = async () => {
    try {
      setError(null);
      setShowTranscript(false); 

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      mediaRecorderRef.current = new MediaRecorder(stream);
      recordedChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      if (
        "webkitSpeechRecognition" in window ||
        "SpeechRecognition" in window
      ) {
        recognitionRef.current = new (window.SpeechRecognition ||
          window.webkitSpeechRecognition)();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event) => {
          console.log("Speech Event:", event);
          const transcriptText = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join(" ");
          setTranscript(transcriptText);
        };

        recognitionRef.current.onerror = (event) => {
          console.error("Speech Recognition Error:", event.error);
          setError(`⚠️ Speech recognition error: ${event.error}`);
        };

        recognitionRef.current.start();
      } else {
        setError("⚠️ Speech recognition is not supported in this browser.");
      }
    } catch (err) {
      setError(
        "⚠️ Unable to access camera/microphone. Please check permissions."
      );
      console.error("Error accessing camera/microphone:", err);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setShowTranscript(true);

    if (recognition) recognition.stop();

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });
        const videoURL = URL.createObjectURL(blob);
        console.log("Recorded Video URL:", videoURL);
      };
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {error && <p className="text-red-600 font-medium">{error}</p>}

      <video
        ref={videoRef}
        autoPlay
        className="w-full max-w-lg h-40 bg-black rounded-lg shadow-md"
      />

      {isRecording && (
        <p className="text-red-500 mt-2 font-semibold">🔴 Recording...</p>
      )}

      <div className="flex gap-4 mt-4">
        <button
          onClick={startRecording}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
          disabled={isRecording}
        >
          🎤 Start Interview
        </button>
        <button
          onClick={stopRecording}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
          disabled={!isRecording}
        >
          ⏹ Stop
        </button>
      </div>

      {showTranscript && transcript && (
        <div className="mt-4 p-2 bg-white border rounded-md shadow-sm w-full max-w-lg">
          <h3 className="font-medium">📝 Transcript:</h3>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
