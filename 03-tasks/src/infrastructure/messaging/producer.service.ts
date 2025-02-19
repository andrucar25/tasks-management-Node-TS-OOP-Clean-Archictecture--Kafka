import { Producer } from "kafkajs";

import { Parameters } from '../../core/helpers/parameters';
import { MessageBrokerKafka } from "./kafka.service";

export class ProducerService {
  private static producer: Producer;

  static async connect() {
    this.producer = await MessageBrokerKafka.connectProducer();
  }

  static async publish(message: object, key: string, dest: "User" | "Task") {
    await this.producer.send({
      topic: Parameters.KAFKA_CONFIG[`kafkaTopic${dest}`],
      messages: [
        {
          key,
          value: JSON.stringify(message),
        },
      ],
    });
  }
}
