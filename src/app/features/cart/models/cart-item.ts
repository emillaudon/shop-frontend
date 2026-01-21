export class CartItem {
  constructor(
    public productId: number,
    public name: string,
    public price: number,
    public quantity: number,
    public imageUrl?: string | null
  ) {}
}
