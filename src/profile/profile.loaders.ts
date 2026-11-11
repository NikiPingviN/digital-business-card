import DataLoader from 'dataloader';
import {
  ExperienceRecord,
  LinkRecord,
  ProjectRecord,
  SkillRecord,
} from './profile.repository';
import { ProfileService } from './profile.service';

export interface ProfileLoaders {
  links: DataLoader<string, LinkRecord[]>;
  skills: DataLoader<string, SkillRecord[]>;
  experiences: DataLoader<string, ExperienceRecord[]>;
  projects: DataLoader<string, ProjectRecord[]>;
}

export function createProfileLoaders(profileService: ProfileService): ProfileLoaders {
  return {
    links: new DataLoader((profileIds) => profileService.getLinks(profileIds)),
    skills: new DataLoader((profileIds) => profileService.getSkills(profileIds)),
    experiences: new DataLoader((profileIds) => profileService.getExperiences(profileIds)),
    projects: new DataLoader((profileIds) => profileService.getProjects(profileIds)),
  };
}
