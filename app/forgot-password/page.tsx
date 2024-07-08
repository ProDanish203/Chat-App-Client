"use client";
import { forgotPassword } from "@/API/auth.api";
import { FloatingInput } from "@/components/forms";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { forgotPasswordSchema } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ForgotPasswordpage = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: forgotPassword,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof forgotPasswordSchema>> = async (
    data
  ) => {
    const { response, success } = await mutateAsync(data);
    if (success) {
      toast.success(
        "An Email has been sent to your email address with instructions to reset your password."
      );
      router.push("/reset-password");
    } else return toast.error(response as string);
  };

  return (
    <AuthLayout>
      <section className="max-w-lg mx-auto w-full max-xs:px-4 z-10">
        <h2 className="font-bold sm:text-5xl text-4xl text-center">Reset Password</h2>
        <p className="text-neutral-400 text-sm font-roboto font-normal text-center mt-5">
          Enter your email address to get instructions to reset your password.
        </p>
        <form
          className="max-w-md mx-auto bg-white rounded-3xl sm:p-8 p-2 z-10 mt-8 flex flex-col gap-y-7"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <Link href="/signup" className="text-primaryCol underline font-medium">
            Register now
          </Link>
        </p>
      </section>
    </AuthLayout>
  );
};

export default ForgotPasswordpage;
