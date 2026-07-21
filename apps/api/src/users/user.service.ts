import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<User[]> {
    return this.em.find(User, {});
  }

  async findById(id: number): Promise<User | null> {
    return this.em.findOne(User, { id } as any);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.em.findOne(User, { email });
  }

  async create(data: { name: string; email: string; birthdate: Date; idDocument: string }): Promise<User> {
    const user = new User();
    Object.assign(user, data);
    await this.em.persist(user).flush();
    return user;
  }

  async update(id: number, data: Partial<Pick<User, 'name' | 'email' | 'birthdate' | 'idDocument'>>): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;
    this.em.assign(user, data);
    await this.em.flush();
    return user;
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.findById(id);
    if (!user) return false;
    await this.em.remove(user).flush();
    return true;
  }
}
