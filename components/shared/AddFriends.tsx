"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

const FriendCard = () => {
  return (
    <div
      className={`flex items-center gap-x-3 py-3 px-3 rounded-lg w-full cursor-pointer hover:bg-hoverCol transition-all duration-100 border-b border-b-hoverCol`}
    >
      <Image
        src={"/images/dummy-user.webp"}
        alt="user"
        width={200}
        height={200}
        className="rounded-full size-10"
      />

      <div className="flex flex-col gap-y-1 w-full">
        <h4 className="font-semibold text-text">Danish Siddiqui</h4>
        <p className="text-sm text-neutral-400 truncate font-roboto"></p>
      </div>

      <div className="flex flex-col gap-y-2 items-end text-right w-full">
        <button className="size-10 cursor-pointer hover:bg-primaryCol hover:text-white border border-primaryCol transition-all duration-200 rounded-full center text-primaryCol bg-white">
          <Plus className="size-6" />
        </button>
      </div>
    </div>
  );
};

export const AddFriends = () => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <Dialog>
      <DialogTrigger className="size-10 cursor-pointer hover:bg-white hover:text-primaryCol hover:border hover:border-primaryCol transition-all duration-200 rounded-full center text-textDark bg-primaryCol">
        <Plus />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-roboto text-lg text-secondaryCol ">
            Start a new chat!{" "}
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-400">
            Find new friends by searching their username or by looking through
            their email address
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSearch}>
          <div className="flex items-center gap-x-3">
            <Input
              type="text"
              className="w-full text-sm h-10 ring-offset-0 placeholder:text-muted-foreground text-neutral-500 focus-visible:outline-none
              "
              placeholder="Enter username or email"
            />
            <Button className="bg-secondaryCol text-textDark rounded-full size-12">
              <Search className="size-6" />
            </Button>
          </div>
        </form>

        <div className="flex flex-col gap-y-3">
          <FriendCard />
          <FriendCard />
          <FriendCard />
        </div>
      </DialogContent>
    </Dialog>
  );
};
