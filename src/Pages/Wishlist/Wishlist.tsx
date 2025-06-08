
import { DataType } from "../../lib/redux/wishlistSlice.types";
import LoaderScreen from "../../Components/LoaderScreen/LoaderScreen";
import { useGetUserWishlist } from "../../lib/react-query/react-query";
import ProductDetailsCard from "../../Components/ProductDetailsCard/ProductDetailsCard";

export default function Wishlist() {
  const { data, isLoading } = useGetUserWishlist();

  if (isLoading) {
    return <LoaderScreen />;
  }
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {data?.data?.data.length != 0 && data?.data?.data?.map((product: DataType) => <ProductDetailsCard key={product._id} product={product} />)}
              {data?.data?.data.length == 0 && <h1 className="text-4xl md:text-5xl font-semibold dark:text-white">Wishlist is empty</h1>}
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}
