"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResource = void 0;
const userResource = (user) => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
};
exports.userResource = userResource;
