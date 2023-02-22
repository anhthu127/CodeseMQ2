import { kafkaClient } from "../configs/kafka.config";
import { IConsumer } from "../interfaces/IConsumer.interface";

export async function initConsumer(consumerInfo: IConsumer) {
    const consumer = kafkaClient.consumer({ groupId: consumerInfo.groupId })
    await consumer.connect()

    await consumer.subscribe({
        topics: consumerInfo.topicSubscribe,
        fromBeginning: consumerInfo.fromBeginning
    })

    await consumer.run({
        eachMessage: consumerInfo.processor,
        autoCommit: true,
        autoCommitThreshold: 100,
        autoCommitInterval: 5000
    })
}
