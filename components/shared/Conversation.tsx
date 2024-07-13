"use client";
import { Message } from "./Message";
import { MessageSkeleton } from "../skeletons";
import useChatStore from "@/store/chat.store";
import React, { useEffect } from "react";
import { MessageType } from "@/types/types";
import { useAuth } from "@/store/AuthProvider";

export const Conversation = ({
  messages,
  isLoading,
  typingUsers,
}: {
  messages: MessageType[];
  isLoading: Boolean;
  typingUsers: { [key: string]: boolean }[];
}) => {
  const chatData = useChatStore((state) => state);
  const { user } = useAuth();

  const lastMessageRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "instant" });
    }, 50);
  }, [messages]);

  return (
    <div className="relative mt-3 overflow-y-auto max-h-[75vh] h-full flex items-end gap-x-3 w-full bg-white py-3 rounded-2xl shadow-md">
      <div className="relative flex flex-col gap-y-3 sm:px-5 px-2 pt-10 mb-5 w-full overflow-y-auto h-full">
        {isLoading ? (
          <MessageSkeleton />
        ) : chatData && messages && messages.length > 0 ? (
          messages.map((message: MessageType, idx: number) => (
            <div key={`${message._id}-${idx}`} ref={lastMessageRef}>
              <Message
                message={message.message}
                isCurrentUser={message.sender === user?._id}
                userImage={chatData.avatar.url}
                sentTime={message.createdAt}
                hasRead={message.readBy?.length === 2}
                hasDelivered={message.readBy?.length === 1}
              />
            </div>
          ))
        ) : (
          //  If it's a new chat
          <div className="flex flex-col items-center justify-end">
            <p className="bg-hoverCol rounded-full py-1 px-10 max-w-[70%] w-full text-center text-lg text-secondaryCol/80 font-roboto shadow-sm">
              Start a conversation
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
