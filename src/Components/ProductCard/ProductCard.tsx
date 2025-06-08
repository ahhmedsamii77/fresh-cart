import { Link } from "react-router-dom";
import { ProductType } from "./ProductCard.types";
import { FaCartPlus, FaEye, FaHeart, FaStar } from "react-icons/fa";
import { useAddProductToCart, useAddToWishlist, useDeleteFromWishlist, useGetUserWishlist } from "../../lib/react-query/react-query";
import toast, { LoaderIcon } from "react-hot-toast";
import { useEffect, useState } from "react";
import { DataType } from "../../lib/redux/wishlistSlice.types";

export default function ProductCard({ product }: { product: ProductType }) {
  const { mutateAsync: addToCart } = useAddProductToCart();
  const { mutateAsync: addToWishlist } = useAddToWishlist();
  const { mutateAsync: deleteFromWishlist } = useDeleteFromWishlist();
  const { data } = useGetUserWishlist();
  const [isWishLoading, setIsWishLoading] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false)
  async function handleToggleWishlist(productId: string) {
    setIsWishLoading(true);
    if (isFav) {
      const res = await deleteFromWishlist(productId);
      console.log(res.data)
      setIsWishLoading(false);
      setIsFav(false);
    } else {
      const res = await addToWishlist(productId);
      console.log(res)
      setIsWishLoading(false);
      setIsFav(true);
    }
  }
  const allProducts: DataType[] = data?.data.data
  function checkISfav() {
    allProducts?.forEach(item => {
      if (item._id == product._id) {
        setIsFav(true);
      }
    });
  }
  useEffect(() => {
    if (allProducts) {
      checkISfav();
    }
  }, [allProducts]);
  async function handelAddToCart(productId: string) {
    setIsLoading(true);
    await addToCart(productId);
    setIsLoading(false);
    toast.success('Product added to cart successfully.', { duration: 1500 });
  }


  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-52 w-full object-cover">
        <Link to={`/product-details/${product._id}`}>
          <img className="mx-auto h-full" src={product.imageCover} alt={product.title} />
        </Link>
      </div>
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"> Up to 35% off </span>
          <div className="flex items-center justify-end gap-1">
            <Link to={`/product-details/${product._id}`} data-tooltip-target="tooltip-quick-look" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only"> Quick look </span>
              <FaEye className="h-4 w-4" />
            </Link>
            <div id="tooltip-quick-look" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
              Quick look
              <div className="tooltip-arrow" data-popper-arrow />
            </div>
            <button onClick={() => handleToggleWishlist(product._id)} type="button" data-tooltip-target="tooltip-add-to-favorites" className={`rounded-lg cursor-pointer p-2  hover:bg-gray-100   dark:hover:bg-gray-700`}>
              <span className="sr-only"> Add to Favorites </span>
              {isWishLoading && <LoaderIcon className="w-4 h-4 animate-spin" />}
              {!isWishLoading && <FaHeart className={`w-4 h-4 ${isFav ? 'text-red-500!' : 'text-gray-500'}`} />}
            </button>
            <div id="tooltip-add-to-favorites" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
              Add to favorites
              <div className="tooltip-arrow" data-popper-arrow />
            </div>
          </div>
        </div>
        <p className="text-lg font-semibold leading-tight text-gray-900  dark:text-white">{product.title.split(" ").slice(0, 2).join(" ")}</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            <FaStar className="h-4 w-4 text-yellow-400" />
            <FaStar className="h-4 w-4 text-yellow-400" />
            <FaStar className="h-4 w-4 text-yellow-400" />
            <FaStar className="h-4 w-4 text-yellow-400" />
            <FaStar className="h-4 w-4 text-yellow-400" />
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{product.ratingsAverage}</p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">({product.ratingsQuantity})</p>
        </div>
        <ul className="mt-2 flex items-center gap-4">
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
            </svg>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fast Delivery</p>
          </li>
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Best Price</p>
          </li>
        </ul>
        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-xl font-extrabold leading-tight text-gray-900 dark:text-white">{product.price} EGP</p>
          <button onClick={() => handelAddToCart(product._id)} type="button" className="inline-flex cursor-pointer items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {!isLoading && <>
              <FaCartPlus className="-ms-2 me-2 h-5 w-5" />
              <span>Add to cart</span>
            </>}
            {isLoading && <div className="flex items-center justify-center">
              <LoaderIcon className="w-5 h-4 animate-spin" />
            </div>}
          </button>
        </div>
      </div>
    </div>
  )
}
