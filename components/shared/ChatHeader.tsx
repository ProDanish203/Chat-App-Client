"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SearchBar } from "../helpers";
import { AddFriends } from "./AddFriends";
import { FormEvent, useState } from "react";
import { getSearchedUsers } from "@/API/chats.api";
import { toast } from "sonner";

export const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between gap-x-3 w-full bg-white py-5 px-5 rounded-2xl shadow-md">
      <h3 className="font-semibold sm:text-xl text-lg">Chat</h3>
      <SearchBar />
      <AddFriends />
    </div>
  );
};
