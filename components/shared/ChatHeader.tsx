import { Plus } from "lucide-react";
import { SearchBar } from "../helpers";
import { AddFriends } from "./AddFriends";

export const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between gap-x-3 w-full bg-white py-5 px-5 rounded-2xl shadow-md">
      <h3 className="font-semibold sm:text-xl text-lg">Chat</h3>
      <SearchBar />
      <AddFriends />
    </div>
  );
};
