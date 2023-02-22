import { EachMessagePayload } from "kafkajs";
import { codesePool, query } from "../configs/database.config";
import { KafkaEnum } from "../constants/common";
import { IConsumer } from "../interfaces/IConsumer.interface";

const consumeOrderResult = async ({ message }: EachMessagePayload) => {
    if (message?.value) {
        const { id, paymentName } = JSON.parse(message?.value.toString());
        const sqlOrder = `insert into payment (id, paymentName) values (?,?) `;
        await query(codesePool, sqlOrder, [id, paymentName]);
    }
}

export const SyncConsumeOrderResult: IConsumer = {
    name: 'sync-order-result',
    fromBeginning: true,
    topicSubscribe: [KafkaEnum.orderTopicName, KafkaEnum.deliveryTopicName],
    groupId: `operation-group: ${KafkaEnum.kafkaMessageQueue}`,
    processor: consumeOrderResult
}
