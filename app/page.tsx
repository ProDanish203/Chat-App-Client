"use client";
import { SendChat } from "@/components/forms";
import { Chats, ConversationHeader, Conversation } from "@/components/shared";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import useChatStore from "@/store/chat.store";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function Home() {
  const chatData = useChatStore((state) => state);
  const isMobile = useMediaQuery("(max-width: 767px)");
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
            <Conversation />
            <SendChat />
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
