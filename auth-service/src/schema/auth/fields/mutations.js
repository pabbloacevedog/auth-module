// auth/fields/mutations.js

import { GraphQLString, GraphQLInt } from 'graphql';
import LoginType from '../type.js';
import { authResolver } from '../resolvers.js';

export const register = {
	type: LoginType,
	args: {
		email: { type: GraphQLString },
		password: { type: GraphQLString },
		// ... otros campos necesarios
	},
	resolve: authResolver.Mutation.signup
};

