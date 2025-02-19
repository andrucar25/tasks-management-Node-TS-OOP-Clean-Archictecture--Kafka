import { Consumer } from "kafkajs";

import { MessageBrokerKafka } from "./kafka.service";
import { TaskRepositoryImpl } from "../repositories-impl/task.repository.impl";
import { TaskUseCase } from '../../application/use-cases/task.usecase';

export class ConsumerService {
  private static consumer: Consumer;

  static async connect(source: string) {
    this.consumer = await MessageBrokerKafka.connectConsumer();
    this.consumer.subscribe({
      topic: source,
      fromBeginning: true,
    });

    this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const repository = new TaskRepositoryImpl();
        const application = new TaskUseCase(repository);
      },
    });
  }
}
