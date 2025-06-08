import { ProductType } from "../../Components/ProductCard/ProductCard.types";

export type CartSliceType = {
  numOfCartItems: number;
  cartId: string;
  data: DataType | null;
} ;

export type DataType = {
  _id: string;
  cartOwner: string;
  products: ProductCartType[];
  totalCartPrice: string;
};
export type ProductCartType = {
  price: string;
  _id: string;
  count: string;
  product: ProductType;
};
