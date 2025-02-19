import { DataSource } from 'typeorm';
import "reflect-metadata";

import Server from './infrastructure/bootstrap/server';
import { Bootstrap, BootstrapKafka } from './infrastructure/bootstrap/bootstrap';
import app from './infrastructure/app';
import PostgreSQLBootstrap from './infrastructure/bootstrap/postgreSQL';
import { KafkaBootstrap } from './infrastructure/bootstrap/kafka';
import { ProducerService } from './infrastructure/messaging/producer.service';


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

    await ProducerService.connect();
    console.log("Connected to Kafka producer");
    // await ConsumerService.connect(envs.kafkaTopicComplete);
    // console.log("Connected to Kafka consumer");
  } catch (error) {
    console.error(error);
    postresql.close();
    server.close();
  }
})();