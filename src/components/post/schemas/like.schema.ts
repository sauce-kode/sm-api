import { object, string, TypeOf } from "zod";

const params = {
    params: object({
        postId: string()
    })
}

export const LikeCommentSchema = object({
    ...params
});

export type LikeCommentRequest = TypeOf<typeof LikeCommentSchema>;
