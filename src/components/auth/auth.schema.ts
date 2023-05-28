import { z } from "zod";

export const userRegistrationSchema = z.object({
  body: z.object({
    username: z
        .string({
            required_error: "Username is required"
        })
        .min(3, "Username cannot be less than 3 characters"),
    email: z
        .string({
            required_error: "E-mail address is required",
        })
        .email("E-mail address appears to be invalid"),
    password: z
        .string({
            required_error: "Enter a secure password",
        })
        .min(6, "Password cannot be less than 6 characters"),
    // passwordConfirm: z
    //     .string({
    //         required_error: "Please confirm your password",
    //       }),
  })
//   .refine((data) => data.password === data.passwordConfirm, {
//     path: ['passwordConfirm'],
//     message: 'Passwords do not match'
//   }),
});

export const userLoginSchema = z.object({
    body: z.object({
      username: z
          .string({
              required_error: "Enter your username or E-mail address"
          })
          .min(3, "Username or E-mail address cannot be less than 3 characters"),
      password: z
          .string({
              required_error: "Enter your secure password",
          })
          .min(6, "Password cannot be less than 6 characters"),
    }),
  });

export type UserLoginRequest = z.TypeOf<typeof userLoginSchema>["body"];
export type UserRegistrationRequest = z.TypeOf<typeof userRegistrationSchema>["body"];
