
"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { registerSchema } from "@/lib/Schema/auth.schema";
import { signUpUser } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield, Star, Van } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Register() {
    const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function submitData(formData: z.infer<typeof registerSchema>) {
    console.log(formData);

    try {
      const response = await signUpUser(formData);
      console.log(response);
      if(response.message ==  "success"){
        toast.success("User registered successfully");
        router.push("/login");
      }
      else{
        toast.error(response.message);
      }


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
  <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

    {/* Left Side */}
<div className="lg:flex flex-col  justify-center px-5 py-10 sm:px-10 lg:px-12 ">

  <h1 className="text-3xl font-bold text-gray-900">
    Welcome to <span className="text-primary">FreshCart</span>
  </h1>

  <p className="mt-6 text-gray-900">
    Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
  </p>

  <ul className="mt-6 w-full">
    <li className="flex items-center gap-3 p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Star className="h-5 w-5 text-primary" />
      </div>

      <div className="flex flex-col items-start text-left">
        <h3 className="text-sm font-semibold">
          Premium Quality
        </h3>

        <p className="text-xs text-gray-500">
          Premium quality products sourced from trusted suppliers.
        </p>
      </div>
    </li>
        <li className="flex items-center gap-3 p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Van className="h-5 w-5 text-primary" />
      </div>

      <div className="flex flex-col items-start text-left">
        <h3 className="text-sm font-semibold">
          Fast Delivery

        </h3>

        <p className="text-xs text-gray-500">
          Same-day delivery available in most areas


        </p>
      </div>
    </li>
        <li className="flex items-center gap-3 p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Shield className="h-5 w-5 text-primary" />
      </div>

      <div className="flex flex-col items-start text-left">
        <h3 className="text-sm font-semibold">
          Secure Shopping

        </h3>

        <p className="text-xs text-gray-500">
         Your data and payments are completely secure


        </p>
      </div>
    </li>
  </ul>

</div>

    {/* Right Side - Login Form */}
    <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12">

      <div className="container mx-auto p-10 flex justify-center items-center">
        <form
          className="space-y-2 bg-white shadow-lg rounded-xl p-10"
          onSubmit={handleSubmit(submitData)}
        >
          <div className="formcontent flex flex-col gap-3 justify-center items-center">

            <h1 className="text-3xl font-bold">
              Fresh <span className="text-primary">Cart</span>
            </h1>

            <h2 className="text-2xl font-bold">
              Welcome back!
            </h2>

            <p>
              Sign in to continue your fresh shopping experience
            </p>

            {/* Name */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <Field>
                    <FieldLabel>Name</FieldLabel>

                    <Input
                      type="text"
                      {...field}
                    />

                    {errors.name && (
                      <p className="text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </Field>
                );
              }}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return (
                  <Field>
                    <FieldLabel>Email</FieldLabel>

                    <Input
                      type="email"
                      {...field}
                    />

                    {errors.email && (
                      <p className="text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </Field>
                );
              }}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <Field>
                    <FieldLabel>Password</FieldLabel>

                    <Input
                      type="password"
                      {...field}
                    />

                    {errors.password && (
                      <p className="text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </Field>
                );
              }}
            />

            {/* Re-enter Password */}
            <Controller
              name="rePassword"
              control={control}
              render={({ field }) => {
                return (
                  <Field>
                    <FieldLabel>Re-enter Password</FieldLabel>

                    <Input
                      type="password"
                      {...field}
                    />

                    {errors.rePassword && (
                      <p className="text-red-500">
                        {errors.rePassword.message}
                      </p>
                    )}
                  </Field>
                );
              }}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={control}
              render={({ field }) => {
                return (
                  <Field>
                    <FieldLabel>Phone Number</FieldLabel>

                    <Input
                      type="tel"
                      {...field}
                    />

                    {errors.phone && (
                      <p className="text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </Field>
                );
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="btn btn-primary w-full h-10"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Register"}
            </Button>
        <div className="flex justify-center align-items text-l gap-2">
          <p>Already have an account? </p>
          <Link href={"/login"}
            
            className=" text-primary "
          >
             Sign in
          </Link>
        </div>
          </div>
        </form>
      </div>
    </div>
  </div>

    </>
  );
}
