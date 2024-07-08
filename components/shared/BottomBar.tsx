"use client";
import { Bell, Mail, MessageCircleMore, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserProfile } from "./UserProfile";

export const BottomBar = () => {
  const pathname = usePathname();
  const isMessages = pathname === "/chats" || pathname === "/";
  const isRequests = pathname === "/requests";
  const isNotifications = pathname === "/notifications";

  return (
    <nav className="lg:hidden bg-secondaryCol text-textDark fixed bottom-0 left-0 flex items-center justify-between py-4 sm:px-16 px-5 w-full rounded-tr-2xl rounded-tl-2xl">
      <Link href="/chats" className="">
        <MessageCircleMore
          className={`size-5 ${isMessages && "text-primaryCol"}`}
        />
      </Link>
      <Link href="/requests" className="">
        <Mail className={`size-5 ${isRequests && "text-primaryCol"}`} />
      </Link>
      <Link href="/notifications" className="">
        <Bell className={`size-5 ${isNotifications && "text-primaryCol"}`} />
      </Link>
      <UserProfile />
    </nav>
  );
};
