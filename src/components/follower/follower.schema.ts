import { z } from "zod";

export const followUserSchema = z.object({
  body: z.object({
    followingUserId: z
        .string()
  })
});

export type FollowUserRequest = z.TypeOf<typeof followUserSchema>["body"];
