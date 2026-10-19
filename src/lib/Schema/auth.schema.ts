import * as z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name is required",
    }),

    email: z.string().email({
      message: "Invalid email address",
    }),

    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),

    rePassword: z.string().min(6, {
      message: "Re-entered password must be at least 6 characters",
    }),

    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, {
        message: "Invalid Egyptian phone number",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });


  export const loginSchema = z.object({
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",  
    }), 


  });
export type RegisterSchemaType = z.infer<typeof registerSchema>;


export type  LoginSchemaType = z.infer<typeof loginSchema>;
