"use client";
import { getRequests } from "@/API/request.api";
import MainLayout from "@/components/layouts/MainLayout";
import { AddFriends, RequestSlider } from "@/components/shared";
import { useQuery } from "@tanstack/react-query";

const RequestPage = () => {
  const { data: incomingRequests, isLoading } = useQuery({
    queryKey: ["incomingRequests"],
    queryFn: () => getRequests({ status: "incoming" }),
  });

  const { data: pendingRequests, isLoading: pendingLoading } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: () => getRequests({ status: "pending" }),
  });
  return (
    <MainLayout>
      <section className="w-full relative">
        <div className=" bg-white py-5 px-5 rounded-2xl shadow-md">
          <div className="flex items-center gap-x-5">
            <h3 className="font-semibold sm:text-xl text-lg">
              Friend Requests
            </h3>
            <AddFriends />
          </div>
        </div>

        <RequestSlider
          title="Incoming Requests"
          isLoading={isLoading}
          data={incomingRequests && incomingRequests.response}
        />
        <RequestSlider
          title="Pending Requests"
          isLoading={pendingLoading}
          data={pendingRequests && pendingRequests.response}
          isPending
        />
      </section>
    </MainLayout>
  );
};

export default RequestPage;
