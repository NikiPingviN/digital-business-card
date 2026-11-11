import { Injectable, NotFoundException } from '@nestjs/common';
import { groupByProfileId } from './group-by-profile-id';
import {
  ExperienceRecord,
  LinkRecord,
  ProfileRecord,
  ProfileRepository,
  ProjectRecord,
  SkillRecord,
} from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  async getProfile(): Promise<ProfileRecord> {
    const profile = await this.repository.findProfile();
    if (!profile) {
      throw new NotFoundException('Profile has not been seeded');
    }

    return profile;
  }

  async getLinks(profileIds: readonly string[]): Promise<LinkRecord[][]> {
    const rows = await this.repository.findLinksByProfileIds(profileIds);
    return groupByProfileId(profileIds, rows);
  }

  async getSkills(profileIds: readonly string[]): Promise<SkillRecord[][]> {
    const rows = await this.repository.findSkillsByProfileIds(profileIds);
    return groupByProfileId(profileIds, rows);
  }

  async getExperiences(profileIds: readonly string[]): Promise<ExperienceRecord[][]> {
    const rows = await this.repository.findExperiencesByProfileIds(profileIds);
    return groupByProfileId(profileIds, rows);
  }

  async getProjects(profileIds: readonly string[]): Promise<ProjectRecord[][]> {
    const rows = await this.repository.findProjectsByProfileIds(profileIds);
    return groupByProfileId(profileIds, rows);
  }
}
