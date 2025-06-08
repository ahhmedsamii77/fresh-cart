import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProductToCart,
  addToWishlist,
  createCashOrder,
  createVisaOrder,
  deleteFromCart,
  deleteFromWishlist,
  forgetPassword,
  getAllCategories,
  getAllProducts,
  getLoggedUserCart,
  getProduct,
  getUserOrders,
  getUserWishlist,
  resetCode,
  resetPassword,
  Signin,
  signUp,
  updateQuantity,
} from "../apis/apis";
import { SignUpType } from "../../Pages/Auth/Signup/Signup.types";
import { SigninType } from "../../Pages/Auth/Signin/Signin.types";
import { ForgetPasswordType } from "../../Pages/Auth/ForgetPassword/ForgetPassword.types";
import { ResetCodeType } from "../../Pages/Auth/RestCode/ResetCode.types";
import { ResetPasswordType } from "../../Pages/Auth/ResetPassword/ResetPassword.types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setCartData } from "../redux/cartSlice";
import { CartSliceType } from "../redux/cartSlice.types";
import { AxiosResponse } from "axios";
import { setWishlistData } from "../redux/wishlistSlice";

export function useSignup() {
  return useMutation({
    mutationFn: (user: SignUpType) => signUp(user)!,
  });
}

export function useSignin() {
  return useMutation({
    mutationFn: (user: SigninType) => Signin(user),
  });
}

export function useForgetPassword() {
  return useMutation({
    mutationFn: (user: ForgetPasswordType) => forgetPassword(user),
  });
}

export function useResetCode() {
  return useMutation({
    mutationFn: (code: ResetCodeType) => resetCode(code),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (user: ResetPasswordType) => resetPassword(user),
  });
}

export function useGetAllProducts(page: number) {
  return useQuery<AxiosResponse<CartSliceType>>({
    queryKey: ["allProducts"],
    queryFn: () => getAllProducts(page),
    placeholderData: (prevData) => prevData,
  });
}

export function useGetProduct(id: string) {
  return useQuery({
    queryKey: ["product-details", id],
    queryFn: () => getProduct(id),
  });
}

export function useAddProductToCart() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: (productId: string) => addProductToCart(productId),
    onSuccess: async () => {
      const res = await queryClient.fetchQuery({
        queryKey: ["userCart"],
        queryFn: getLoggedUserCart,
      });
      dispatch(setCartData(res.data));
    },
  });
}
export function useGetLoggedUserCart() {
  return useQuery({
    queryKey: ["userCart"],
    queryFn: getLoggedUserCart,
  });
}

export function useDeleteFromCart() {
  return useMutation({
    mutationFn: (id: string) => deleteFromCart(id),
  });
}

export function useUpdateQuantity() {
  return useMutation({
    mutationFn: ({ id, count }: { id: string; count: string }) =>
      updateQuantity({ id, count }),
  });
}

export function useAddToWishlist() {
  const queryClinet = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: (productId: string) => addToWishlist(productId),
    onSuccess: async () => {
      const res = await queryClinet.fetchQuery({
        queryKey: ["userWishlist"],
        queryFn: getUserWishlist,
      });
      dispatch(setWishlistData(res.data));
    },
  });
}

export function useGetUserWishlist() {
  return useQuery({
    queryKey: ["userWishlist"],
    queryFn: getUserWishlist,
  });
}

export function useDeleteFromWishlist() {
  const queryClinet = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: (id: string) => deleteFromWishlist(id),
    onSuccess: async () => {
      const res = await queryClinet.fetchQuery({
        queryKey: ["userWishlist"],
        queryFn: getUserWishlist,
      });
      dispatch(setWishlistData(res.data));
    },
  });
}

export function useCreateCashOrder() {
  return useMutation({
    mutationFn: ({
      cartId,
      shippingAddress,
    }: {
      cartId: string;
      shippingAddress: { details: string; phone: string; city: string };
    }) => createCashOrder({ cartId, shippingAddress }),
  });
}

export function useCreateVisaOrder() {
  return useMutation({
    mutationFn: ({
      cartId,
      shippingAddress,
    }: {
      cartId: string;
      shippingAddress: { details: string; phone: string; city: string };
    }) => createVisaOrder({ cartId, shippingAddress }),
  });
}
export function useGetUserOrders(id: string) {
  return useQuery({
    queryKey: ["userOrders"],
    queryFn: () => getUserOrders(id),
  });
}
export function useGetCategories() {
  return useQuery({
    queryKey: ['allCategories'],
    queryFn: getAllCategories
  })
}
