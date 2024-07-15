import 'reflect-metadata'; // Needed to handle the decorators from type-graphql
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import { CategoryResolver } from './category/category.resolver';
import { logger } from './common/pino';
import { ProductResolver } from './product/product.resolver';
import { UserResolver } from './user/user.resolver';

(async (): Promise<void> => {
  const schema = await buildSchema({
    resolvers: [CategoryResolver, ProductResolver, UserResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 },
  });

  logger.info(`Apollo server is ready at ${url}`);
})();
