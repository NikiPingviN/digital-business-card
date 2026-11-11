import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const experienceInclude = {
  achievements: {
    orderBy: { sortOrder: 'asc' },
  },
} satisfies Prisma.ExperienceInclude;

export type ProfileRecord = {
  id: string;
  name: string;
  description: string;
};

export type LinkRecord = Prisma.LinkGetPayload<Record<string, never>>;
export type SkillRecord = Prisma.SkillGetPayload<Record<string, never>>;
export type ProjectRecord = Prisma.ProjectGetPayload<Record<string, never>>;
export type ExperienceRecord = Prisma.ExperienceGetPayload<{
  include: typeof experienceInclude;
}>;

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  findProfile(): Promise<ProfileRecord | null> {
    return this.prisma.profile.findFirst({
      select: { id: true, name: true, description: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  findLinksByProfileIds(profileIds: readonly string[]): Promise<LinkRecord[]> {
    return this.findByProfileIds(profileIds, (ids) =>
      this.prisma.link.findMany({
        where: { profileId: { in: ids } },
        orderBy: [{ profileId: 'asc' }, { sortOrder: 'asc' }],
      }),
    );
  }

  findSkillsByProfileIds(profileIds: readonly string[]): Promise<SkillRecord[]> {
    return this.findByProfileIds(profileIds, (ids) =>
      this.prisma.skill.findMany({
        where: { profileId: { in: ids } },
        orderBy: [{ profileId: 'asc' }, { sortOrder: 'asc' }],
      }),
    );
  }

  findProjectsByProfileIds(profileIds: readonly string[]): Promise<ProjectRecord[]> {
    return this.findByProfileIds(profileIds, (ids) =>
      this.prisma.project.findMany({
        where: { profileId: { in: ids } },
        orderBy: [{ profileId: 'asc' }, { sortOrder: 'asc' }],
      }),
    );
  }

  findExperiencesByProfileIds(
    profileIds: readonly string[],
  ): Promise<ExperienceRecord[]> {
    return this.findByProfileIds(profileIds, (ids) =>
      this.prisma.experience.findMany({
        where: { profileId: { in: ids } },
        include: experienceInclude,
        orderBy: [{ profileId: 'asc' }, { startDate: 'desc' }, { sortOrder: 'asc' }],
      }),
    );
  }

  private findByProfileIds<T>(
    profileIds: readonly string[],
    query: (ids: string[]) => Promise<T[]>,
  ): Promise<T[]> {
    if (profileIds.length === 0) {
      return Promise.resolve([]);
    }

    return query([...profileIds]);
  }
}
