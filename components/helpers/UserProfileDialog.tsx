"use client";
import { getUserProfile } from "@/API/user.api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export const UserProfileDialog = ({
  open,
  setOpen,
  userId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="outline-none max-w-[600px] w-full">
        {isLoading ? (
          <div className="center">
            <svg
              className="animate-spin size-16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="#ff4a09"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="#ff4a09"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          data &&
          data.success &&
          data.response && (
            <div className="w-full">
              <div className="w-full flex items-center gap-x-2 gap-y-2">
                <Image
                  src={data.response.data.avatar.url}
                  alt={data.response.data.username}
                  width={200}
                  height={200}
                  className="size-24 rounded-full border shadow-sm border-secondaryCol object-cover"
                />
                <div>
                  <DialogTitle className="font-semibold text-lg text-text">
                    {data.response.data.fullName}
                  </DialogTitle>
                  <p className="text-sm text-neutral-400">
                    @{data.response.data.username}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};
