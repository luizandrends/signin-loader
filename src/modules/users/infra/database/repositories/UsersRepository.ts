import { Repository, getRepository } from 'typeorm';

import UsersInterface from '@modules/users/interfaces/UsersInterface';
import UserDTO from '@modules/users/dtos/UserDTO';
import User from '../schemas/User';

class UsersRepository implements UsersInterface {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: UserDTO): Promise<User> {
    const { userId, email, password } = userData;

    const parsedUserData = {
      signInUserId: userId,
      password,
      email,
    };

    const user = this.ormRepository.create(parsedUserData);

    return user;
  }

  public async findByEmail(email: string): Promise<User | null | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findUser;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
