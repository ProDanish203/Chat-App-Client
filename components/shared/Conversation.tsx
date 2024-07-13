"use client";
import { Message } from "./Message";
import { MessageSkeleton } from "../skeletons";
import useChatStore from "@/store/chat.store";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/API/chats.api";
import React, { useEffect, useState } from "react";
import { MessageType } from "@/types/types";
import { useAuth } from "@/store/AuthProvider";

export const Conversation = () => {
  const chatData = useChatStore((state) => state);
  const setValues = useChatStore((state) => state.setValues);

  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    // queryKey: ["messages", chatData.chatId],
    queryKey: [],
    queryFn: () => getMessages(chatData.chatId),
    enabled: !!chatData.chatId,
  });
  console.log(chatData);

  useEffect(() => {
    setValues({ messages: [] });
    if (chatData.chatId) refetch();
  }, [chatData.chatId]);
  useEffect(() => {
    if (!isLoading && data?.success) {
      setValues({ messages: data.response.data });
    }
  }, [data, isLoading, setValues, chatData.chatId]);

  const lastMessageRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [chatData.messages]);

  return (
    <div className="relative mt-3 overflow-y-auto max-h-[75vh] h-full flex items-end gap-x-3 w-full bg-white py-3 rounded-2xl shadow-md">
      <div className="relative flex flex-col gap-y-3 sm:px-5 px-2 pt-10 mb-5 w-full overflow-y-auto h-full">
        {isLoading ? (
          <MessageSkeleton />
        ) : chatData && chatData.messages && chatData.messages.length > 0 ? (
          chatData.messages.map((message: MessageType, idx: number) => (
            <div
              key={`${message._id}-${idx}`}
              ref={
                chatData.messages.length - 1 ===
                chatData.messages.indexOf(message)
                  ? lastMessageRef
                  : null
              }
            >
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
