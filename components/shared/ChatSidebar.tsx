import React from "react";
import { ChatUser } from "./ChatUser";
import { Chatdata } from "@/utils/data";

export const ChatSidebar = () => {
  return (
    <div className="bg-white py-3 px-5 rounded-2xl mt-3 sm:h-[85vh] h-[87vh] shadow-md overflow-y-auto">
      {Chatdata.map((chat, index) => (
        <ChatUser
          key={index}
          username={chat.username}
          userImage={chat.userImage}
          unreadMessages={chat.unreadMessages}
          lastMessage={chat.lastMessage}
          lastMessageTime={chat.lastMessageTime}
        />
      ))}
    </div>
  );
};
