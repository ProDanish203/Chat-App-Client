import MobileLayout from "@/components/layouts/MobileLayout";
import { Chats } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ChatsPage = () => {
  return (
    <>
      <div className="max-lg:hidden center flex-col gap-y-5 h-screen w-screen">
        <h2 className=" text-4xl font-semibold">It seems you're missing!</h2>
        <Link href="/">
          <Button
            size={"lg"}
            className="bg-primaryCol hover:bg-primaryCol/80 mt-5 text-textDark flex items-center gap-x-2 hover:gap-x-3 transition-all duration-100"
          >
            Go Back
            <ArrowRight className="size-5" />
          </Button>
        </Link>
      </div>
      <MobileLayout>
        <section>
          <Chats />
        </section>
      </MobileLayout>
    </>
  );
};

export default ChatsPage;
