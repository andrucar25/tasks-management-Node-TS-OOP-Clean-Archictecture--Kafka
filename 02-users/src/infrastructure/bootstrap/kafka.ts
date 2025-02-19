import { Kafka, logLevel } from "kafkajs";

import { BootstrapKafka, BootstrapKafkaReturn } from "./bootstrap";
import { Parameters } from "../../core/helpers/parameters";

export class KafkaBootstrap implements BootstrapKafka {
  private static kafka: Kafka;

  initialize(): BootstrapKafkaReturn {
    return new Promise((resolve, reject) => {
      try {
        const clientId = Parameters.KAFKA_CONFIG.clientId;
        const kafkaBroker = Parameters.KAFKA_CONFIG.kafkaBroker;

        KafkaBootstrap.kafka = new Kafka({
          clientId,
          brokers: [kafkaBroker],
          logLevel: logLevel.INFO,
        });
        resolve(true);
        console.log("Connected to Kafka");
      } catch (error) {
        reject(error);
      }
    });
  }

  static getInstanceKafka() {
    return KafkaBootstrap.kafka;
  }
}
