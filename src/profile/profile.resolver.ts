import { Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLContext } from '../graphql/graphql-context';
import {
  toExperienceType,
  toLinkType,
  toProjectType,
  toSkillType,
} from './profile.mapper';
import { ProfileRecord } from './profile.repository';
import { ProfileService } from './profile.service';
import { ExperienceType, LinkType, ProfileType, ProjectType, SkillType } from './profile.types';

@Resolver(() => ProfileType)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileType, {
    description: 'Публичный профиль и связанные с ним разделы визитки',
  })
  profile(): Promise<ProfileRecord> {
    return this.profileService.getProfile();
  }

  @ResolveField(() => [LinkType])
  async links(
    @Parent() profile: ProfileRecord,
    @Context() context: GraphQLContext,
  ): Promise<LinkType[]> {
    const rows = await context.loaders.links.load(profile.id);
    return rows.map(toLinkType);
  }

  @ResolveField(() => [SkillType])
  async skills(
    @Parent() profile: ProfileRecord,
    @Context() context: GraphQLContext,
  ): Promise<SkillType[]> {
    const rows = await context.loaders.skills.load(profile.id);
    return rows.map(toSkillType);
  }

  @ResolveField(() => [ExperienceType])
  async experience(
    @Parent() profile: ProfileRecord,
    @Context() context: GraphQLContext,
  ): Promise<ExperienceType[]> {
    const rows = await context.loaders.experiences.load(profile.id);
    return rows.map(toExperienceType);
  }

  @ResolveField(() => [ProjectType])
  async projects(
    @Parent() profile: ProfileRecord,
    @Context() context: GraphQLContext,
  ): Promise<ProjectType[]> {
    const rows = await context.loaders.projects.load(profile.id);
    return rows.map(toProjectType);
  }
}
