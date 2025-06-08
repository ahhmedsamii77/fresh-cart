import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { useGetLoggedUserCart, useGetUserWishlist } from "../../lib/react-query/react-query";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../lib/redux/store";
import { setCartData } from "../../lib/redux/cartSlice";
import { setWishlistData } from "../../lib/redux/wishlistSlice";

export default function Layout() {
  const userToken = localStorage.getItem('userToken');
  const { data } = useGetLoggedUserCart();
  const { data: wishlistData } = useGetUserWishlist();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userToken && data && wishlistData) {
      dispatch(setCartData(data?.data));
      dispatch(setWishlistData(wishlistData?.data));
    }
  }, [data, userToken, wishlistData]);
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
