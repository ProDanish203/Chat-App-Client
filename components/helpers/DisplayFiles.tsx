"use client";
import { Pause, Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface FileInfo {
  file: File;
  preview: string;
}

interface DisplayFileProps {
  files: FileInfo[];
  removeFile: (index: number) => void;
}

export const DisplayFiles = ({ files, removeFile }: DisplayFileProps) => {
  const [playingMedia, setPlayingMedia] = useState<string | null>(null);
  const audioRef = useRef(new Audio());
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      Object.values(videoRefs.current).forEach((video) => video.pause());
    };
  }, []);

  const toggleMedia = (fileUrl: string, fileType: string) => {
    if (playingMedia === fileUrl) {
      if (fileType.startsWith("audio/")) {
        audioRef.current.pause();
      } else if (fileType.startsWith("video/")) {
        videoRefs.current[fileUrl].pause();
      }
      setPlayingMedia(null);
    } else {
      if (playingMedia) {
        if (audioRef.current.src) {
          audioRef.current.pause();
        }
        Object.values(videoRefs.current).forEach((video) => video.pause());
      }
      if (fileType.startsWith("audio/")) {
        audioRef.current.src = fileUrl;
        audioRef.current.play();
      } else if (fileType.startsWith("video/")) {
        videoRefs.current[fileUrl].play();
      }
      setPlayingMedia(fileUrl);
    }
  };

  const isPlaying = (fileUrl: string) => playingMedia === fileUrl;

  return (
    <div className="absolute -top-[130px] pt-5 px-5 bg-white shadow-lg rounded-2xl z-10 flex gap-2">
      {files.map((file, index) => (
        <div key={index} className="relative">
          {file.file.type.startsWith("image/") ? (
            <Image
              src={file.preview}
              alt={`file-${index}`}
              width={100}
              height={100}
              className="w-24 h-20 rounded-lg object-cover cursor-pointer shadow-sm"
            />
          ) : file.file.type.startsWith("audio/") ||
            file.file.type.startsWith("video/") ? (
            <div className="relative w-24 h-20">
              {file.file.type.startsWith("video/") && (
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[file.preview] = el;
                  }}
                  src={file.preview}
                  className="w-24 h-20 rounded-lg object-cover"
                />
              )}
              <button
                className="absolute inset-0 w-24 h-20 rounded-lg flex items-center justify-center bg-gray-200 bg-opacity-50"
                onClick={() => toggleMedia(file.preview, file.file.type)}
              >
                {isPlaying(file.preview) ? (
                  <Pause className="size-8 text-primaryCol" />
                ) : (
                  <Play className="size-8 text-primaryCol" />
                )}
              </button>
            </div>
          ) : (
            <div className="w-24 h-20 rounded-lg flex items-center justify-center bg-gray-200">
              {file.file.name.split(".").pop()}
            </div>
          )}
          <button>
            <span
              className="-top-2 -right-2 shadow-sm absolute bg-red-500 text-white size-5 rounded-full center cursor-pointer"
              onClick={() => removeFile(index)}
            >
              <X className="size-4" />
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};
