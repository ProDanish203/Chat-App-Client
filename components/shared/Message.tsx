import { Check, CheckCheck, Clock } from "lucide-react";
import Image from "next/image";
import React from "react";

interface MessageProps {
  message: string;
  isCurrentUser: boolean;
  userImage: string;
  sentTime: string;
  hasRead: boolean;
  hasDelivered: boolean;
}

export const Message = ({
  message,
  hasDelivered,
  hasRead,
  isCurrentUser,
  sentTime,
  userImage,
}: MessageProps) => {
  return (
    <div
      className={`flex w-full ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`flex items-end gap-x-3 max-w-[80%]`}>
        {!isCurrentUser && (
          <Image
            src={userImage}
            alt="user-image"
            width={200}
            height={200}
            className="rounded-full size-6"
          />
        )}
        <div
          className={`flex flex-col ${
            isCurrentUser
              ? "bg-primaryCol msg-radius-user"
              : "bg-secondaryCol msg-radius"
          } text-bg text-sm px-5 pt-3 pb-2`}
        >
          <div>{message}</div>
          <div
            className={`text-[12px] ${
              isCurrentUser ? "text-neutral-100" : "text-gray-500"
            } pointer-events-none select-none flex items-center justify-end gap-x-2`}
          >
            <p>{sentTime}</p>
            {isCurrentUser && hasDelivered && !hasRead && (
              <Check className="size-4" />
            )}
            {isCurrentUser && hasDelivered && hasRead && (
              <CheckCheck className="size-4" />
            )}
            {isCurrentUser && !hasDelivered && <Clock className="size-4" />}
          </div>
        </div>
      </div>
    </div>
  );
};
