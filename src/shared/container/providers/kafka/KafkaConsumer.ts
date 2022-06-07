import { consumer } from '@shared/infra/events/kafka';
import CreateUserController from '@modules/users/infra/events/controllers/CreateUserController';

const init = async (): Promise<void> => {
  await consumer.connect();

  await consumer.subscribe({ topic: 'signin-database-loader' });

  const createUserController = new CreateUserController();

  await consumer.run({
    eachMessage: async ({ message }) => {
      const value = message.value?.toString();

      createUserController.create(value);
    },
  });
};

init();
