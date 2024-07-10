"use client";
import { ChatSidebar, ChatHeader } from "./";

export const Chats = () => {
  

  return (
    <div className="relative w-full max-md:w-full">
      <ChatHeader />
      <ChatSidebar />
    </div>
  );
};
