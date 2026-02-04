/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma.service';
import { redisCache } from 'src/redis/redis.service';
import { IGetAllUsers } from './types';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(limit?: number, offset?: number): Promise<IGetAllUsers> {
    const cacheKey = `users:list:${limit}:${offset}`;
    const cached: string | null = await redisCache.get(cacheKey);
    if (cached) {
      const cachedUsers: User[] = JSON.parse(cached) as User[];
      return { users: cachedUsers };
    }

    const users = await this.prisma.user.findMany({
      skip: offset,
      take: limit,
    });

    await redisCache.set(cacheKey, JSON.stringify(users), 'EX', 60);

    return { users };
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const { name, email } = dto;

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
      },
    });

    const keys = await redisCache.keys('users:list:*');
    if (keys.length) {
      await redisCache.del(...keys);
    }

    return {
      message: 'Пользователь обновлен',
    };
  }

  async createUser(dto: CreateUserDto) {
    await this.prisma.user.create({ data: dto });

    const keys = await redisCache.keys('users:list:*');
    if (keys.length) {
      await redisCache.del(...keys);
    }

    return {
      message: 'Пользователь создан',
    };
  }

  async deleteUser(userId: string) {
    await this.prisma.user.delete({ where: { id: userId } });

    const keys = await redisCache.keys('users:list:*');
    if (keys.length) {
      await redisCache.del(...keys);
    }

    return {
      message: 'Пользователь удален',
    };
  }

  async getOneUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    return {
      user,
    };
  }
}
