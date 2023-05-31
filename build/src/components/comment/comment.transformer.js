"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentResource = void 0;
const commentResource = (comment) => {
    return {
        id: comment.id,
        userId: comment.user_id,
        comment: comment.comment,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
    };
};
exports.commentResource = commentResource;
