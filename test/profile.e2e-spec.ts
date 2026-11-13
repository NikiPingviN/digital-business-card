import 'reflect-metadata';
import 'dotenv/config';
import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { prepareDatabase } from '../src/database/prepare-database';

describe('Profile GraphQL', () => {
  let app: INestApplication;

  before(async () => {
    await prepareDatabase();
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  after(async () => {
    await app.close();
  });

  it('returns the profile shape from the assignment', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            profile {
              name
              description
              skills { name }
              experience { company position }
              projects { name }
            }
          }
        `,
      })
      .expect(200);

    const body = response.body as {
      errors?: unknown[];
      data: {
        profile: {
          name: string;
          skills: Array<{ name: string }>;
          experience: Array<{ company: string; position: string }>;
          projects: Array<{ name: string }>;
        };
      };
    };

    assert.equal(body.errors, undefined);
    assert.equal(body.data.profile.name, 'wt4zawa');
    assert.deepEqual(body.data.profile.experience, [
      {
        company: 'Самостоятельные проекты',
        position: 'Разработчик',
      },
    ]);
    assert.deepEqual(
      body.data.profile.skills.map((skill) => skill.name),
      [
        'TypeScript',
        'JavaScript',
        'Node.js',
        'NestJS',
        'GraphQL',
        'Prisma',
        'PostgreSQL',
        'Next.js',
        'Docker',
        'Git',
      ],
    );
    assert.deepEqual(
      body.data.profile.projects.map((project) => project.name),
      ['CloudConvert', 'Node.js dashboard', 'CRM', 'BarBot'],
    );
  });

  it('loads links, the formatted period and achievements', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            profile {
              links { label url }
              experience {
                period
                startDate
                endDate
                achievements
              }
              projects { url }
            }
          }
        `,
      })
      .expect(200);

    const body = response.body as {
      errors?: unknown[];
      data: {
        profile: {
          links: Array<{ label: string; url: string }>;
          experience: Array<{
            period: string;
            startDate: string;
            endDate: string | null;
            achievements: string[];
          }>;
          projects: Array<{ url: string }>;
        };
      };
    };

    assert.equal(body.errors, undefined);
    assert.ok(
      body.data.profile.links.some(
        (link) => link.label === 'GitHub' && link.url === 'https://github.com/NikiPingviN',
      ),
    );
    assert.equal(body.data.profile.experience[0]?.period, 'январь 2024 — настоящее время');
    assert.equal(body.data.profile.experience[0]?.startDate, '2024-01-01');
    assert.equal(body.data.profile.experience[0]?.endDate, null);
    assert.ok((body.data.profile.experience[0]?.achievements.length ?? 0) > 0);
    assert.match(body.data.profile.projects[0]?.url ?? '', /^https:\/\//);
  });
});
