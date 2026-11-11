import { PrismaClient } from '../generated/prisma/client';
import { profileContent } from '../profile/profile.content';

const PROFILE_SEED_LOCK_KEY = 872341;

export async function seedProfile(prisma: PrismaClient): Promise<void> {
  assertProfileContent();

  await prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(${PROFILE_SEED_LOCK_KEY})`;
    await tx.profile.deleteMany();
    await tx.profile.create({
      data: {
        slug: 'me',
        name: profileContent.name,
        description: profileContent.description,
        links: {
          create: profileContent.links.map((link, index) => ({
            label: link.label,
            url: link.url,
            sortOrder: index,
          })),
        },
        skills: {
          create: profileContent.skills.map((skill, index) => ({
            name: skill.name,
            category: skill.category,
            sortOrder: index,
          })),
        },
        experiences: {
          create: profileContent.experience.map((item, index) => ({
            company: item.company,
            position: item.position,
            startDate: parseDate(item.startDate),
            endDate: item.endDate ? parseDate(item.endDate) : null,
            sortOrder: index,
            achievements: {
              create: item.achievements.map((text, achievementIndex) => ({
                text,
                sortOrder: achievementIndex,
              })),
            },
          })),
        },
        projects: {
          create: profileContent.projects.map((project, index) => ({
            name: project.name,
            url: project.url,
            description: project.description,
            sortOrder: index,
          })),
        },
      },
    });
  });
}

function parseDate(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00.000Z`);
}

function assertProfileContent(): void {
  if (!profileContent.name.trim() || !profileContent.description.trim()) {
    throw new Error('Profile name and description are required');
  }

  if (profileContent.links.length === 0 || profileContent.skills.length === 0) {
    throw new Error('Profile links and skills are required');
  }

  if (profileContent.experience.length === 0 || profileContent.projects.length === 0) {
    throw new Error('Profile experience and projects are required');
  }
}
