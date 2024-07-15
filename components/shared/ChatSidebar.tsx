"use client";
import { useQuery } from "@tanstack/react-query";
import { ChatUserSkeleton } from "../skeletons";
import { ChatUser } from "./ChatUser";
import { ChatUserType } from "@/types/types";
import { getChats } from "@/API/chats.api";
import useChatStore from "@/store/chat.store";
import { useAuth } from "@/store/AuthProvider";

export const ChatSidebar = ({
  typingUsers,
}: {
  typingUsers: { [key: string]: boolean };
}) => {
  const { page, search, limit } = { page: 1, search: "", limit: 15 };
  const { data, isLoading } = useQuery({
    queryKey: ["chat-users", page, search, limit],
    queryFn: () => getChats(),
  });

  const chatData = useChatStore((state) => state);
  const { user } = useAuth();

  return (
    <div className="bg-white py-3 rounded-2xl mt-3 sm:h-[85vh] h-[75vh] shadow-md overflow-y-auto">
      {isLoading ? (
        <ChatUserSkeleton />
      ) : data &&
        data.success &&
        data.response &&
        data.response.data.length > 0 ? (
        data.response.data.map((chat: ChatUserType) => (
          <ChatUser
            key={chat._id}
            chatId={chat._id}
            user={chat.participants[0]}
            unreadMessages={
              chat.lastMessage
                ? chat.lastMessage?.sender === user._id
                  ? 0
                  : chat.lastMessage.sender !== user._id &&
                    chat.lastMessage?.readBy.includes(user._id)
                  ? 0
                  : 1
                : 0
            }
            isTyping={typingUsers[chat.participants[0]._id]}
            lastMessage={chat.lastMessage?.message || ""}
            lastMessageTime={chat.lastMessage?.createdAt || ""}
            isActive={chat._id === chatData.chatId}
          />
        ))
      ) : (
        <div className="h-full flex flex-col items-center justify-center px-5">
          <h4 className="lg:text-lg font-semibold text-center">
            You currently have no friends to chat with
          </h4>
          <p className="text-neutral-400 text-sm text-center px-5 mt-1">
            Start a conversation by just clicking the &apos;+&apos; button on
            the header to add new friends{" "}
          </p>
        </div>
      )}
    </div>
  );
};
