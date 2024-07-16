"use client";
import { convertImage } from "@/lib/helpers";
import { Mic, Paperclip, Send, Smile, X } from "lucide-react";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import EmojiPicker from "emoji-picker-react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendChat } from "@/API/chats.api";
import { toast } from "sonner";
import useChatStore from "@/store/chat.store";
import { useSocket } from "@/store/SocketProvider";
import { MessageType } from "@/types/types";

interface FileInfo {
  file: File;
  preview: string;
}

interface DisplayFileProps {
  files: FileInfo[];
  removeFile: (index: number) => void;
}

const DisplayFiles = ({ files, removeFile }: DisplayFileProps) => {
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

export const SendChat = ({
  setMessages,
  setTypingUsers,
}: {
  setMessages: Dispatch<React.SetStateAction<MessageType[]>>;
  setTypingUsers: Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}) => {
  const { chatId, userId } = useChatStore((state) => ({
    chatId: state.chatId,
    userId: state.userId,
  }));

  const { socket } = useSocket();

  const [showEmojis, setShowEmojis] = useState(false);
  const [message, setMessage] = useState("");

  const emojiRef = useRef<HTMLDivElement>(null);

  useOutsideClick(emojiRef, () => {
    setShowEmojis(false);
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: sendChat,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat-users"],
      });
    },
  });

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage: any) => {
        if (chatId === newMessage.chatId) {
          setMessages((prev: MessageType[]) => [...prev, newMessage]);
        }
      });

      // Cleanup function
      return () => {
        socket.off("newMessage");
      };
    }
  }, [socket, chatId]);

  useEffect(() => {
    setMessage("");
  }, [chatId, userId]);

  const [files, setFiles] = useState<FileInfo[]>([]);

  const handleFileChange = async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles).slice(0, 5 - files.length);

    const filePromises = newFiles.map(async (file) => {
      const preview = await convertImage(file);
      return { file, preview };
    });

    const newFileInfos = await Promise.all(filePromises);
    setFiles((prevFiles) => [...prevFiles, ...newFileInfos].slice(0, 5));
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!message && files.length === 0) return;
    if (!chatId) return toast.error("No chat selected");

    const formData = new FormData();
    message && formData.append("message", message);
    files.forEach((fileInfo) => {
      formData.append(`attachments`, fileInfo.file);
    });

    const { response, success } = await mutateAsync({
      chatId,
      formData,
    });
    if (success) {
      setFiles([]);
      setMessage("");
    } else return toast.error(response as string);
  };

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handling typing event
  socket &&
    socket.on("typing", ({ chatId, userId }) => {
      if (chatId === chatId) {
        setTypingUsers((prev: any) => {
          return { ...prev, [userId]: true };
        });
      }
    });

  socket &&
    socket.on("typingStopped", ({ chatId, userId }) => {
      if (chatId === chatId) {
        setTypingUsers((prev: any) => {
          return { ...prev, [userId]: false };
        });
      }
    });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
    else if (socket) {
      socket.emit("startTyping", { participants: [userId], chatId });

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stopTyping", { participants: [userId], chatId });
      }, 1000);
    }
  };

  return (
    <div className="relative mt-3 flex items-center gap-x-2 h-[8vh] min-h-[8vh]">
      {/* Input */}
      <div className="sm:w-[87%] w-full bg-white py-3 px-5 rounded-2xl shadow-md h-full flex items-center justify-between">
        <div className="flex items-center gap-x-3 w-full">
          <div className="relative" ref={emojiRef}>
            <button onClick={() => setShowEmojis((prev) => !prev)}>
              <Smile className="size-5 cursor-pointer" />
            </button>
            <EmojiPicker
              autoFocusSearch={false}
              height={400}
              width={350}
              onEmojiClick={(emoji) => setMessage((prev) => prev + emoji.emoji)}
              open={showEmojis}
              className="!absolute bottom-10 left-0"
              lazyLoadEmojis
            />
          </div>
          <label htmlFor="file" className="text-secondaryCol cursor-pointer">
            <Paperclip className="size-5" />
          </label>
          {/* File input */}
          <input
            type="file"
            className="hidden"
            id="file"
            multiple
            accept="*/*"
            onChange={(e) => handleFileChange(e.target.files)}
          />
          {/* Text input */}
          <input
            type="text"
            placeholder="Type a message"
            className="text-sm w-full h-full bg-transparent outline-none text-text border-none"
            value={message}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="sm:hidden relative flex items-center gap-x-2">
          <button>
            <Mic className="size-5 cursor-pointer" />
          </button>
          <button>
            <Send className="size-5 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Show file if any */}
      {files.length > 0 && (
        <DisplayFiles files={files} removeFile={removeFile} />
      )}

      {/* Action Buttons */}
      <div className="max-sm:hidden flex items-center gap-x-2 h-full max-md:pr-2">
        <button
          type="button"
          className="center w-full h-full bg-white py-3 px-5 rounded-2xl shadow-md cursor-pointer text-text
          relative z-0 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-white hover:after:bg-gray-300 hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500"
        >
          <Mic />
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isPending}
          className="disabled:opacity-80 disabled:cursor-not-allowed center w-full h-full bg-primaryCol text-textDark py-3 px-5 rounded-2xl shadow-md cursor-pointer"
        >
          {isPending ? (
            <svg
              className="animate-spin size-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <Send />
          )}
        </button>
      </div>
    </div>
  );
};
