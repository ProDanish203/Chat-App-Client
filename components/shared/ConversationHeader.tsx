import { ArrowLeft, Phone, User } from "lucide-react";
import Image from "next/image";
import { ConversationOptions } from "../helpers";
import useChatStore, { getStateValues } from "@/store/chat.store";
import { useSocket } from "@/store/SocketProvider";

export const ConversationHeader = () => {
  const chatData = useChatStore((state) => state);
  const setValues = useChatStore((state) => state.setValues);

  const { onlineUsers } = useSocket();
  const isOnline = onlineUsers.includes(chatData.userId);

  const handleBackButton = () => {
    setValues(getStateValues(useChatStore.getInitialState()));
  };

  return (
    <div className="flex items-center justify-between gap-x-3 w-full bg-white py-1 xs:px-5 px-2 rounded-2xl shadow-md">
      <div className="flex items-center sm:gap-x-4 gap-x-2 py-3 w-full">
        <button onClick={handleBackButton} className="md:hidden">
          <ArrowLeft className="size-5" />
        </button>

        <Image
          src={chatData.avatar.url || "/images/dummy-user.webp"}
          alt={chatData.username}
          width={200}
          height={200}
          className="rounded-full sm:size-12 size-10"
        />

        <div className="flex flex-col w-full">
          <h4 className="font-semibold text-text">{chatData.fullName}</h4>
          <p className="flex items-center gap-x-1 relative text-xs text-neutral-400 truncate font-roboto">
            {isOnline && (
              <span className="size-2 bg-green-500 rounded-full block"></span>
            )}
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <button className="group relative lg:h-12 lg:w-24 max-lg:size-10 max-lg:center overflow-hidden overflow-x-hidden bg-transparent px-5 text-text border border-secondaryCol hover:text-textDark rounded-full">
          <span className="max-lg:hidden relative z-10">Profile</span>
          <span className="lg:hidden">
            <User className="sm:size-5 relative z-10 size-4" />
          </span>
          <span className="absolute inset-0 overflow-hidden rounded-md">
            <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-secondaryCol transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
          </span>
        </button>

        <button className="group relative lg:h-12 lg:w-24 max-lg:size-10 max-lg:center rounded-full bg-secondaryCol px-4 text-textDark">
          <span className="max-lg:hidden relative inline-flex overflow-hidden">
            <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
              Call
            </div>
            <div className="absolute translate-y-[110%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
              Call
            </div>
          </span>
          <span className="lg:hidden">
            <Phone className="sm:size-5 size-4" />
          </span>
        </button>

        <ConversationOptions userId={chatData.userId} />
      </div>
    </div>
  );
};
