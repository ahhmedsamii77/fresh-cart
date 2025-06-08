export type OrderType = {
  cartItems: CartItemsType[];
  _id:string;
  totalOrderPrice:string;
}
export type CartItemsType = {
  count:string;
  price:string;
  product: ProductType;
  _id:string
}
export type ProductType = {
  id:string;
  imageCover:string;
  ratingsAverage:string;
  ratingsQuantity:string;
  title:string;
}