import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Link', { description: 'Ссылка на профессиональный ресурс' })
export class LinkType {
  @Field({ description: 'Подпись ссылки' })
  label!: string;

  @Field({ description: 'Адрес ресурса' })
  url!: string;
}

@ObjectType('Skill', { description: 'Навык' })
export class SkillType {
  @Field({ description: 'Название навыка' })
  name!: string;

  @Field(() => String, { nullable: true, description: 'Группа навыков' })
  category!: string | null;
}

@ObjectType('Experience', { description: 'Место работы' })
export class ExperienceType {
  @Field({ description: 'Компания' })
  company!: string;

  @Field({ description: 'Должность' })
  position!: string;

  @Field({ description: 'Период работы, собранный из дат' })
  period!: string;

  @Field({ description: 'Дата начала, ISO 8601' })
  startDate!: string;

  @Field(() => String, { nullable: true, description: 'Дата окончания, ISO 8601' })
  endDate!: string | null;

  @Field(() => [String], { description: 'Достижения на этом месте' })
  achievements!: string[];
}

@ObjectType('Project', { description: 'Проект' })
export class ProjectType {
  @Field({ description: 'Название проекта' })
  name!: string;

  @Field({ description: 'Ссылка на проект или репозиторий' })
  url!: string;

  @Field(() => String, { nullable: true, description: 'Краткое описание' })
  description!: string | null;
}

@ObjectType('Profile', { description: 'Публичная визитка' })
export class ProfileType {
  @Field({ description: 'Имя' })
  name!: string;

  @Field({ description: 'Краткое описание' })
  description!: string;

  @Field(() => [LinkType], { description: 'Профессиональные ссылки' })
  links?: LinkType[];

  @Field(() => [SkillType], { description: 'Навыки' })
  skills?: SkillType[];

  @Field(() => [ExperienceType], { description: 'Опыт работы' })
  experience?: ExperienceType[];

  @Field(() => [ProjectType], { description: 'Проекты' })
  projects?: ProjectType[];
}
