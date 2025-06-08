import { useState } from "react";
import { useAddProductToCart, useDeleteFromWishlist } from "../../lib/react-query/react-query";
import toast, { LoaderIcon } from "react-hot-toast";
import { DataType } from "../../lib/redux/wishlistSlice.types";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export default function ProductDetailsCard({ product }: { product: DataType }) {
  const [iscartLoading, setIsCartLoading] = useState<boolean>(false);
  const { mutateAsync: deleteFromWishlist } = useDeleteFromWishlist();
  const { mutateAsync: addToCart } = useAddProductToCart();
  async function handelAddToCart(id: string) {
    setIsCartLoading(true);
    await addToCart(id!);
    setIsCartLoading(false);
    toast.success('Product added to cart successfully.', { duration: 1500 });
  }
  async function handleDeleteFromWishlist(id: string) {
    await deleteFromWishlist(id);
    toast.success('Product deleted from your wishlist', { duration: 1500 });
  }
  return (
    <div key={product._id} className="rounded-lg border  border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <Link to={`/product-details/${product._id}`} className="shrink-0 md:order-1">
          <img className="h-20 w-20" src={product.imageCover} alt={product.title} />
        </Link>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">{product.price} EGP</p>
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <p className="text-base font-medium text-gray-900  dark:text-white">{product.description}</p>
          <div className="flex items-center gap-4">
            <button onClick={(e) => {
              e.stopPropagation();
              handelAddToCart(product._id);
            }} className="flex cursor-pointer items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" role="button">
              {iscartLoading && <LoaderIcon className="w-4 h-4 animate-spin" />}
              {!iscartLoading && <>
                <FaCartPlus className="w-5 h-5 -ms-2 me-2" />
                <span>Add to cart</span>
              </>}
            </button>
            <button onClick={() => handleDeleteFromWishlist(product._id)} type="button" className="inline-flex cursor-pointer items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
              <MdDeleteForever className="me-1.5 h-5 w-5" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
