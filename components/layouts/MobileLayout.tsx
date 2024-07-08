import { BottomBar, Sidebar } from "../shared";

export default function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="lg:hidden relative w-full">
      {children}

      <BottomBar />
    </main>
  );
}
