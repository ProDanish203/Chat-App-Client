"use client";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { UserProfileDialog } from "./UserProfileDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import useChatStore from "@/store/chat.store";
import { Button } from "../ui/button";

export const ConversationOptions = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");

  return (
    <>
      <UserProfileDialog open={open} setOpen={setOpen} userId={userId} />
      <ConfirmationDialog
        open={confirmationOpen}
        setOpen={setConfirmationOpen}
        blockUser={confirmationType === "block"}
        reportUser={confirmationType === "report"}
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="relative overflow-hidden lg:size-12 size-9 center rounded-full bg-white border border-secondaryCol text-text duration-300 outline-none hover:bg-secondaryCol hover:text-textDark [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90">
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="px-5" onClick={() => setOpen(true)}>
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="!text-red-500 hover:!text-red-500 hover:!bg-red-100 px-5"
            onClick={() => {
              setConfirmationOpen(true);
              setConfirmationType("report");
            }}
          >
            Report
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setConfirmationOpen(true);
              setConfirmationType("block");
            }}
            className="!text-red-500 hover:!text-red-500 hover:!bg-red-100 px-5"
          >
            Block
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const ConfirmationDialog = ({
  blockUser,
  reportUser,
  open,
  setOpen,
}: {
  blockUser?: boolean;
  reportUser?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const chatData = useChatStore((state) => state);

  const handleBlockUser = () => {
    console.log("Blocked user");
  };
  const handleReportUser = () => {
    console.log("Reported user");
  };

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaContent className="max-md:min-h-[400px]">
        <CredenzaHeader>
          <CredenzaTitle>
            Do you want to {reportUser ? "report" : blockUser && "block"}{" "}
            <span className="font-semibold">{chatData.fullName}</span>?{" "}
          </CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="space-y-4 pb-4 text-center text-sm sm:pb-0 sm:text-left">
          <p>
            You can unblock them later in the settings but you won't be able to
            receive messages from them. Are you sure you want to block them?
          </p>
          <CredenzaFooter className="">
            <Button
              onClick={() => setOpen(false)}
              className="bg-secondaryCol/90 hover:bg-secondaryCol"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                blockUser && handleBlockUser();
                reportUser && handleReportUser();
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              {blockUser && "Block"}
              {reportUser && "Report"}
            </Button>
          </CredenzaFooter>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};
