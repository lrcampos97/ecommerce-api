import Redis from 'ioredis';
import { CacheKeys } from '../types';

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

export const getCache = async (key: CacheKeys): Promise<string | null> => {
  return await redis.get(key);
};

export const setCache = async (key: string, value: string): Promise<void> => {
  await redis.set(key, value, 'EX', 1800); // 30 minutes
};

export const clearCache = async (key: CacheKeys): Promise<void> => {
  await redis.del(key);
};
