import { useFormik } from "formik"
import { CheckoutType } from "./checkout.types";
import * as Yup from 'yup'
import { useCreateCashOrder, useCreateVisaOrder, useGetLoggedUserCart } from "../../lib/react-query/react-query";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreType } from "../../lib/redux/store";
import { useState } from "react";
import { setCartData } from "../../lib/redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { LoaderIcon } from "react-hot-toast";
export default function Checkout() {
  const { mutateAsync: createCashOrder } = useCreateCashOrder();
  const { mutateAsync: createVisaOrder } = useCreateVisaOrder();
  const getcart = useGetLoggedUserCart();
  const [isCashLoading, setIsCashLoading] = useState(false);
  const [isVisaLoading, setisVisaLoading] = useState(false);
  const { cartId, data } = useSelector((store: StoreType) => store.cartSlice);
  const [isCash, setIsCash] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const initialValues: CheckoutType = {
    city: '',
    details: '',
    phone: '',
  }
  async function onSubmit(values: CheckoutType) {
    if (isCash) {
      setIsCashLoading(true);
      await createCashOrder({ cartId, shippingAddress: values });
      const res = await getcart;
      dispatch(setCartData(res.data));
      navigate('/allorders');
      setIsCashLoading(false);
    } else {
      setisVisaLoading(true);
      const res: any = await createVisaOrder({ cartId, shippingAddress: values });
      setisVisaLoading(false);
      console.log(res)
      open(res?.data.session.url, "_self");
    }

  }
  const checkoutFormik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: Yup.object().shape({
      details: Yup.string().required('details is required'),
      city: Yup.string().required('city is required'),
      phone: Yup.string().required('phone is required').matches(/^(20)?01[0125][1-9]{8}$/, "Invalid egyption number")
    })
  });
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 h-screen">
      <form onSubmit={checkoutFormik.handleSubmit} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
          <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
              <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Cart
            </span>
          </li>
          <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
              <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Checkout
            </span>
          </li>
          <li className="flex shrink-0 items-center">
            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Order summary
          </li>
        </ol>
        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Details</h2>
              <div className="w-[80%] space-y-4 md:space-y-3">
                <div className="mb-5">
                  <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
                  <input value={checkoutFormik.values.details} onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  {checkoutFormik.errors.details && checkoutFormik.touched.details && <div className="mt-2 py-2 pl-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{checkoutFormik.errors.details}</span>
                  </div>}
                </div>
                <div className="mb-5">
                  <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
                  <input value={checkoutFormik.values.city} onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  {checkoutFormik.errors.city && checkoutFormik.touched.city && <div className="mt-2 text-sm py-2 pl-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{checkoutFormik.errors.city}</span>
                  </div>}
                </div>
                <div className="mb-5">
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                  <input value={checkoutFormik.values.phone} onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  {checkoutFormik.errors.phone && checkoutFormik.touched.phone && <div className="mt-2 py-2 pl-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{checkoutFormik.errors.phone}</span>
                  </div>}
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsCash(true)} type="submit" className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    {isCashLoading && <LoaderIcon className="w-4 h-4 animate-spin" />}
                    {!isCashLoading && 'by cash'}
                  </button>
                  <button onClick={() => setIsCash(false)} type="submit" className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    {isVisaLoading && <LoaderIcon className="w-4 h-4 animate-spin" />}
                    {!isVisaLoading && 'by visa'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-center text-gray-900 dark:text-white">Checkout</p>
              <div className="space-y-4">
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">{data?.totalCartPrice} EGP</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>

  )
}
