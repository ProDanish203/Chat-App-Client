"use client";
import { SendChat } from "@/components/forms";
import { Chats, ConversationHeader, Conversation } from "@/components/shared";
import MainLayout from "@/components/layouts/MainLayout";
import useChatStore from "@/store/chat.store";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useAuth } from "@/store/AuthProvider";
import { getMessages } from "@/API/chats.api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MessageType } from "@/types/types";

export default function Home() {
  const chatData = useChatStore((state) => state);
  const setValues = useChatStore((state) => state.setValues);

  const isMobile = useMediaQuery("(max-width: 767px)");

  const [messages, setMessages] = useState<MessageType[]>([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [],
    queryFn: () => getMessages(chatData.chatId),
    enabled: !!chatData.chatId,
  });

  useEffect(() => {
    setMessages([]);
    if (chatData.chatId) refetch();
  }, [chatData.chatId]);

  useEffect(() => {
    if (!isLoading && data?.success) {
      setMessages(data.response.data);
    }
  }, [data, isLoading, setValues, chatData.chatId]);

  const [typingUsers, setTypingUsers] = useState<{ [key: string]: boolean }[]>(
    []
  );

  return (
    <MainLayout isChat>
      <section className="w-full flex gap-x-3 relative">
        <div
          className={`xl:max-w-[450px]  ${
            isMobile && !chatData.userId
              ? "w-full"
              : !isMobile
              ? "w-full max-w-[300px]"
              : "hidden"
          } `}
        >
          <Chats />
        </div>
        {chatData && chatData.userId ? (
          <div className="relative w-full">
            <ConversationHeader />
            <Conversation typingUsers={typingUsers} messages={messages} isLoading={isLoading} />
            <SendChat
              setMessages={setMessages}
              setTypingUsers={setTypingUsers}
            />
          </div>
        ) : (
          !isMobile && (
            <div className="relative w-full center flex-col gap-y-2">
              <h3 className="text-center text-xl font-semibold">
                Select a user to start chatting{" "}
              </h3>
              <p className="text-sm text-neutral-400 max-w-md text-center">
                Welcome to our chat app! Start a conversation by selecting a
                user from the list on the left.
              </p>
            </div>
          )
        )}
      </section>
    </MainLayout>
  );
}
