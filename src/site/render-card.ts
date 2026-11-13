import { ExperienceType, LinkType, ProjectType, SkillType } from '../profile/profile.types';

export interface CardView {
  name: string;
  description: string;
  links: LinkType[];
  skills: SkillType[];
  experience: ExperienceType[];
  projects: ProjectType[];
}

export function renderCard(card: CardView): string {
  const skillGroups = groupSkills(card.skills);

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(card.name)} — цифровая визитка</title>
  <style>
    :root {
      color-scheme: light;
      --paper: #f3efe6;
      --ink: #1d1914;
      --muted: #5e564c;
      --line: #d9d0c3;
      --accent: #8f3d22;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--paper);
      color: var(--ink);
      font-family: "Iowan Old Style", Palatino, "Palatino Linotype", "Times New Roman", serif;
      line-height: 1.5;
    }
    main {
      width: min(760px, calc(100% - 32px));
      margin: 0 auto;
      padding: 48px 0 72px;
    }
    .eyebrow {
      margin: 0 0 12px;
      color: var(--accent);
      font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      font-size: 12px;
      font-weight: 650;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }
    h1 {
      margin: 0;
      font-size: clamp(40px, 8vw, 64px);
      font-weight: 600;
      letter-spacing: -0.03em;
      line-height: 0.95;
    }
    .lead {
      max-width: 38rem;
      margin: 20px 0 0;
      color: var(--muted);
      font-size: 20px;
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 18px;
      margin: 28px 0 0;
      padding: 0;
      list-style: none;
    }
    .links a {
      color: var(--ink);
      font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      font-size: 15px;
      text-underline-offset: 3px;
    }
    section { margin-top: 44px; }
    h2 {
      margin: 0 0 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--line);
      font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      font-size: 13px;
      font-weight: 650;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .group + .group { margin-top: 18px; }
    .group h3 {
      margin: 0 0 8px;
      color: var(--muted);
      font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      font-size: 13px;
      font-weight: 600;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .chips li {
      padding: 6px 10px;
      border: 1px solid var(--line);
      background: #fffdf8;
      font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      font-size: 14px;
    }
    article + article { margin-top: 28px; }
    article h3 {
      margin: 0;
      font-size: 26px;
      font-weight: 600;
    }
    .meta {
      margin: 4px 0 0;
      color: var(--muted);
      font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      font-size: 14px;
    }
    ul.achievements {
      margin: 12px 0 0;
      padding-left: 18px;
    }
    .project a {
      color: inherit;
      text-decoration: none;
    }
    .project a:hover { color: var(--accent); }
    .project p { margin: 8px 0 0; color: var(--muted); }
    footer {
      margin-top: 48px;
      color: var(--muted);
      font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      font-size: 14px;
    }
    footer a { color: var(--accent); }
  </style>
</head>
<body>
  <main>
    <p class="eyebrow">Цифровая визитка</p>
    <h1>${escapeHtml(card.name)}</h1>
    <p class="lead">${escapeHtml(card.description)}</p>
    <ul class="links">
      ${card.links
        .map(
          (link) =>
            `<li><a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a></li>`,
        )
        .join('')}
    </ul>
    <section>
      <h2>Навыки</h2>
      ${skillGroups
        .map(
          (group) => `<div class="group">
        <h3>${escapeHtml(group.category)}</h3>
        <ul class="chips">${group.skills
          .map((skill) => `<li>${escapeHtml(skill.name)}</li>`)
          .join('')}</ul>
      </div>`,
        )
        .join('')}
    </section>
    <section>
      <h2>Опыт</h2>
      ${card.experience
        .map(
          (item) => `<article>
        <h3>${escapeHtml(item.position)}</h3>
        <p class="meta">${escapeHtml(item.company)} · ${escapeHtml(item.period)}</p>
        <ul class="achievements">${item.achievements
          .map((achievement) => `<li>${escapeHtml(achievement)}</li>`)
          .join('')}</ul>
      </article>`,
        )
        .join('')}
    </section>
    <section>
      <h2>Проекты</h2>
      ${card.projects
        .map(
          (project) => `<article class="project">
        <h3><a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a></h3>
        ${project.description ? `<p>${escapeHtml(project.description)}</p>` : ''}
      </article>`,
        )
        .join('')}
    </section>
    <footer><a href="/graphql">Открыть GraphQL API</a></footer>
  </main>
</body>
</html>`;
}

function groupSkills(skills: SkillType[]): Array<{ category: string; skills: SkillType[] }> {
  const groups: Array<{ category: string; skills: SkillType[] }> = [];

  for (const skill of skills) {
    const category = skill.category ?? 'Другое';
    const existing = groups.find((group) => group.category === category);
    if (existing) {
      existing.skills.push(skill);
    } else {
      groups.push({ category, skills: [skill] });
    }
  }

  return groups;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
