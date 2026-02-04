import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';

import 'dotenv/config';
import { PrismaClient } from 'generated/prisma/client';
import { DATABASE_URL } from './shared/contants/env.contants';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: DATABASE_URL as string,
    });
    super({ adapter });
  }
}
