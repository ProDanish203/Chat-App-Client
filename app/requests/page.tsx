"use client";
import { getRequests } from "@/API/request.api";
import MainLayout from "@/components/layouts/MainLayout";
import { AddFriends, RequestSlider, Requests } from "@/components/shared";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RequestPage = () => {
  const { data: incomingRequests, isLoading } = useQuery({
    queryKey: ["incoming-requests"],
    queryFn: () => getRequests({ status: "incoming" }),
  });

  const { data: pendingRequests, isLoading: pendingLoading } = useQuery({
    queryKey: ["pending-requests"],
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
        <Tabs defaultValue="incoming" className="sm:max-w-[500px] w-full mt-5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="incoming">Incoming</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          <TabsContent value="incoming">
            <Requests
              isLoading={isLoading}
              data={incomingRequests && incomingRequests.response}
            />
          </TabsContent>
          <TabsContent value="pending">
            <Requests
              isLoading={pendingLoading}
              data={pendingRequests && pendingRequests.response}
              isPending
            />
          </TabsContent>
        </Tabs>
      </section>
    </MainLayout>
  );
};

export default RequestPage;
