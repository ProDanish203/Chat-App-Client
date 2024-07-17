"use client";

import { Mic } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FileInfo {
  file: File;
  preview: string;
}

export const VoiceRecorder: React.FC<{
  sendMessage: () => void;
  setFiles: React.Dispatch<React.SetStateAction<FileInfo[]>>;
}> = ({ sendMessage, setFiles }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const audioChunks = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/ogg",
      });
      mediaRecorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) {
          audioChunks.current.push(e.data);
        }
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/ogg" });
        const fileName = `recorded_audio_${Date.now()}.ogg`;
        const audioFile = new File([audioBlob], fileName, {
          type: "audio/ogg",
        });
        const audioUrl = URL.createObjectURL(audioBlob);

        setFiles((prevFiles) => {
          const newFiles = [
            ...prevFiles,
            { file: audioFile, preview: audioUrl },
          ];
          return newFiles.slice(0, 5);
        });

        audioChunks.current = [];
      };
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  return (
    // <button
    //   type="button"
    //   onClick={() => setIsRecording((prev) => !prev)}
    //   className="center w-full h-full bg-white py-3 px-5 rounded-2xl shadow-md cursor-pointer text-text"
    // >
    //   <Mic />
    // </button>
    <button
      type="button"
      onClick={() => setIsRecording((prev) => !prev)}
      className={`center w-full h-full bg-white py-3 px-5 rounded-2xl shadow-md cursor-pointer text-text ${
        isRecording ? "ripple" : ""
      }`}
    >
      <Mic />
    </button>
  );
};
