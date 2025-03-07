import { DataSource } from 'typeorm';
import "reflect-metadata";

import Server from './infrastructure/bootstrap/server';
import { Bootstrap, BootstrapKafka } from './infrastructure/bootstrap/bootstrap';
import app from './infrastructure/app';
import PostgreSQLBootstrap from './infrastructure/bootstrap/postgreSQL';
import { KafkaBootstrap } from './infrastructure/bootstrap/kafka';
import { ConsumerService } from './infrastructure/messaging/consumer.service';
import { Parameters } from './core/helpers/parameters';


const server: Bootstrap = new Server(app);
const postresql: Bootstrap = new PostgreSQLBootstrap();
const kafka: BootstrapKafka = new KafkaBootstrap();

(async () => {
  try {
    await kafka.initialize();

    console.log('info', 'Starting server ...');
    const promises: Array<Promise<boolean | Error | DataSource>> = [
      server.initialize(),
      postresql.initialize()
    ];
    await Promise.all(promises);
    console.info('PostgreSQL connected');

    await ConsumerService.connect(Parameters.KAFKA_CONFIG.kafkaTopicTask);
    console.log("Connected to Kafka consumer");
  } catch (error) {
    console.error(error);
    postresql.close();
    server.close();
  }
})();