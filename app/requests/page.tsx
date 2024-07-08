import { SearchBar } from "@/components/helpers";
import MainLayout from "@/components/layouts/MainLayout";
import { AddFriends, RequestSlider } from "@/components/shared";

const RequestPage = () => {
  return (
    <MainLayout >
      <section className="w-full relative">
        <div className=" bg-white py-5 px-5 rounded-2xl shadow-md">
          <div className="flex items-center gap-x-5">
            <h3 className="font-semibold sm:text-xl text-lg">
              Friend Requests
            </h3>
            <AddFriends />
          </div>
        </div>

        <RequestSlider title="Incoming Requests" />
        <RequestSlider title="Pending Requests" isPending />
        
      </section>
    </MainLayout>
  );
};

export default RequestPage;
