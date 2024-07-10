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
import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSearchedUsers, sendRequest } from "@/API/chats.api";
import { toast } from "sonner";
import { UserTypes } from "@/types/types";

const FriendCard = ({
  avatar,
  fullName,
  username,
  id,
  setOpen,
  setSearch,
}: {
  avatar: string;
  fullName: string;
  id: string;
  username: string;
  setOpen: any;
  setSearch: any;
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: sendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat-users"],
      });
    },
  });

  const handleSubmit = async (id: string) => {
    const { response, success } = await mutateAsync(id);
    if (success) {
      toast.success("Friend request sent successfully!");
      setOpen(false);
      setSearch("");
    } else return toast.error(response as string);
  };

  return (
    <div
      className={`flex items-center gap-x-3 py-3 px-3 rounded-lg w-full cursor-pointer hover:bg-hoverCol transition-all duration-100 border-b border-b-hoverCol`}
    >
      <Image
        src={avatar || "/images/dummy-user.webp"}
        alt={username}
        width={200}
        height={200}
        className="rounded-full size-10"
      />

      <div className="flex flex-col gap-y-1 w-full">
        <h4 className="font-semibold text-text">{fullName}</h4>
        <p className="text-sm text-neutral-400 truncate font-roboto"></p>
      </div>

      <div className="flex flex-col gap-y-2 items-end text-right w-full">
        <button
          onClick={() => handleSubmit(id)}
          className="size-10 cursor-pointer hover:bg-primaryCol hover:text-white border border-primaryCol transition-all duration-200 rounded-full center text-primaryCol bg-white"
        >
          <Plus className="size-6" />
        </button>
      </div>
    </div>
  );
};

export const AddFriends = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<UserTypes[]>([] as any);

  const { mutateAsync } = useMutation({
    mutationFn: getSearchedUsers,
  });

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!search) return;
    const { response, success } = await mutateAsync(search);
    if (success && response.success) {
      setResults(response.data);
    } else return toast.error(response as string);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
            <Button
              type="submit"
              className="bg-secondaryCol text-textDark rounded-full size-12"
            >
              <Search className="size-6" />
            </Button>
          </div>
        </form>

        <div className="flex flex-col gap-y-3 max-h-[400px] overflow-y-auto">
          {results.length > 0 &&
            results.map((user: UserTypes, idx: number) => (
              <FriendCard
                avatar={user.avatar.url}
                fullName={user.fullName}
                username={user.username}
                id={user._id}
                setOpen={setOpen}
                setSearch={setSearch}
              />
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
