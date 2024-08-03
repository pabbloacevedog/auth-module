// Imports
import {GraphQLObjectType, GraphQLString, GraphQLList} from 'graphql'

// Login type
const LoginType = new GraphQLObjectType({
    name: 'Login',
    description: 'Autentincación de usuario',

    fields: () => ({
        user_id: {
            type: GraphQLString
        },
        rut_user: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        user: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        personal_phone: {
            type: GraphQLString
        },
        verification_code: {
            type: GraphQLString
        },
        verified: {
            type: GraphQLString
        },
        avatar: {
            type: GraphQLString
        },
        state: {
            type: GraphQLString
        },
		role_id: {
            type: GraphQLString
        },
        acciones: { type: new GraphQLList(GraphQLString) },
    })
})

export default LoginType
