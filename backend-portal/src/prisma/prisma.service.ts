import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          // url: config.get("DATABASE_URL")
          url: "mysql://admin:v6DOkWstIf6OSRkAnF5n@database-1.cjc6ky2yuako.us-east-1.rds.amazonaws.com:3306/tech_dev",
        },
      },
    });
  }
}
