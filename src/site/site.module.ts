import { Module } from '@nestjs/common';
import { ProfileModule } from '../profile/profile.module';
import { SiteController } from './site.controller';

@Module({
  imports: [ProfileModule],
  controllers: [SiteController],
})
export class SiteModule {}
