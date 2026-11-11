export interface ProfileContent {
  name: string;
  description: string;
  links: Array<{ label: string; url: string }>;
  skills: Array<{ name: string; category: string }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
    achievements: string[];
  }>;
  projects: Array<{ name: string; url: string; description: string }>;
}

export const profileContent: ProfileContent = {
  name: 'wt4zawa',
  description:
    'Разрабатываю веб-приложения на TypeScript и Node.js. Собираю сервисы на Next.js и небольшие серверы на Node.js, храню код в Git и публикую рабочие версии. Ниже — навыки и проекты, которые можно открыть по ссылкам.',
  links: [
    { label: 'GitHub', url: 'https://github.com/NikiPingviN' },
    { label: 'CloudConvert', url: 'https://cloud-convert-sigma.vercel.app' },
  ],
  skills: [
    { name: 'TypeScript', category: 'Языки' },
    { name: 'JavaScript', category: 'Языки' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'NestJS', category: 'Backend' },
    { name: 'GraphQL', category: 'Backend' },
    { name: 'Prisma', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Базы данных' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'Docker', category: 'Инфраструктура' },
    { name: 'Git', category: 'Инфраструктура' },
  ],
  experience: [
    {
      company: 'Самостоятельные проекты',
      position: 'Разработчик',
      startDate: '2024-01-01',
      endDate: null,
      achievements: [
        'Собрал CloudConvert на TypeScript и Next.js: Prisma, Docker и опубликованная рабочая версия.',
        'Сделал дашборд на Next.js и выложил его на Vercel.',
        'Писал небольшие серверные проекты на JavaScript: BarBot и ValorantTracker.',
      ],
    },
  ],
  projects: [
    {
      name: 'CloudConvert',
      url: 'https://cloud-convert-sigma.vercel.app',
      description:
        'Веб-сервис на TypeScript и Next.js с Prisma и Docker. Репозиторий: github.com/NikiPingviN/CloudConvert.',
    },
    {
      name: 'Node.js dashboard',
      url: 'https://nodejs-val-tra.vercel.app',
      description: 'Дашборд на Next.js, опубликованный на Vercel.',
    },
  ],
};
