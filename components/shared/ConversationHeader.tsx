import { EllipsisVertical } from "lucide-react";
import Image from "next/image";

interface Props {
  userImage: string;
  username: string;
  isOnline: boolean;
}

export const ConversationHeader = ({
  username,
  userImage,
  isOnline,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-3 w-full bg-white py-1 px-5 rounded-2xl shadow-md">
      <div className="flex items-center gap-x-4 py-3 w-full">
        <Image
          src={userImage || "/images/dummy-user.webp"}
          alt="user"
          width={200}
          height={200}
          className="rounded-full size-12"
        />

        <div className="flex flex-col w-full">
          <h4 className="font-semibold text-text">{username}</h4>
          <p className="flex items-center gap-x-1 relative text-xs text-neutral-400 truncate font-roboto">
            {isOnline && (
              <span className="size-2 bg-green-500 rounded-full block"></span>
            )}
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <button className="group relative h-12 w-24 overflow-hidden overflow-x-hidden bg-transparent px-5 text-text border border-secondaryCol hover:text-textDark rounded-full">
          <span className="relative z-10">Profile</span>
          <span className="absolute inset-0 overflow-hidden rounded-md">
            <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-secondaryCol transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
          </span>
        </button>

        <button className="group relative h-12 w-24 rounded-full bg-secondaryCol px-4 text-textDark">
          <span className="relative inline-flex overflow-hidden">
            <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
              Call
            </div>
            <div className="absolute translate-y-[110%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
              Call
            </div>
          </span>
        </button>

        <button className="relative overflow-hidden size-12 center rounded-full bg-white border border-secondaryCol text-text duration-300 hover:bg-secondaryCol hover:text-textDark [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90">
          <EllipsisVertical />
        </button>
      </div>
    </div>
  );
};
