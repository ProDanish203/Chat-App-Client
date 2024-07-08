import { Skeleton } from "@/components/ui/skeleton";

export const ChatUserSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-x-4 py-3 px-5 w-full">
          <Skeleton className="h-12 w-12 rounded-full bg-hoverCol" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px] bg-hoverCol" />
            <Skeleton className="h-4 w-[250px] bg-hoverCol" />
          </div>
        </div>
      ))}
    </>
  );
};
