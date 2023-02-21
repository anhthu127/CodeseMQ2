import { KafkaEnum } from "../constants/common"
import { producer } from "../configs/kafka.config"

export const pushToQueue = async (message: any): Promise<void> => {
    try {

        await producer.send({
            topic: KafkaEnum.topicName,
            messages: message,
        })
    } catch (error) {
        throw error
    }
}
