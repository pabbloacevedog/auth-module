import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import schema from '../schema/index.js';
import context from '../utils/context.js';

export async function setupGraphQL(app, httpServer) {
    console.info('SETUP - Configurando GraphQL...');

    const apolloServer = new ApolloServer({
        schema,
        context,
        introspection: true,
    });

    await apolloServer.start();

    app.use('/graphql', expressMiddleware(apolloServer));
}
