export interface ProductDetails {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  createdBy: string;
  updatedBy: string;

  productId: string;
  color: string;
  size: string;
  price: number;
  quantity: string;
  discount: number;
}
