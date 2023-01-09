import { Process, Processor } from "@nestjs/bull";
import { QueueEnum } from '../../commons/enums/queue.enum';
import { Job } from 'bull';


@Processor(QueueEnum.PRODUCT_QUEUE)
export class ProductProcessor {
    @Process('test_queue')
    async testQueue(job: Job) {
        console.log(job)
    }
}