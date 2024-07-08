import Image from "next/image";
import { Sidebar } from "../shared";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="grid md:grid-cols-2 h-screen w-screen">
        <div className="bg-gray-200 max-md:hidden h-screen">
          <Image
            src="/images/auth-image.jpg"
            alt="Full size image"
            width={500}
            height={500}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex items-center justify-center relative bg-white w-full h-full">
          <div className="absolute md:top-10 md:right-10 top-5 right-5">
            LOGO
          </div>
          {children}
        </div>
      </main>
    </>
  );
}
