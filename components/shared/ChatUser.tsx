import useChatStore, { getStateValues } from "@/store/chat.store";
import { ChatUser as ChatUserType } from "@/types/types";
import { format } from "date-fns";
import { Images } from "lucide-react";
import Image from "next/image";

interface Props {
  chatId: string;
  unreadMessages: number;
  user: ChatUserType;
  lastMessage: string;
  lastMessageTime: string;
  isActive?: boolean;
  isTyping: boolean;
  isLastMessageAttachment?: boolean;
}

export const ChatUser = ({
  chatId,
  unreadMessages,
  user,
  lastMessage,
  lastMessageTime,
  isActive,
  isTyping,
  isLastMessageAttachment,
}: Props) => {
  const formattedDate = lastMessageTime
    ? format(new Date(lastMessageTime), "hh:mm a")
    : "";

  const setValues = useChatStore((state) => state.setValues);

  const handleChatUserClick = () => {
    setValues({
      chatId: chatId,
      userId: user._id,
      username: user.username,
      fullName: user.fullName,
      avatar: user.avatar,
    });
  };
  
  return (
    <div
      onClick={handleChatUserClick}
      className={`flex items-center gap-x-4 py-3 px-5 ${
        isActive ? "bg-hoverCol" : "border-b border-b-neutral-200"
      }  w-full cursor-pointer hover:bg-hoverCol transition-all duration-100`}
    >
      <Image
        src={user.avatar.url || "/images/dummy-user.webp"}
        alt={user.username}
        width={200}
        height={200}
        className="rounded-full size-12"
      />

      <div className="flex flex-col gap-y-1 w-full">
        <h4 className="font-semibold text-text truncate">
          {user.fullName.length > 20
            ? user.fullName.slice(0, 20) + "..."
            : user.fullName}
        </h4>
        {isTyping ? (
          <p className="text-sm text-primaryCol line-clamp-1 font-medium font-roboto">
            Typing...
          </p>
        ) : isLastMessageAttachment ? (
          <div className="flex gap-x-1 items-center">
            <Images className="size-4 text-neutral-400" />
            <p className="text-sm text-neutral-400 line-clamp-1 font-roboto">
              Attachments
            </p>
          </div>
        ) : (
          lastMessage && (
            <p className="sm:max-w-[100px] text-sm text-neutral-400 line-clamp-1 font-roboto">
              {lastMessage.length > 30
                ? lastMessage.slice(0, 30) + "..."
                : lastMessage}
            </p>
          )
        )}
      </div>

      <div className="flex flex-col self-start gap-y-2 items-end text-right w-full">
        <p className="font-normal text-neutral-400 text-xs">{formattedDate}</p>
        {/* Unread Messages */}
        {unreadMessages > 0 && (
          <p className="text-xs font-roboto center bg-primaryCol text-textDark rounded-full size-4">
            {unreadMessages}
          </p>
        )}
      </div>
    </div>
  );
};
