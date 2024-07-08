import { messagesData } from "@/utils/data";
import { Message } from "./Message";
import { MessageSkeleton } from "../skeletons";

export const Conversation = () => {
  return (
    <div className="relative mt-3 overflow-y-auto max-h-[75vh] h-full flex items-end gap-x-3 w-full bg-white py-3 rounded-2xl shadow-md">
      <div className="relative flex flex-col gap-y-3 sm:px-5 px-2 pt-10 mb-5 w-full overflow-y-auto h-full">
        {messagesData && messagesData.length > 0 ? (
          messagesData.map((message, index) => (
            <>
              <Message
                key={index}
                message={message.message}
                isCurrentUser={message.isCurrentUser}
                userImage={message.userImage}
                sentTime={message.sentTime}
                hasRead={message.hasRead}
                hasDelivered={message.hasDelivered}
              />
              {/* <MessageSkeleton /> */}
            </>
          ))
        ) : (
          //  If it's a new chat
          <div className="flex flex-col items-center justify-end">
            <p className="bg-hoverCol rounded-full py-1 px-10 max-w-[70%] w-full text-center text-lg text-secondaryCol/80 font-roboto shadow-sm">
              Start a conversation
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
