/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Redis from 'ioredis';
import { REDIS_HOST } from 'src/shared/contants/env.contants';

export const redisCache = new Redis({
  host: REDIS_HOST,
  port: 6379,
});
