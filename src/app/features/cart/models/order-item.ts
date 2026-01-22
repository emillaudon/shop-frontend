export class OrderItem {
  constructor(
    public id: number,
    public quantity: number,
    public price: number,
    public productName: string,
    public imageUrl: string | null | undefined,
  ) {}
}
