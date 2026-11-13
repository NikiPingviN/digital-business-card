import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { createGraphqlOptions } from './graphql/graphql.options';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { ProfileService } from './profile/profile.service';
import { SiteModule } from './site/site.module';

@Module({
  imports: [
    PrismaModule,
    ProfileModule,
    SiteModule,
    HealthModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ProfileModule],
      inject: [ProfileService],
      useFactory: (profileService: ProfileService) => createGraphqlOptions(profileService),
    }),
  ],
})
export class AppModule {}
