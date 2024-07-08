import { SendChat } from "@/components/forms";
import { Chats, ConversationHeader, Conversation } from "@/components/shared";
import MainLayout from "@/components/layouts/MainLayout";

export default function Home() {
  const isUserSelected = false;

  return (
    <MainLayout isChat>
      <section className="w-full flex gap-x-3 relative">
        <div className="max-lg:hidden xl:max-w-[450px] max-w-[300px]">
          <Chats />
        </div>
        {isUserSelected ? (
          <div className="relative w-full">
            <ConversationHeader
              isOnline={true}
              username="Danish"
              userImage=""
            />
            <Conversation />
            <SendChat />
          </div>
        ) : (
          <div className="relative w-full center flex-col gap-y-2">
            <h3 className="text-center text-xl font-semibold">
              Select a user to start chatting{" "}
            </h3>
            <p className="text-sm text-neutral-400 max-w-md text-center">
              Welcome to our chat app! Start a conversation by selecting a user
              from the list on the left.
            </p>
            <button>
              
            </button>
          </div>
        )}
      </section>
    </MainLayout>
  );
}
