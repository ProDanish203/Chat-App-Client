"use client";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { UserProfileDialog } from "./UserProfileDialog";

export const ConversationOptions = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UserProfileDialog open={open} setOpen={setOpen} userId={userId} />
      <DropdownMenu>
        <DropdownMenuTrigger className="relative overflow-hidden lg:size-12 size-9 center rounded-full bg-white border border-secondaryCol text-text duration-300 outline-none hover:bg-secondaryCol hover:text-textDark [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90">
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="px-5" onClick={() => setOpen(true)}>
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="!text-red-500 hover:!text-red-500 hover:!bg-red-100 px-5">
            Report
          </DropdownMenuItem>
          <DropdownMenuItem className="!text-red-500 hover:!text-red-500 hover:!bg-red-100 px-5">
            Block
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
