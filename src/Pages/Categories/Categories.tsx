import LoaderScreen from "../../Components/LoaderScreen/LoaderScreen";
import { useGetCategories } from "../../lib/react-query/react-query"
import { CategoriesType } from "./Categories.types";

export default function Categories() {
  const { data, isLoading } = useGetCategories();
  if (isLoading) {
    return <LoaderScreen />;
  }
  const allCategories: CategoriesType[] = data?.data.data;
  return (
    <section className="bg-gray-50 min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 flex items-center justify-betwe en gap-4 md:mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">All categories</h2>
        </div>
        <div className="grid grid-cols-12 gap-5">
          {allCategories?.map(category => <div key={category._id} className="col-span-3 shadow rounded overflow-hidden">
            <div>
              <img className="w-full h-72 object-cover" src={category.image} alt={category.name} />
              <h2 className="text-center font-medium text-gray-900 my-3 dark:text-white">{category.name}</h2>
            </div>
          </div>)}
        </div>
      </div>
    </section>
  )
}
