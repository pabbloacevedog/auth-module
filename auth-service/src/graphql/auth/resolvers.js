// src/resolvers/authResolver.js

import { login, signup } from '../../services/authService.js';

export const authResolver = {
    Mutation: {
        signup: async (_, { email, password }) => {
            return await signup(email, password);
        },
        forgotPassword: async (_, { email }) => {
            return await forgotPassword(email);
        },
        resetPassword: async (_, { verification_code, newPassword }) => {
            return await resetPassword(verification_code, newPassword);
        },
    },
    Query: {
        login: async (_, { email, password }, { res }) => {
            return await login(email, password, res);
        },
    },
};
