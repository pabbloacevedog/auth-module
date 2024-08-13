
import { GraphQLString } from 'graphql';
import LoginType from './type.js';
import { authResolver } from './resolvers.js';

export const login = {
	type: LoginType,
	args: {
		email: { type: GraphQLString },
		password: { type: GraphQLString }
	},
	resolve: authResolver.Query.login
};

