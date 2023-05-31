import { z } from "zod";

export const CreateCommentSchema = z.object({
    body: z.object({
        postId: z.string(),
        comment: z.string({
                required_error: "Comment cannot be empty",
            })
            .min(1, "Your comment cannot be less than 1 character")
    }),
});

export type CreateCommentRequest = z.TypeOf<typeof CreateCommentSchema>["body"];
