import { Controller, Get, Header } from '@nestjs/common';
import { toExperienceType, toLinkType, toProjectType, toSkillType } from '../profile/profile.mapper';
import { ProfileService } from '../profile/profile.service';
import { renderCard } from './render-card';

@Controller()
export class SiteController {
  constructor(private readonly profiles: ProfileService) {}

  @Get()
  @Header('Content-Type', 'text/html; charset=utf-8')
  async index(): Promise<string> {
    const profile = await this.profiles.getProfile();
    const [links, skills, experience, projects] = await Promise.all([
      this.profiles.getLinks([profile.id]),
      this.profiles.getSkills([profile.id]),
      this.profiles.getExperiences([profile.id]),
      this.profiles.getProjects([profile.id]),
    ]);

    return renderCard({
      name: profile.name,
      description: profile.description,
      links: (links[0] ?? []).map(toLinkType),
      skills: (skills[0] ?? []).map(toSkillType),
      experience: (experience[0] ?? []).map(toExperienceType),
      projects: (projects[0] ?? []).map(toProjectType),
    });
  }
}
