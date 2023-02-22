import { EachMessagePayload } from "kafkajs";
import { codesePool, query } from "../configs/database.config";
import { KafkaEnum } from "../constants/common";
import { IConsumer } from "../interfaces/IConsumer.interface";

const consumePaymentResult = async ({ message }: EachMessagePayload) => {
    if (message?.value) {
        const { id, deliveryName } = JSON.parse(message?.value.toString());
        const sqlOrder = `insert into delivery (id, deliveryName) values (?,?) `;
        await query(codesePool, sqlOrder, [id, deliveryName]);
    }
}

export const SyncConsumeOrderResult: IConsumer = {
    name: 'sync-delivery-result',
    fromBeginning: true,
    topicSubscribe: [KafkaEnum.orderTopicName, KafkaEnum.paymentTopicName],
    groupId: `operation-group: ${KafkaEnum.kafkaMessageQueue}`,
    processor: consumePaymentResult
}
