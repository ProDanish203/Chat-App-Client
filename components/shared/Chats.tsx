import { ChatSidebar, ChatHeader, BottomBar } from "./";

export const Chats = ({
  typingUsers,
}: {
  typingUsers: { [key: string]: boolean };
}) => {
  return (
    <div className="relative w-full max-md:w-full">
      <ChatHeader />
      <ChatSidebar typingUsers={typingUsers} />
      <BottomBar />
    </div>
  );
};
