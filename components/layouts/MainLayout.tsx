import { Sidebar } from "../shared";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex gap-x-3 relative bg-bg md:p-5 min-h-screen">
      <Sidebar />
      {children}
    </main>
  );
}
