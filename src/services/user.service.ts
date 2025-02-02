import { User } from '../models/user.model';
import { db } from '../config/database';

export class UserService {
  async findAll(): Promise<User[]> {
    return db('users').select('*');
  }

  async findById(id: string): Promise<User | null> {
    const user = await db('users').where({ id }).first();
    return user || null;
  }

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const [user] = await db('users')
      .insert({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning('*');
    return user;
  }
}