import { ChatUser } from "./ChatUser";
import { Chatdata } from "@/utils/data";

export const ChatSidebar = () => {
  return (
    <div className="bg-white py-3 rounded-2xl mt-3 sm:h-[85vh] h-[87vh] shadow-md overflow-y-auto">
      {Chatdata.length > 0 ? (
        Chatdata.map((chat, index) => (
          <ChatUser
            key={index}
            username={chat.username}
            userImage={chat.userImage}
            unreadMessages={chat.unreadMessages}
            lastMessage={chat.lastMessage || ""}
            lastMessageTime={chat.lastMessageTime}
            isActive={chat.username === "Alice"}
          />
        ))
      ) : (
        <div className="h-full flex flex-col items-center justify-center px-5">
          <h4 className="lg:text-lg font-semibold">
            You currently have no friends to chat with
          </h4>
          <p className="text-neutral-400 text-sm text-center px-5 mt-1">
            Start a conversation by just clicking the &apos;+&apos; button on the header
            to add new friends{" "}
          </p>
        </div>
      )}
    </div>
  );
};
