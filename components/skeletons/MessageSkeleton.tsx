import { Skeleton } from "../ui/skeleton";

export const MessageSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`flex w-full ${
            i % 2 == 0 ? "justify-end" : "justify-start"
          }`}
        >
          <div className="flex items-end gap-x-3 max-w-[80%]">
            {i % 2 !== 0 && (
              <Skeleton className="max-sm:hidden size-8 rounded-full bg-hoverCol" />
            )}
            <div className="space-y-2">
              <Skeleton
                className={`h-16 w-[200px] bg-hoverCol ${
                  i % 2 === 0 ? "msg-radius-user" : "msg-radius"
                }`}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
