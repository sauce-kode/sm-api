"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResource = void 0;
const postResource = (post) => {
    return {
        id: post.id,
        userId: post.user_id,
        author: post.author,
        title: post.title,
        content: post.content,
        created_at: post.created_at,
        updated_at: post.updated_at,
    };
};
exports.postResource = postResource;
