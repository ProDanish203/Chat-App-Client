"use client";
import { convertImage } from "@/lib/helpers";
import { Mic, Paperclip, Send, Smile, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, Dispatch, useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useMutation } from "@tanstack/react-query";
import { sendChat } from "@/API/chats.api";
import { toast } from "sonner";
import useChatStore from "@/store/chat.store";
import { useSocket } from "@/store/SocketProvider";
import { MessageType } from "@/types/types";

interface DisplayFileProps {
  image: string;
  setImage: (image: string) => void;
  setFile: (file: File | null) => void;
}

const DisplayFile = ({ image, setFile, setImage }: DisplayFileProps) => {
  return (
    <div className="absolute -top-[130px] pt-5 px-5 bg-white shadow-lg rounded-2xl z-10">
      <div className="relative">
        <Image
          src={image}
          alt="image"
          width={100}
          height={100}
          className="w-24 h-20 rounded-lg object-cover cursor-pointer shadow-sm"
        />
        <button>
          <span
            className="-top-2 -right-2 shadow-sm absolute bg-red-500 text-white size-5 rounded-full center cursor-pointer"
            onClick={() => {
              setFile(null);
              setImage("");
            }}
          >
            <X className="size-4 " />
          </span>
        </button>
      </div>
    </div>
  );
};

export const SendChat = ({
  setMessages,
}: {
  setMessages: Dispatch<React.SetStateAction<MessageType[]>>;
}) => {
  const { chatId } = useChatStore((state) => ({
    chatId: state.chatId,
  }));

  const { socket } = useSocket();

  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState("");

  const handleFileChange = async (file: any) => {
    try {
      setFile(file);
      const base64Image = await convertImage(file);
      setImage(base64Image);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [showEmojis, setShowEmojis] = useState(false);
  const [message, setMessage] = useState("");

  const emojiRef = useRef<HTMLDivElement>(null);

  useOutsideClick(emojiRef, () => {
    setShowEmojis(false);
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: sendChat,
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

  const handleSubmit = async () => {
    if (!chatId) return toast.error("No chat selected");
    const { response, success } = await mutateAsync({
      chatId,
      message,
    });
    if (success) {
      setMessage("");
    } else return toast.error(response as string);
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
            accept="image/jpeg, image/png"
            onChange={(e) => handleFileChange(e.target.files?.[0])}
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
      {file && image && (
        <DisplayFile image={image} setImage={setImage} setFile={setFile} />
      )}

      {/* Action Buttons */}
      <div className="max-sm:hidden flex items-center gap-x-2 h-full max-md:pr-2">
        <button
          type="button"
          className="center w-full h-full bg-white py-3 px-5 rounded-2xl shadow-md cursor-pointer text-text
        
        relative z-0 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-white hover:after:bg-gray-300 hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500
        "
        >
          <Mic />
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isPending}
          className="disabled:opacity-80 disabled:cursor-not-allowed center w-full h-full bg-primaryCol text-textDark py-3 px-5 rounded-2xl shadow-md cursor-pointer"
        >
          <Send />
        </button>
      </div>
    </div>
  );
};
