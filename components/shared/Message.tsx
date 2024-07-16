import { Check, CheckCheck, Clock } from "lucide-react";
import Image from "next/image";
import { format, formatDistanceToNowStrict } from "date-fns";
import { getFileType } from "@/lib/helpers";
import { get } from "http";

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

const renderMediaContent = (media: any) => {
  const fileType = getFileType(media.url);

  switch (fileType) {
    case "image":
      return (
        <Image
          src={media.url}
          alt="Attachment"
          width={200}
          height={200}
          className="w-full rounded-md object-cover my-5"
        />
      );
    case "video":
      return (
        <video controls style={{ maxWidth: "100%", maxHeight: "200px" }}>
          <source
            src={media.url}
            type={`video/${media.url.split(".").pop().toLowerCase()}`}
          />
          Your browser does not support the video tag.
        </video>
      );
    case "audio":
      return (
        <audio controls>
          <source
            src={media.url}
            type={`audio/${media.url.split(".").pop().toLowerCase()}`}
          />
          Your browser does not support the audio tag.
        </audio>
      );
    default:
      return (
        <a href={media.url} download target="_blank" rel="noopener noreferrer">
          Download File
        </a>
      );
  }
};

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
          <div
            className={`${
              attachments.length > 1 && "grid lg:grid-cols-2 grid-cols-1 gap-1"
            } w-full h-full`}
          >
            {attachments.length > 0 &&
              attachments.map((media) => (
                <div className="mb-3 flex items-center justify-between gap-x-1 gap-y-2 flex-wrap">
                  {getFileType(media.url) === "image" ? (
                    <div className="flex items-center bg-white-500">
                      <Image
                        src={media.url}
                        alt="Attachment"
                        width={1000}
                        height={1000}
                        className="w-[350px] h-[250px] rounded-md object-cover"
                      />
                    </div>
                  ) : getFileType(media.url) === "video" ? (
                    <div className="w-full">
                      <video controls className="w-full">
                        <source
                          src={media.url}
                          type={`video/${
                            media?.url?.split(".")?.pop()?.toLowerCase() ?? ""
                          }`}
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : getFileType(media.url) === "audio" ? (
                    <div className="max-w-[250px] w-full">
                      <audio src={media.url} controls className="max-xs:w-[200px] w-[250px]"></audio>
                    </div>
                  ) : (
                    <a
                      href={media.url}
                      download
                      target="_blank"
                      className="underline cursor-pointer"
                      rel="noopener noreferrer"
                    >
                      Download File
                    </a>
                  )}
                </div>
              ))}
          </div>
          <p>{message}</p>
          <div
            className={`sm:text-[10px] text-[10px] ${
              isCurrentUser
                ? "text-neutral-100 justify-end"
                : "text-gray-500 justify-start"
            } pointer-events-none select-none flex items-center gap-x-2`}
          >
            <p>{formattedDate}</p>
            {isCurrentUser && hasDelivered && !hasRead && (
              <Check className="sm:size-4 size-3" />
            )}
            {isCurrentUser && hasDelivered && hasRead && (
              <CheckCheck className="sm:size-4 size-3 " />
            )}
            {isCurrentUser && !hasDelivered && (
              <Clock className="sm:size-4 size-3" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
