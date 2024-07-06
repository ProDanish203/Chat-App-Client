import Image from "next/image";

interface Props {
  unreadMessages: number;
  userImage: string;
  username: string;
  lastMessage: string;
  lastMessageTime: string;
}

export const ChatUser = ({
  unreadMessages,
  userImage,
  username,
  lastMessage,
  lastMessageTime,
}: Props) => {
  return (
    <div className="flex items-center gap-x-4 py-3 border-b border-b-neutral-200 w-full">
      <Image
        src={userImage || "/images/dummy-user.webp"}
        alt="user"
        width={200}
        height={200}
        className="rounded-full size-12"
      />

      <div className="flex flex-col gap-y-1 w-full">
        <h4 className="font-semibold text-text">{username}</h4>
        <p className="text-sm text-neutral-400 truncate font-roboto">
          {lastMessage}
        </p>
      </div>

      <div className="flex flex-col self-start gap-y-2 items-end text-right w-full">
        <p className="font-normal text-neutral-400 text-xs">
          {lastMessageTime}
        </p>
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
