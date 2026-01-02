import { OrderItem } from "./order-item";

export class Order {

    constructor(
        public id: number,
        public createdAt: string,
        public status: string,
        public items: OrderItem[],
    ) {

    }

}