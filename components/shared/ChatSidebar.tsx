import { useQuery } from "@tanstack/react-query";
import { ChatUserSkeleton } from "../skeletons";
import { ChatUser } from "./ChatUser";
import { Chatdata } from "@/utils/data";
import { getMyFriends } from "@/API/chats.api";
import { ApiResponse, ChatUserType } from "@/types/types";

export const ChatSidebar = () => {
  const { page, search, limit } = { page: 1, search: "", limit: 15 };
  const { data, isLoading } = useQuery({
    queryKey: ["chat-users", page, search, limit],
    queryFn: () =>
      getMyFriends({
        page,
        search,
        limit,
      }),
  });

  // Will change this api in future, it will be getAllChats api call

  return (
    <div className="bg-white py-3 rounded-2xl mt-3 sm:h-[85vh] h-[75vh] shadow-md overflow-y-auto">
      {isLoading ? (
        <ChatUserSkeleton />
      ) : data &&
        data.success &&
        data.response &&
        data.response.data.length > 0 ? (
        data.response.data.map((chat: ChatUserType, idx: number) => (
          <ChatUser
            key={chat._id}
            username={chat.friendDetails.fullName}
            userImage={chat.friendDetails.avatar.url}
            unreadMessages={1}
            lastMessage={""}
            lastMessageTime={""}
            isActive={chat.friendDetails.username === "danish"}
          />
          //
        ))
      ) : (
        <div className="h-full flex flex-col items-center justify-center px-5">
          <h4 className="lg:text-lg font-semibold">
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
