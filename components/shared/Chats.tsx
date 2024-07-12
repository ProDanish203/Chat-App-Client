import { ChatSidebar, ChatHeader, BottomBar } from "./";

export const Chats = () => {
  return (
    <div className="relative w-full max-md:w-full">
      <ChatHeader />
      <ChatSidebar />
      <BottomBar />
    </div>
  );
};
