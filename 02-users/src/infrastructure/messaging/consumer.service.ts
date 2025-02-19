import { Consumer } from "kafkajs";
import { MessageBrokerKafka } from "./kafka.service";
import { Parameters } from '../../core/helpers/parameters';

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
        const value = message.value?.toString();
        console.log(`📩 Mensaje recibido en ${topic}:`, value);

      },
    });
  }
}
