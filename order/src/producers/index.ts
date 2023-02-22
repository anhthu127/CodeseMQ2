import { KafkaEnum } from "../constants/common"
import { isProducerConnected, producer } from "../configs/kafka.config"

export const pushToQueue = async (message: string, orderName: string, id: number): Promise<void> => {
    let i = 0;
    try {
        if (isProducerConnected) {
            while (i < 10) {
                await producer.send({
                    topic: KafkaEnum.orderTopicName,
                    messages: [{
                        value: JSON.stringify({ paymentName: orderName, id: id }),
                        key: `order ${message}`
                    }],
                })
                i += 1;
            }
        }
    } catch (error) {
        throw error
    }
}
