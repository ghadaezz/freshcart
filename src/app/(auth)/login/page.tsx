"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema, LoginSchemaType } from "@/lib/Schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submitData(formData: LoginSchemaType) {
    try {
      const response = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (response?.ok) {
        toast.success("User logged in successfully");
        router.push("/products");
        return;
      }

      toast.error("Invalid email or password");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }


return (
  <div className="min-h-screen mt-16 grid grid-cols-1 lg:grid-cols-2">

    {/* Left Side */}
    <div className="hidden lg:flex flex-col items-center justify-center px-10 py-12 text-center">

      <div className="relative w-full max-w-xl h-380px overflow-hidden rounded-2xl shadow-lg">
        <Image
          src="/freshcart.png"
          alt="FreshCart shopping"
          fill
          priority
          className="object-cover"
        />
      </div>

      <h2 className="mt-6 max-w-xl text-3xl font-bold text-gray-900">
        FreshCart - Your One-Stop Shop for Fresh Products
      </h2>

      <p className="mt-4 max-w-xl text-lg leading-8 text-gray-600">
        Join thousands of happy customers who trust FreshCart
        for their daily grocery needs.
      </p>


    </div>

    {/* Right Side - Login Form */}
    <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12">

      <form
        className="w-full max-w-xl space-y-5 rounded-xl bg-white p-6 sm:p-10"
        onSubmit={handleSubmit(submitData)}
      >
        <div className="flex flex-col items-center gap-3 text-center">

          <h1 className="text-3xl font-bold">
            <span className="text-primary">Fresh</span>
            <span className="text-gray-900">Cart</span>
          </h1>

          <h2 className="text-2xl font-bold text-gray-900">
            Welcome Back!
          </h2>

          <p className="text-gray-600">
            Sign in to continue your fresh shopping experience
          </p>
        </div>

      



        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Email Address</FieldLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12"
                {...field}
              />
              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                className="h-12"
                {...field}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </Field>
          )}
        />

        {/* create account */}
        <div className="flex justify-center align-items text-l gap-2">
          <p>New to fresh cart? </p>
          <Link href={"/register"}
            
            className=" text-primary "
          >
             create an account
          </Link>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="h-12 w-full text-base font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "Sign In"}
        </Button>

      </form>
    </div>
  </div>
);

}
