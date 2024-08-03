// src/resolvers/authResolver.js

import { login, signup } from '../../services/authService.js';

export const authResolver = {
    Mutation: {
        signup: async (parent, { email, password }) => {
            return await signup( email, password);
        },
    },
    Query: {
		login: async ({ email, password }, { res }) => {
            return await login(email, password, res);
        },
    },
};

