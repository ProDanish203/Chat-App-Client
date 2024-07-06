import React from "react";
import { ChatSidebar, ChatHeader } from "./";
export const Chats = () => {
  return (
    <div className="relative xl:max-w-[450px] max-w-[300px] w-full">
      <ChatHeader />
      <ChatSidebar />
    </div>
  );
};
