import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfileRepository } from './profile.repository';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  imports: [PrismaModule],
  providers: [ProfileRepository, ProfileService, ProfileResolver],
  exports: [ProfileService],
})
export class ProfileModule {}
