import { object, string, TypeOf } from "zod";

const params = {
    params: object({
        postId: string()
    })
}

export const CreateCommentSchema = object({
    ...params,
    body: object({
        comment: string({
                required_error: "Comment cannot be empty",
            })
            .min(1, "Your comment cannot be less than 1 character")
    }),
});

export type CreateCommentRequest = TypeOf<typeof CreateCommentSchema>;
