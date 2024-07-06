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
          className="size-12 rounded-full overflow-hidden object-cover cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-60">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-x-2 py-3 cursor-pointer">
          <User className="size-5" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-x-2 py-3 cursor-pointer">
          <Settings className="size-5" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-x-2 py-3 cursor-pointer">
          <LogOut className="size-5" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
