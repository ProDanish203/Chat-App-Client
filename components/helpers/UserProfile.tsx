"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser, logoutUser } from "@/API/auth.api";
import { useAuth } from "@/store/AuthProvider";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { UserTypes } from "@/types/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useChatStore, { getStateValues } from "@/store/chat.store";

export const UserProfile = () => {
  const router = useRouter();

  const { user, setUser }: { user: UserTypes; setUser: (user: any) => void } =
    useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
    initialData: user ? { success: true, response: user } : undefined,
  });

  useEffect(() => {
    if (!isLoading && data && data.success && data.response) {
      setUser(data.response);
    }
    // else if (!isLoading && data && !data.success) {
    //   typeof window !== undefined && localStorage.removeItem("token");
    //   router.push("/login");
    // }
  }, [data]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: logoutUser,
  });

  const setValues = useChatStore((state) => state.setValues);

  const handleLogout = async () => {
    const { success, response } = await mutateAsync();
    if (!success) return toast.error(response);
    setValues(getStateValues(useChatStore.getInitialState()));
    setUser(undefined);
    toast.success("Logged out successfully");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        {user ? (
          <Image
            src={user.avatar.url || "/images/dummy-user.webp"}
            alt="user-profile"
            width={100}
            height={100}
            className="sm:size-12 size-8 rounded-full overflow-hidden object-cover cursor-pointer"
          />
        ) : (
          <Skeleton className="sm:size-12 size-8 rounded-full bg-hoverCol" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="sm:w-60 w-40">
        <DropdownMenuLabel className="max-sm:text-xs">
          {user?.fullName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="max-sm:text-xs flex items-center gap-x-2 sm:py-3 py-2 cursor-pointer">
          <User className="sm:size-5 size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="max-sm:text-xs flex items-center gap-x-2 sm:py-3 py-2 cursor-pointer">
          <Settings className="sm:size-5 size-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isPending}
          className="max-sm:text-xs flex items-center gap-x-2 sm:py-3 py-2 cursor-pointer"
        >
          <LogOut className="sm:size-5 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
