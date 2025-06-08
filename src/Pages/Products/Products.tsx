import { useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useGetAllProducts } from "../../lib/react-query/react-query";
import LoaderScreen from "../../Components/LoaderScreen/LoaderScreen";
import { ProductType } from "../../Components/ProductCard/ProductCard.types";

export default function Products() {
  const [page, setPage] = useState<number>(1)
  const { data, isLoading, refetch, isFetching } = useGetAllProducts(page);
  const [isPaginated, setisPaginated] = useState<boolean>(false);
  function hanldePagination() {
    window.scrollTo({ top: 0 });
    setPage((prev) => prev == 6 ? 1 : prev + 1);
    setisPaginated(true);
  refetch();
  }
  if (isLoading) {
    return <LoaderScreen />;
  }
  else if (isFetching && isPaginated) {
    return <LoaderScreen />;
  }
  const allProducts: ProductType[] = data?.data?.data;
  return (
    <section className="bg-gray-50 py-8 antialiased min-h-screen dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">All Products</h2>
        </div>
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-7 lg:grid-cols-3 xl:grid-cols-4">
          {allProducts?.map(product => <ProductCard key={product._id} product={product} />)}
        </div>
        <div className="w-full text-center">
          <button onClick={hanldePagination} type="button" className="rounded-lg border cursor-pointer border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Show more</button>
        </div>
      </div>
    </section>
  )
}
