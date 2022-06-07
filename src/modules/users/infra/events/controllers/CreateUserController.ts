import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

class CreateUserController {
  public async create(event: string | undefined): Promise<void> {
    const parsedEvent = JSON.parse(event as string);

    const { userId, email, password } = parsedEvent;

    const userData = {
      userId,
      email,
      password,
    };

    const createUserService = container.resolve(CreateUserService);

    await createUserService.execute(userData);
  }
}

export default CreateUserController;
