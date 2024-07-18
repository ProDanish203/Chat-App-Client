"use client";
import { Message } from "./Message";
import { MessageSkeleton } from "../skeletons";
import useChatStore from "@/store/chat.store";
import React, { Dispatch, useEffect } from "react";
import { MessageType } from "@/types/types";
import { useAuth } from "@/store/AuthProvider";
import { useSocket } from "@/store/SocketProvider";

export const Conversation = ({
  messages,
  isLoading,
  typingUsers,
  setMessages,
}: {
  messages: MessageType[];
  isLoading: Boolean;
  typingUsers: { [key: string]: boolean };
  setMessages: Dispatch<React.SetStateAction<MessageType[]>>;
}) => {
  const chatData = useChatStore((state) => state);
  const { user } = useAuth();

  const { socket } = useSocket();
  useEffect(() => {
    if (socket && messages.length) {
      const lastMessageFromOtherUser =
        messages[messages.length - 1].sender !== user?._id;
      if (lastMessageFromOtherUser) {
        socket.emit("markMessagesAsSeen", {
          chatId: chatData.chatId,
          userId: user?._id,
        });
      }

      socket.on("messagesSeen", ({ chatId, userId }) => {
        if (chatId === chatData.chatId && userId === chatData.userId) {
          setMessages((prev) =>
            prev.map((message) => {
              if (!message.readBy.includes(userId)) {
                return {
                  ...message,
                  readBy: [...message.readBy, userId],
                };
              }
              return message;
            })
          );
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("messagesSeen");
      }
    };
  }, [socket, user?._id, chatData.chatId, messages, chatData.userId]);

  const lastMessageRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typingUsers[chatData.userId]) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "instant" });
    }, 50);
  }, [messages, typingUsers]);

  return (
    <div className="relative mt-3 overflow-y-auto max-h-[75vh] h-full flex items-end gap-x-3 w-full bg-white py-3 rounded-2xl shadow-md">
      <div className="relative flex flex-col gap-y-3 sm:px-5 px-2 pt-10 mb-5 w-full overflow-y-auto h-full">
        {isLoading ? (
          <MessageSkeleton />
        ) : chatData && messages && messages.length > 0 ? (
          messages.map((message: MessageType, idx: number) => (
            <div key={`${message._id}-${idx}`} ref={lastMessageRef}>
              {message.attachments.length > 0
                ? // Render attachments separately
                  message.attachments.map((attachment, attachmentIdx) => (
                    <Message
                      key={`${message._id}-attachment-${attachmentIdx}`}
                      message=""
                      attachments={[attachment]}
                      isCurrentUser={message.sender === user?._id}
                      userImage={chatData.avatar.url}
                      sentTime={message.createdAt}
                      hasRead={message.readBy.includes(chatData.userId)}
                      hasDelivered={true}
                    />
                  ))
                : null}
              {/* Render text message if it exists */}
              {message.message && (
                <Message
                  message={message.message}
                  attachments={[]}
                  isCurrentUser={message.sender === user?._id}
                  userImage={chatData.avatar.url}
                  sentTime={message.createdAt}
                  hasRead={message.readBy.includes(chatData.userId)}
                  hasDelivered={true}
                />
              )}
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
        {typingUsers[chatData.userId] && (
          <div className="relative w-28 h-10 bg-neutral-200 rounded-full py-4 center msg-radius">
            <div className="flex flex-row gap-2">
              <div className="size-3 rounded-full bg-secondaryCol animate-bounce"></div>
              <div className="size-3 rounded-full bg-secondaryCol animate-bounce [animation-delay:-.3s]"></div>
              <div className="size-3 rounded-full bg-secondaryCol animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
