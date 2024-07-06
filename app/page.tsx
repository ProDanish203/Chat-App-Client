import { SendChat } from "@/components/forms";
import { Chats, ConversationHeader, Conversation } from "@/components/shared";

export default function Home() {
  return (
    <section className="w-full flex gap-x-3 relative ">
      <Chats />
      <div className="relative w-full">
        <ConversationHeader isOnline={true} username="Danish" userImage="" />
        <Conversation />
        <SendChat />
      </div>
    </section>
  );
}
