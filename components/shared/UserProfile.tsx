"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";

export const UserProfile = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Image
          src={"/images/dummy-user.webp"}
          alt="user-profile"
          width={100}
          height={100}
          className="sm:size-12 size-8 rounded-full overflow-hidden object-cover cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="sm:w-60 w-40">
        <DropdownMenuLabel className="max-sm:text-xs">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="max-sm:text-xs flex items-center gap-x-2 sm:py-3 py-2 cursor-pointer">
          <User className="sm:size-5 size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="max-sm:text-xs flex items-center gap-x-2 sm:py-3 py-2 cursor-pointer">
          <Settings className="sm:size-5 size-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="max-sm:text-xs flex items-center gap-x-2 sm:py-3 py-2 cursor-pointer">
          <LogOut className="sm:size-5 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
