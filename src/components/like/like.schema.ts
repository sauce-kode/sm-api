import { z } from "zod";

export const CreateLikeSchema = z.object({
    body: z.object({
        postId: z.string()
    }),
});

export type LikePostRequest = z.TypeOf<typeof CreateLikeSchema>["body"];
