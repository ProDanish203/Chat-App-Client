import React from "react";
import { ChatSidebar, ChatHeader } from "./";
export const Chats = () => {
  return (
    <div className="relative max-w-[450px] w-full">
      <ChatHeader />
      <ChatSidebar />
    </div>
  );
};
