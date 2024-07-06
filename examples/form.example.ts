// const {
//   register,
//   setValue,
//   getValues,
//   handleSubmit,
//   formState: { errors, isSubmitting },
// } = useForm<z.infer<typeof loginSchema>>({
//   resolver: zodResolver(loginSchema),
// });

// const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {
//   const { response, success } = await mutateAsync(data);
//   // console.log(response);
//   if (success == false) return toast.error(response as string);
//   if (success == true) {
//     toast.success("Login successfull");
//   }
// };
