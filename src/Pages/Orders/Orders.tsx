import LoaderScreen from "../../Components/LoaderScreen/LoaderScreen";
import { useGetUserOrders } from "../../lib/react-query/react-query"
import { jwtDecode } from 'jwt-decode';
import { OrderType } from "./order.types";

export default function Orders() {
  const { id } = jwtDecode<{ id: string }>(localStorage.getItem('userToken')!);
  const { data, isLoading } = useGetUserOrders(id);
  if (isLoading) {
    return <LoaderScreen />;
  }
  const allOrders: OrderType[] = data?.data;
  console.log(allOrders)
  return (
    <section className="bg-white py-8 min-h-screen antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">All Orders</h2>
        <div className="mt-6 sm:mt-8 lg:flex lg:gap-8 lg:flex-col">
          {allOrders && allOrders?.map((order ,idx) => <div key={order._id} className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-6xl">
            <p className="text-lg p-4">order {idx + 1}</p>
            {order.cartItems.map(cartItem => <div key={cartItem.product.id} className="space-y-4 p-6">
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 shrink-0">
                  <img className="h-full w-full" src={cartItem.product.imageCover} alt={cartItem.product.title} />
                </div>
                {/* <p className="min-w-0 flex-1 font-medium text-gray-900  dark:text-white">{cartItem.product.}</p> */}
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400"><span className="font-medium text-gray-900 dark:text-white">Product ID:</span> BJ8364850</p>
                <div className="flex items-center justify-end gap-4">
                  <p className="text-base font-normal text-gray-900 dark:text-white">x{cartItem.count}</p>
                  <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">{cartItem.price} EGP</p>
                </div>
              </div>
            </div>)}
            <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
              <dl className="flex items-center justify-between border-gray-200 pt-2 dark:border-gray-700">
                <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                <dd className="text-lg font-bold text-gray-900 dark:text-white">{order.totalOrderPrice} EGP</dd>
              </dl>
            </div>
          </div>)}
          {!allOrders  && <h1 className="text-4xl md:text-5xl text-center w-full font-semibold">No orders yet</h1>}
        </div>
      </div>
    </section>
  )
}
