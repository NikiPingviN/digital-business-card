import { join } from 'node:path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { createProfileLoaders } from '../profile/profile.loaders';
import { ProfileService } from '../profile/profile.service';

export function createGraphqlOptions(profileService: ProfileService): ApolloDriverConfig {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    autoSchemaFile: isProduction ? true : join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    introspection: true,
    graphiql: false,
    context: (): { loaders: ReturnType<typeof createProfileLoaders> } => ({
      loaders: createProfileLoaders(profileService),
    }),
    plugins: [
      // Apollo publishes this plugin as ESM, while Nest resolves the CJS build.
      ApolloServerPluginLandingPageLocalDefault({ embed: true }) as unknown as NonNullable<
        ApolloDriverConfig['plugins']
      >[number],
    ],
  };
}
