import { Skeleton } from "../ui/skeleton";

export const RequestSkeleton = () => {
  return (
    <div className="flex items-center justify-between gap-x-5 overflow-x-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton
          key={i}
          className="w-[300px] py-3 px-3 rounded-lg bg-neutral-100/80"
        >
          <div className="flex items-center gap-x-3 mb-5">
            <Skeleton className="size-12 rounded-full bg-hoverCol" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px] bg-hoverCol" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-3">
            <Skeleton className="h-8 w-[250px] bg-hoverCol" />
            <Skeleton className="h-8 w-[250px] bg-hoverCol" />
          </div>
        </Skeleton>
      ))}
    </div>
  );
};
