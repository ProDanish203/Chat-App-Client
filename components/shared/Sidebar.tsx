import Link from "next/link";
import { UserProfile } from "./UserProfile";
import { Bell, Mail, MessageCircleMore } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Sidebar = () => {
  return (
    <aside className="max-sm:hidden py-10 flex flex-col justify-between items-center bg-secondaryCol h-[95vh] w-[70px] rounded-2xl">
      <div className="text-textDark">Logo</div>
      <nav className="text-textDark flex flex-col items-center gap-y-10">
        <Tooltip>
          <TooltipTrigger>
            <Link href="/" className="">
              <MessageCircleMore className="size-5" />
            </Link>
            <TooltipContent side="right">Messages</TooltipContent>
          </TooltipTrigger>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Link href="/" className="">
              <Mail className="size-5" />
            </Link>
            <TooltipContent side="right">Messages</TooltipContent>
          </TooltipTrigger>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Link href="/" className="">
              <Bell className="size-5" />
            </Link>
            <TooltipContent side="right">Messages</TooltipContent>
          </TooltipTrigger>
        </Tooltip>
      </nav>
      <UserProfile />
    </aside>
  );
};
