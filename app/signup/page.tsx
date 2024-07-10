"use client";
import AuthLayout from "@/components/layouts/AuthLayout";
import { registerSchema } from "@/validations/auth.validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/API/auth.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/store/AuthProvider";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { FloatingInput, PasswordInput } from "@/components/forms";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { convertImage } from "@/lib/helpers";
import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

const SignupPage = () => {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState("");

  const handleFileChange = async (file: any) => {
    try {
      setFile(file);
      const base64Image = await convertImage(file);
      setImage(base64Image);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: registerUser,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async (
    data
  ) => {
    if (!image || !file) return toast.error("Please select a profile picture");
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("fullName", data.fullName);
    formData.append("password", data.password);
    formData.append("avatar", file as Blob);

    const { response, success } = await mutateAsync(formData);
    console.log(response);
    if (success) {
      toast.success("Registeration successfull");
      router.push("/login");
    } else return toast.error(response as string);
  };

  return (
    <AuthLayout>
      <section className="max-w-lg mx-auto w-full max-xs:px-4 z-10">
        <h2 className="font-bold text-5xl text-center">Sign In</h2>
        <p className="text-neutral-400 text-sm font-roboto font-normal text-center mt-5">
          Sign in using your registered credentials to start chatting with your
          friends and family.
        </p>
        <form
          className="max-w-md mx-auto bg-white rounded-3xl sm:p-8 p-2 z-10 mt-8 flex flex-col gap-y-7"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative w-full mx-auto center">
            <label
              htmlFor="avatar"
              className="cursor-pointer relative size-24 shadow-md  bg-hoverCol rounded-full"
            >
              <Image
                src={image || "/images/dummy-user.webp"}
                alt="avatar"
                width={100}
                height={100}
                className="w-full h-full rounded-full object-cover"
              />
              <div className="center size-7 rounded-full bg-white absolute bottom-0 -right-1">
                <Camera className="size-5" />
              </div>
            </label>
            <input
              type="file"
              className="hidden"
              id="avatar"
              accept="image/jpeg, image/png"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
            />
          </div>
          <div className="relative">
            <FloatingInput
              placeholder="Email Address"
              type="email"
              name="email"
              register={register}
            />
            {errors.email && (
              <span className="mt-1 absolute text-red-500 text-[12px]">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="relative">
            <FloatingInput
              placeholder="Username"
              type="text"
              name="username"
              register={register}
            />
            {errors.username && (
              <span className="mt-1 absolute text-red-500 text-[12px]">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="relative">
            <FloatingInput
              placeholder="Full Name"
              type="text"
              name="fullName"
              register={register}
            />
            {errors.fullName && (
              <span className="mt-1 absolute text-red-500 text-[12px]">
                {errors.fullName.message}
              </span>
            )}
          </div>

          <div className="relative w-full mb-1">
            <PasswordInput
              placeholder="Password"
              name="password"
              register={register}
            />
            {errors.password && (
              <span className="mt-1 absolute text-red-500 text-[12px]">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button
            role="submit"
            className="py-6 bg-primaryCol hover:bg-primaryCol/90 text-[16px] rounded-lg"
            size="lg"
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </form>

        <p className="text-para font-roboto mt-5 text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-primaryCol underline font-medium">
            Login now
          </Link>
        </p>
      </section>
    </AuthLayout>
  );
};

export default SignupPage;
