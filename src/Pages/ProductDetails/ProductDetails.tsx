import { useParams } from "react-router-dom";
import { useAddProductToCart, useAddToWishlist, useDeleteFromWishlist, useGetProduct, useGetUserWishlist } from "../../lib/react-query/react-query"
import LoaderScreen from "../../Components/LoaderScreen/LoaderScreen";
import { ProductType } from "../../Components/ProductCard/ProductCard.types";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
import toast, { LoaderIcon } from "react-hot-toast";
import { useEffect, useState } from "react";
import { DataType } from "../../lib/redux/cartSlice.types";

export default function ProductDetails() {
  const { id } = useParams();
  const [iscartLoading, setIsCartLoading] = useState<boolean>(false)
  const { mutateAsync: addToCart } = useAddProductToCart();
  const { data, isLoading } = useGetProduct(id!);
  async function handelAddToCart() {
    setIsCartLoading(true);
    await addToCart(id!);
    setIsCartLoading(false);
    toast.success('Product added to cart successfully.', { duration: 1500 });
  }
  const { mutateAsync: addToWishlist } = useAddToWishlist();
  const { mutateAsync: deleteFromWishlist } = useDeleteFromWishlist();
  const { data: WishlistData } = useGetUserWishlist();
  const product: ProductType = data?.data?.data;
  const [isWishLoading, setIsWishLoading] = useState<boolean>(false)
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
  const allProducts: DataType[] = WishlistData?.data.data
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
  if (isLoading) {
    return <LoaderScreen />;
  }
  return (
    <section className="py-8 bg-white md:py-16 h-screen dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl  px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 gap-52">
          <div className="shrink-0 w-full mx-auto">
            <ProductSlider images={product.images} title={product.title} />
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {product.title}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                {product.price} EGP
              </p>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                </div>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  ({product.ratingsAverage})
                </p>
                <p className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
                  {product.ratingsQuantity}
                </p>
              </div>
            </div>
            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <button onClick={() => handleToggleWishlist(product._id)} className="flex cursor-pointer items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" role="button">
                {isWishLoading && <LoaderIcon className="w-4 h-4 animate-spin" />}
                {!isWishLoading && <>
                  <FaHeart className={`w-5 h-5 -ms-2 me-2 ${isFav ? 'text-red-500!' : ''}`} />
                  <span>Add to favorites</span>
                </>}

              </button>
              <button onClick={handelAddToCart} className="text-white mt-4  cursor-pointer sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center" role="button">
                {!iscartLoading && <>
                  <FaCartPlus className="w-5 h-5 -ms-2 me-2" />
                  <span>Add to cart</span>
                </>}
                {iscartLoading && <div className="flex items-center justify-center">
                  <LoaderIcon className="w-5 h-4 animate-spin" />
                </div>}
              </button>
            </div>
            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </section>

  )
}
