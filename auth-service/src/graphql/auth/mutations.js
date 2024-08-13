// auth/fields/mutations.js

import { GraphQLString, GraphQLInt } from 'graphql';
import LoginType from './type.js';
import { authResolver } from './resolvers.js';

export const register = {
	type: LoginType,
	args: {
		email: { type: GraphQLString },
		password: { type: GraphQLString },
		// ... otros campos necesarios
	},
	resolve: authResolver.Mutation.signup
};

export const forgotPassword = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLString },
    },
    resolve: authResolver.Mutation.forgotPassword,
};

export const resetPassword = {
    type: GraphQLString,
    args: {
        verification_code: { type: GraphQLString },
        newPassword: { type: GraphQLString },
    },
    resolve: authResolver.Mutation.resetPassword,
};
