"use client";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="flex items-center justify-between rounded-full relative border border-neutral-400 py-2 px-4 xl:w-4/6 w-[150px]">
      <input
        type="text"
        placeholder="Search..."
        className="outline-none border-none bg-transparent placeholder:text-neutral-400 text-xs w-full"
      />
      <Search className="text-neutral-400 size-4 absolute right-3" />
    </div>
  );
};
