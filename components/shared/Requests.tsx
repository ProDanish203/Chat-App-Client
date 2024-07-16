import { acceptRejectRequest, withdrawRequest } from "@/API/request.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface Props {
  isPending?: boolean;
  isLoading: boolean;
  data: any;
}

interface RequestCardProps {
  id: string;
  fullName: string;
  image: string;
  isPending?: boolean;
}

const RequestCard = ({ id, image, fullName, isPending }: RequestCardProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: mutateWithdraw, isPending: isWithdrawing } = useMutation(
    {
      mutationFn: withdrawRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["pending-requests"],
        });
      },
    }
  );

  const { mutateAsync, isPending: isResponding } = useMutation({
    mutationFn: acceptRejectRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["incoming-requests"],
      });
    },
  });

  const handleWithdraw = async () => {
    const { response, success } = await mutateWithdraw(id);
    if (success) {
      toast.success("Request withdrawn successfully!");
    } else return toast.error(response as string);
  };

  const handleRequestResponse = async (status: string) => {
    const { response, success } = await mutateAsync({
      id,
      status,
    });
    if (success) {
      toast.success(`Request ${status}!`);
    } else return toast.error(response as string);
  };

  return (
    <div className="w-full flex items-center gap-x-2 py-4 px-3 rounded-md bg-white">
      <div className="">
        <Image
          src={image}
          alt={fullName}
          width={100}
          height={100}
          className="size-20 rounded-full"
        />
      </div>

      <div className="sm:w-[80%]">
        <p className="font-medium sm:text-lg">{fullName}</p>
        <div className="mt-2 flex items-center justify-between gap-x-2 w-full">
          {!isPending ? (
            <>
              <Button
                disabled={isResponding}
                onClick={() => handleRequestResponse("approved")}
                className="w-full bg-primaryCol hover:bg-primaryCol/80 active:scale-95 transition-all duration-100"
              >
                Accept
              </Button>
              <Button
                disabled={isResponding}
                onClick={() => handleRequestResponse("rejected")}
                className="w-full bg-secondaryCol hover:bg-secondaryCol/80 active:scale-95 transition-all duration-100"
              >
                Reject
              </Button>
            </>
          ) : (
            <Button
              disabled={isWithdrawing}
              onClick={handleWithdraw}
              className="w-full bg-secondaryCol hover:bg-secondaryCol/80 active:scale-95 transition-all duration-100"
            >
              Withdraw Request
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const Requests = ({ data, isLoading, isPending }: Props) => {
  return (
    <div className="flex flex-col gap-y-2 w-full ">
      {isLoading ? (
        // <RequestSkeleton />
        <p>Loading...</p>
      ) : data && data.data.length > 0 ? (
        data.data.map((request: any, index: number) => (
          <div key={index} className="w-full">
            {!isPending ? (
              <RequestCard
                id={request._id}
                fullName={request.sender.fullName}
                image={request.sender.avatar.url}
              />
            ) : (
              <RequestCard
                id={request._id}
                fullName={request.receiver.fullName}
                image={request.receiver.avatar.url}
                isPending
              />
            )}
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};
