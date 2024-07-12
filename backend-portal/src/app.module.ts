import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TechnologyModule } from './technology/technology.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, TechnologyModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
