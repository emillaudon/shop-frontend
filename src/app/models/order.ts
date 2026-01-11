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
    price: number;
}

export interface OrderDto {
    orderId: number;
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

}