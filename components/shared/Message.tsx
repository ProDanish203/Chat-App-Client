import { Check, CheckCheck, Clock } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { getFileType } from "@/lib/helpers";

interface MessageProps {
  message?: string;
  attachments: {
    public_id: string;
    url: string;
    _id: string;
  }[];
  isCurrentUser: boolean;
  userImage: string;
  sentTime: string;
  hasRead: boolean;
  hasDelivered: boolean;
}

export const Message = ({
  message,
  attachments,
  hasDelivered,
  hasRead,
  isCurrentUser,
  sentTime,
  userImage,
}: MessageProps) => {
  const formattedDate = format(new Date(sentTime), "hh:mm a");
  const isAttachment = attachments.length > 0;

  return (
    <div
      className={`flex w-full ${
        isCurrentUser ? "justify-end" : "justify-start"
      } mb-1`}
    >
      <div className={`flex items-end gap-x-3 max-w-[80%]`}>
        {!isCurrentUser && (
          <Image
            src={userImage}
            alt="user-image"
            width={200}
            height={200}
            className="rounded-full size-6 max-lg:hidden"
          />
        )}
        <div
          className={`flex flex-col ${
            isCurrentUser
              ? "bg-primaryCol msg-radius-user"
              : "bg-secondaryCol msg-radius"
          } text-bg sm:text-md text-sm px-5 pt-3 pb-2`}
        >
          {isAttachment ? (
            <div>{renderAttachment(attachments[0])}</div>
          ) : (
            <p>{message}</p>
          )}
          <div
            className={`sm:text-[10px] text-[10px] ${
              isCurrentUser
                ? "text-neutral-100 justify-end"
                : "text-gray-500 justify-start"
            } pointer-events-none select-none flex items-center gap-x-2`}
          >
            <p>{formattedDate}</p>
            {isCurrentUser && renderDeliveryStatus(hasDelivered, hasRead)}
          </div>
        </div>
      </div>
    </div>
  );
};

const renderAttachment = (media: {
  public_id: string;
  url: string;
  _id: string;
}) => {
  switch (getFileType(media.url)) {
    case "image":
      return (
        <Image
          src={media.url}
          alt="Attachment"
          width={1000}
          height={1000}
          className="w-[350px] h-[250px] rounded-md object-cover"
        />
      );
    case "video":
      return (
        <video controls className="w-[450px] rounded-md">
          <source
            src={media.url}
            type={`video/${media?.url?.split(".")?.pop()?.toLowerCase() ?? ""}`}
          />
          Your browser does not support the video tag.
        </video>
      );
    case "audio":
      return (
        <audio
          src={media.url}
          controls
          className="max-xs:w-[200px] w-[250px] rounded-lg"
        ></audio>
      );
    default:
      return (
        <a
          href={media.url}
          download
          target="_blank"
          className="underline cursor-pointer"
          rel="noopener noreferrer"
        >
          Download File
        </a>
      );
  }
};

const renderDeliveryStatus = (hasDelivered: boolean, hasRead: boolean) => {
  if (hasDelivered && !hasRead) return <Check className="sm:size-4 size-3.5" />;
  if (hasDelivered && hasRead)
    return <CheckCheck className="sm:size-4 size-3.5" />;
  return <Clock className="sm:size-4 size-3.5" />;
};
