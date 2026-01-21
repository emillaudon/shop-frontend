export class Product {
  constructor(
    public id: number,
    public name: string,
    public stock: number,
    public price: number,
    public imageUrl: string | null = null
  ) {}
}
