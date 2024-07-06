// Getting data
// const { data, isLoading } = useQuery({
//     queryKey: ["users", page, limit, search, filter],
//     queryFn: () => getUsers({ page, limit, search, filter }),
//   });

// Sending data
// const queryClient = useQueryClient();

// const { mutateAsync, isPending } = useMutation({
//   mutationFn: addMembers,
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: [`project-${id}`] });
//   },
// });

// const handleAdd = async () => {
//   if (!users || users.length == 0) return toast.error("Add atleast 1 user");
//   const userIds = users.map((user) => user.id);

//   const { success, response } = await mutateAsync({
//     id,
//     users: userIds,
//   });
//   if (!success) return toast.error(response);
//   toast.success("Members added");
// };
