import { OrderItem } from "./order-item";

export interface CreateOrderItemRequest {
    productId: number;
    quantity: number;
}

export interface CreateOrderRequest {
    items: CreateOrderItemRequest[];
}

export interface OrderItemDto {
    productId: number;
    quantity: number;
    unitPrice: number;
}

export interface OrderDto {
    id: number;
    createdAt: string;
    status: string;
    items: OrderItemDto[];
}

export class Order {

    constructor(
        public id: number,
        public createdAt: string,
        public status: string,
        public items: OrderItem[],
    ) {

    }

    getTotalOrderValue() {
        return this.items.reduce(
            (total, item) => total + item.quantity * item.price,
            0
        );
    }

}