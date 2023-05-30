import { TypeOf, object, string, z } from "zod";

export const CreatePostSchema = z.object({
  body: z.object({
    title: z
        .string({
            required_error: "Add post title"
        })
        .min(2, "Your post title cannot be less than 2 characters"),
    content: z
        .string({
            required_error: "Add post content",
        })
        .min(50, "Your post content cannot be less than 50 characters")
  }),
});

const params = {
    params: object({
        postId: string()
    })
}

export const getPostSchema = object({
    ...params
})

export type CreatePostRequest = TypeOf<typeof CreatePostSchema>["body"];
export type GetPostRequest = TypeOf<typeof getPostSchema>['params'];

