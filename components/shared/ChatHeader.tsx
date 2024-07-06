import { Plus } from "lucide-react";
import { SearchBar } from "../helpers";

export const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between gap-x-3 w-full bg-white py-5 px-5 rounded-2xl shadow-md">
      <h3 className="font-semibold sm:text-xl text-lg">Chat</h3>
      <SearchBar />
      <div className="size-10 cursor-pointer hover:bg-white hover:text-primaryCol hover:border hover:border-primaryCol transition-all duration-200 rounded-full center text-textDark bg-primaryCol">
        <Plus />
      </div>
    </div>
  );
};
