import { Link, NavLink, useNavigate } from 'react-router-dom'
import DarkLogo from '../../assets/images/colorkitdark.svg'
import Logo from '../../assets/images/colorkit.svg'
import { FaHeart, FaMoon, FaShoppingCart, FaSun, FaUser } from "react-icons/fa";
import { FaBarsStaggered } from 'react-icons/fa6';
import { TiDelete } from 'react-icons/ti';
import { useContext, useEffect } from 'react';
import { authContext } from '../../lib/Context/authContext';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreType } from '../../lib/redux/store';
import { useDeleteFromCart } from '../../lib/react-query/react-query';
import { setCartData } from '../../lib/redux/cartSlice';

export default function Navbar() {
  const { userToken, setuserToken } = useContext(authContext)!;
  const { numOfCartItems } = useSelector((store: StoreType) => store.cartSlice);
  const { count } = useSelector((store: StoreType) => store.wishlistSlice);
  const { mutateAsync: deletePrdouct } = useDeleteFromCart();
  const { data } = useSelector((store: StoreType) => store.cartSlice);
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  function handleMode() {
    document.documentElement.classList.toggle('dark');
    if (localStorage.getItem('mode')) {
      localStorage.removeItem('mode');
    } else {
      localStorage.setItem('mode', 'dark');
    }
  }
  function hanldeLogout() {
    localStorage.removeItem('userToken');
    setuserToken(null);
    toast.success('Logut done successfully.', { duration: 1500 });
    navigate("/sign-in");
  }
  async function handleDelete(id: string) {
    const res = await deletePrdouct(id);
    dispatch(setCartData(res.data));
    toast.success('Product deleted successfully.', { duration: 1500 });
  }
  useEffect(() => {
    if (localStorage.getItem("mode")) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <nav className="bg-white sticky z-50 top-0 dark:bg-gray-800 shadow antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <div className="shrink-0">
              <Link to="/">
                <img className="block w-auto h-8 dark:hidden" alt='Fresh Cart' src={Logo} />
                <img className="hidden w-auto h-8 dark:block" src={DarkLogo} alt='Fresh Cart' />
              </Link>
            </div>
            <ul className="hidden lg:flex items-center mx-auto justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              {userToken && <>
                <li>
                  <NavLink to="/" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                    Home
                  </NavLink>
                </li>
                <li className="shrink-0">
                  <NavLink to="/products" className="flex text-sm font-medium  text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                    Products
                  </NavLink>
                </li>
                <li className="shrink-0">
                  <NavLink to="/categories" className="flex text-sm font-medium  text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                    Categories
                  </NavLink>
                </li>
              </>}
              {!userToken && <>
                <li>
                  <NavLink to="/sign-in" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                    Login
                  </NavLink>
                </li>
                <li className="shrink-0">
                  <NavLink to="/sign-up" className="flex text-sm font-medium  text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                    Signup
                  </NavLink>
                </li>
              </>}
            </ul>
          </div>
          <div className="flex items-center space-x-2 lg:space-x-5">
            <button onClick={handleMode} className='cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg justify-center p-2 inline-flex items-center'>
              <FaMoon className="w-5 h-5  dark:hidden" />
              <FaSun className="w-5 h-5 text-white  hidden dark:block" />
            </button>
            <div>
              <Link className="inline-flex mr-5 cursor-pointer items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white" to='/wishlist'>
                <div className='relative'>
                  <FaHeart className="w-5 h-5 lg:me-1" />
                  <span className='absolute bottom-4 -right-3 bg-[#0369a1] dark:bg-[#0ea5e9] text-white w-5 h-5 flex items-center justify-center rounded-full'>{count}</span>
                </div>
              </Link>
              <button id="myCartDropdownButton1" data-dropdown-toggle="myCartDropdown1" type="button" className="inline-flex  cursor-pointer items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white">
                <span className="sr-only">
                  Cart
                </span>
                <div className='relative'>
                  <FaShoppingCart className="w-5 h-5 lg:me-1" />
                  <span className='absolute bottom-4 -right-3 bg-[#0369a1] dark:bg-[#0ea5e9] text-white w-5 h-5 flex items-center justify-center rounded-full'>{numOfCartItems || 0}</span>
                </div>
              </button>
              <div id="myCartDropdown1" className="hidden z-10 mx-auto max-w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800">
                {data?.products?.map(product => <div key={product._id} className="grid grid-cols-2">
                  <div>
                    <p className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white">{product?.product?.title}</p>
                    <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">{product?.price} EGP</p>
                  </div>
                  <div className="flex items-center justify-end gap-6">
                    <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">Qty: {product?.count}</p>
                    <button onClick={() => handleDelete(product.product._id)} type="button" className="text-red-600  cursor-pointer hover:text-red-700 dark:text-red-500 dark:hover:text-red-600">
                      <span className="sr-only"> Remove </span>
                      <TiDelete className="h-5 w-5" />
                    </button>
                    <div id="tooltipRemoveItem1a" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                      Remove item
                      <div className="tooltip-arrow" data-popper-arrow />
                    </div>
                  </div>
                </div>)}
                <Link to="/cart" className="mb-2 me-2 inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" role="button"> Proceed to Checkout </Link>
              </div>
            </div>
            {userToken && <div>
              <button id="userDropdownButton1" data-dropdown-toggle="userDropdown1" type="button" className="inline-flex cursor-pointer items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white">
                <FaUser className="w-5 h-5 me-1" />
              </button>
              <div id="userDropdown1" className="hidden z-10 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700">
                <button onClick={hanldeLogout} className="p-2 text-sm font-medium text-gray-900 cursor-pointer dark:text-white">
                  <span className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm"> Sign Out </span>
                </button>
              </div>
            </div>}
            <button type="button" data-collapse-toggle="ecommerce-navbar-menu-1" aria-controls="ecommerce-navbar-menu-1" aria-expanded="false" className="inline-flex lg:hidden items-center justify-center hover:bg-gray-100 rounded-md dark:hover:bg-gray-700 p-2 text-gray-900 dark:text-white">
              <span className="sr-only">
                Open Menu
              </span>
              <FaBarsStaggered className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>
        <div id="ecommerce-navbar-menu-1" className="bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-lg py-3 hidden px-4 mt-4">
          <ul className="text-gray-900 dark:text-white text-sm font-medium  space-y-3">
            {userToken && <>
              <li>
                <NavLink to="/" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                  Home
                </NavLink>
              </li>
              <li className="shrink-0">
                <NavLink to="/products" className="flex text-sm font-medium  text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                  Products
                </NavLink>
              </li>
            </>}
            {!userToken && <>
              <li>
                <NavLink to="/sign-in" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                  Login
                </NavLink>
              </li>
              <li className="shrink-0">
                <NavLink to="/sign-up" className="flex text-sm font-medium  text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                  Signup
                </NavLink>
              </li>
            </>}
          </ul>
        </div>
      </div>
    </nav>
  )
}
