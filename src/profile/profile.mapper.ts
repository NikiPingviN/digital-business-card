import { ExperienceRecord, LinkRecord, ProjectRecord, SkillRecord } from './profile.repository';
import { formatPeriod, toIsoDate } from './format-period';
import { ExperienceType, LinkType, ProjectType, SkillType } from './profile.types';

export function toLinkType(record: LinkRecord): LinkType {
  return {
    label: record.label,
    url: record.url,
  };
}

export function toSkillType(record: SkillRecord): SkillType {
  return {
    name: record.name,
    category: record.category,
  };
}

export function toProjectType(record: ProjectRecord): ProjectType {
  return {
    name: record.name,
    url: record.url,
    description: record.description,
  };
}

export function toExperienceType(record: ExperienceRecord): ExperienceType {
  return {
    company: record.company,
    position: record.position,
    startDate: toIsoDate(record.startDate),
    endDate: record.endDate ? toIsoDate(record.endDate) : null,
    period: formatPeriod(record.startDate, record.endDate),
    achievements: record.achievements.map((achievement) => achievement.text),
  };
}
