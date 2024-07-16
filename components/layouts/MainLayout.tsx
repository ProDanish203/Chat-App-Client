import { SocketProvider } from "@/store/SocketProvider";
import { BottomBar, Sidebar } from "../shared";

export default function MainLayout({
  children,
  isChat,
}: Readonly<{
  children: React.ReactNode;
  isChat?: boolean;
}>) {
  return (
    <main className="flex gap-x-3 relative bg-bg lg:p-5 md:p-3 max-sm:w-full min-h-screen">
      <SocketProvider>
        <Sidebar />

        {children}
        {!isChat && (
          // <div className="lg:hidden w-full">
            <BottomBar />
          // </div>
        )}
      </SocketProvider>
    </main>
  );
}
