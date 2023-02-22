import { EachMessagePayload } from "kafkajs";

export interface IConsumer {
    name: string;
    groupId: string;
    topicSubscribe: (string | RegExp)[];
    fromBeginning: boolean;
    processor: ({ topic, partition, message }: EachMessagePayload) => Promise<void>;
}
