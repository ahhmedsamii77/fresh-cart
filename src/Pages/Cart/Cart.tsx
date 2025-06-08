import { FaHeart, FaLongArrowAltRight } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { HiMinus } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import { useDeleteFromCart, useUpdateQuantity } from "../../lib/react-query/react-query";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreType } from "../../lib/redux/store";
import { setCartData } from "../../lib/redux/cartSlice";
import toast, { LoaderIcon } from "react-hot-toast";
import { useState } from "react";
export default function Cart() {
  const { mutateAsync: deletePrdouct } = useDeleteFromCart();
  const { mutateAsync: updateQuantity } = useUpdateQuantity();
  const { data } = useSelector((store: StoreType) => store.cartSlice);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  async function handleDelete(id: string) {
    const res = await deletePrdouct(id);
    dispatch(setCartData(res.data));
    toast.success('Product deleted successfully.', { duration: 1500 });
  }
  async function handleUpdateQuantity({ id, count }: { id: string, count: string }) {
    setIsLoading(true);
    const res = await updateQuantity({ id, count });
    dispatch(setCartData(res.data));
    setIsLoading(false);
  }
  return (
    <section className="bg-white py-8 antialiased min-h-screen dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {data?.products.length != 0 && data?.products.map(prdouct => <div key={prdouct._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <div className="shrink-0 md:order-1">
                    <img className="h-20 w-20" src={prdouct.product.imageCover} alt={prdouct.product.title} />
                  </div>
                  <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                  <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center">
                      <button onClick={() => {
                        let count = Number(prdouct?.count) - 1;
                        handleUpdateQuantity({ id: prdouct.product._id, count: String(count) })
                      }} type="button" className="inline-flex cursor-pointer h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <HiMinus className="w-4 h-4 text-gray-900 dark:text-white" />
                      </button>
                      <span className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white">
                        {isLoading && <div className="flex items-center justify-center">
                          <LoaderIcon className="w-4 h-4 animate-spin" />
                          </div>}
                        {!isLoading && prdouct.count}
                      </span>
                      <button onClick={() => {
                        let count = Number(prdouct?.count) + 1;
                        handleUpdateQuantity({ id: prdouct.product._id, count: String(count) })
                      }} type="button" className="inline-flex cursor-pointer h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <BsPlusLg className="w-4 h-4 text-gray-900 dark:text-white" />
                      </button>
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                      <p className="text-base font-bold text-gray-900 dark:text-white">{prdouct.price} EGP</p>
                    </div>
                  </div>
                  <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <p className="text-base font-medium text-gray-900  dark:text-white">{prdouct.product.description}</p>
                    <div className="flex items-center gap-4">
                      <button className="flex cursor-pointer items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" role="button">
                        <FaHeart className="w-5 h-5 -ms-2 me-2" />
                        <span>Add to favorites</span>
                      </button>
                      <button onClick={() => handleDelete(prdouct.product._id)} type="button" className="inline-flex cursor-pointer items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                        <MdDeleteForever className="me-1.5 h-5 w-5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>)}
              {data?.products.length == 0 && <h1 className="md:text-6xl text-4xl font-semibold my-10 dark:text-white">Cart is Empty</h1>}
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
              <div className="space-y-4">
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">{data?.totalCartPrice} EGP</dd>
                </dl>
              </div>
              <Link to="/checkout" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</Link>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                  Continue Shopping
                  <FaLongArrowAltRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}
