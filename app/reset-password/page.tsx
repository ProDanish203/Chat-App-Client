"use client";
import { resetPassword } from "@/API/auth.api";
import { PasswordInput } from "@/components/forms";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { resetPasswordSchema } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ResetPasswordpage = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: resetPassword,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof resetPasswordSchema>> = async (
    data
  ) => {
    if (data.password !== data.confirmPassword) {
    }
    const { response, success } = await mutateAsync({
      token: "",
      password: data.password,
    });
    if (success) {
      toast.success(
        "An Email has been sent to your email address with instructions to reset your password."
      );
      router.push("/login");
    } else return toast.error(response as string);
  };

  return (
    <AuthLayout>
      <section className="max-w-lg mx-auto w-full max-xs:px-4 z-10">
        <h2 className="font-bold sm:text-4xl text-3xl text-center">Create New Password</h2>
        <p className="text-neutral-400 text-sm font-roboto font-normal text-center mt-5">
          Enter new password to reset your account password.
        </p>
        <form
          className="max-w-md mx-auto bg-white rounded-3xl sm:p-8 p-2 z-10 mt-8 flex flex-col gap-y-7"
          onSubmit={handleSubmit(onSubmit)}
        >
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

          <div className="relative w-full mb-1">
            <PasswordInput
              placeholder="Confirm Password"
              name="confirmPassword"
              register={register}
            />
            {errors.confirmPassword && (
              <span className="mt-1 absolute text-red-500 text-[12px]">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button
            role="submit"
            className="py-6 bg-primaryCol hover:bg-primaryCol/90 text-[16px] rounded-lg"
            size="lg"
            disabled={isSubmitting}
          >
            Reset Password
          </Button>
        </form>

        <p className="text-para font-roboto mt-5 text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-primaryCol underline font-medium"
          >
            Register now
          </Link>
        </p>
      </section>
    </AuthLayout>
  );
};

export default ResetPasswordpage;
