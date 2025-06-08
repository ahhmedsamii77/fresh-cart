export type WishListType = {
  count: number;
  data: DataType[] | null;
};

export type DataType = {
  ratingsQuantity: string;
  _id: string;
  title: string;
  description: string;
  quantity: string;
  price: string;
  imageCover: string;
  ratingsAverage: string;
};
