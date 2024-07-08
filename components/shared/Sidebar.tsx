"use client";
import Link from "next/link";
import { UserProfile } from "./UserProfile";
import { Bell, Mail, MessageCircleMore } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();
  const isMessages = pathname === "/";
  const isRequests = pathname === "/requests";
  const isNotifications = pathname === "/notifications";

  return (
    <aside className="max-md:hidden py-10 flex flex-col justify-between items-center bg-secondaryCol h-[95vh] min-w-[70px] rounded-2xl">
      <div className="text-textDark">Logo</div>
      <nav className="text-textDark flex flex-col items-center gap-y-10">
        <Tooltip>
          <TooltipTrigger>
            <Link href="/" className="">
              <MessageCircleMore
                className={`size-5 ${isMessages && "text-primaryCol"}`}
              />
            </Link>
            <TooltipContent side="right">Chats</TooltipContent>
          </TooltipTrigger>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Link href="/" className="">
              <Mail className={`size-5 ${isRequests && "text-primaryCol"}`} />
            </Link>
            <TooltipContent side="right">Requests</TooltipContent>
          </TooltipTrigger>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Link href="/" className="">
              <Bell
                className={`size-5 ${isNotifications && "text-primaryCol"}`}
              />
            </Link>
            <TooltipContent side="right">Notifications</TooltipContent>
          </TooltipTrigger>
        </Tooltip>
      </nav>
      <UserProfile />
    </aside>
  );
};
