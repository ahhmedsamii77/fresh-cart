import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="bg-white  antialiased h-screen dark:bg-gray-900 md:py-16 flex items-center">
      <div className="mx-auto grid max-w-screen-xl  px-4 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
        <div className="content-center justify-self-start md:col-span-7 md:text-start">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl"><span className="dark:text-white">Discover Our</span> <span className="text-primary-700 dark:text-primary-500">Summer</span> <span className="dark:text-white">Collection</span>
          </h1>
          <p className="mb-4 max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg  lg:mb-5 lg:text-xl">Elevate your style with our latest arrivals. Quality products for every occasion.</p>
          <div className="flex items-center gap-3">
            <Link to='/products' className="inline-flex items-center justify-center rounded-md hover:bg-primary-800 bg-primary-700 dark:bg-primary-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm cursor-pointer focus:outline-none focus:ring-2  focus:ring-offset-2">
              Shop Now
            </Link>
            <Link to='/categories' className="inline-flex cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-offset-2">
              View Categories
            </Link>
          </div>
        </div>
        <div className="hidden md:col-span-5 md:mt-0 md:flex">
          <img className="dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg" alt="shopping illustration" />
          <img className="hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list-dark.svg" alt="shopping illustration" />
        </div>
      </div>
    </section>

  )
}





// <section className="bg-white py-8 antialiased dark:bg-gray-900  h-screen">
//     <div className="flex flex-col items-center gap-4  w-full  md:py-16 lg:flex-row lg:text-left lg:py-20  max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
//       <div className="space-y-7  lg:w-1/2">
//         <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:leading-20 leading-16">
//           <span className="dark:text-white">Discover Our</span> <span className="text-primary-700 dark:text-primary-500">Summer</span> <span className="dark:text-white">Collection</span>
//         </h1>
//         <p className="mx-auto  text-gray-500 md:text-xl">
//           Elevate your style with our latest arrivals. Quality products for every occasion.
//         </p>
//         <div className="flex flex-col gap-2 min-[400px]:flex-row sm:justify-center lg:justify-start">
//           <Link to='/products' className="inline-flex items-center justify-center rounded-md hover:bg-primary-800 bg-primary-700 dark:bg-primary-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm cursor-pointer focus:outline-none focus:ring-2  focus:ring-offset-2">
//             Shop Now
//           </Link>
//           <Link to='/categories' className="inline-flex cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-offset-2">
//             View Categories
//           </Link>
//         </div>
//       </div>
//       <div className="hidden md:col-span-5 md:mt-0 md:flex">
//         <img className="dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg" alt="shopping illustration" />
//         <img className="hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list-dark.svg" alt="shopping illustration" />
//       </div>
//     </div>
//   </section>
