  import {  createHashRouter, RouterProvider } from "react-router-dom"
  import Layout from "./Components/Layout/Layout"
  import Home from "./Pages/Home/Home"
  import Signin from "./Pages/Auth/Signin/Signin"
  import Signup from "./Pages/Auth/Signup/Signup"
  import NotFound from "./Pages/NotFound/NotFound"
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
  import AuthContextProvider from "./lib/Context/authContext"
  import { Toaster } from 'react-hot-toast'
  import Products from "./Pages/Products/Products"
  import ForgetPassword from "./Pages/Auth/ForgetPassword/ForgetPassword"
  import ResetCode from "./Pages/Auth/RestCode/ResetCode"
  import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword"
  import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
  import ProtectedAuth from "./Components/ProtectedAuth/ProtectedAuth"
  import ProductDetails from "./Pages/ProductDetails/ProductDetails"
  import { Provider } from 'react-redux'
  import { store } from "./lib/redux/store"
  import Cart from "./Pages/Cart/Cart"
  import Wishlist from "./Pages/Wishlist/Wishlist"
  import Checkout from "./Pages/Checkout/Checkout"
  import Orders from "./Pages/Orders/Orders"
  import Categories from "./Pages/Categories/Categories"
  const router = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: '/home', element: <Home /> },
        {
          path: '/sign-in', element: <ProtectedAuth>
            <Signin />
          </ProtectedAuth>
        },
        {
          path: '/sign-up', element: <ProtectedAuth>
            <Signup />
          </ProtectedAuth>
        },
        {
          path: '/forget-password', element: <ProtectedAuth>
            <ForgetPassword />
          </ProtectedAuth>
        },
        {
          path: '/reset-code', element: <ProtectedAuth>
            <ResetCode />
          </ProtectedAuth>
        },
        {
          path: '/reset-password', element: <ProtectedAuth>
            <ResetPassword />
          </ProtectedAuth>
        },
        {
          path: '/products', element: <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        },
        {
          path: '/cart', element: <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        },
          {
          path: '/categories', element: <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        },
        {
          path: '/wishlist', element: <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        },
        {
          path: '/checkout', element: <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        },
          {
          path: '/allorders', element: <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        },
        {
          path: '/product-details/:id', element: <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        },
        { path: '*', element: <NotFound /> },
      ]
    }
  ]);
  const client = new QueryClient();
  export default function App() {
    return (
      <>
        <AuthContextProvider>
          <Provider store={store}>
            <QueryClientProvider client={client}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </Provider>
        </AuthContextProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </>
    )
  }
