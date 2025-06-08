import axios from "axios";
import { SignUpRes, SignUpType } from "../../Pages/Auth/Signup/Signup.types";
import { SigninType } from "../../Pages/Auth/Signin/Signin.types";
import { ForgetPasswordType } from "../../Pages/Auth/ForgetPassword/ForgetPassword.types";
import { ResetCodeType } from "../../Pages/Auth/RestCode/ResetCode.types";
import { ResetPasswordType } from "../../Pages/Auth/ResetPassword/ResetPassword.types";

export function signUp(user: SignUpType) {
  return axios.post<SignUpRes>(
    "https://ecommerce.routemisr.com/api/v1/auth/signup",
    user
  );
}

export function Signin(user: SigninType) {
  return axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", user);
}

export function forgetPassword(user: ForgetPasswordType) {
  return axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    user
  );
}

export function resetCode(resetCode: ResetCodeType) {
  return axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
    resetCode
  );
}

export function resetPassword(user: ResetPasswordType) {
  return axios.put(
    "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
    user
  );
}

export function getAllProducts(page: number) {
  return axios.get(
    `https://ecommerce.routemisr.com/api/v1/products?limit=10&&page=${page}`
  );
}

export function getProduct(id: string) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
}

export function addProductToCart(productId: string) {
  return axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      productId,
    },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}

export function getLoggedUserCart() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}

export function deleteFromCart(id: string) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}

export function updateQuantity({ id, count }: { id: string; count: string }) {
  return axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      count,
    },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}

export function addToWishlist(productId: string) {
  return axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      productId,
    },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}

export function getUserWishlist() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}

export function deleteFromWishlist(id: string) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}

export function createCashOrder({cartId,shippingAddress}: {cartId:string ,shippingAddress :{details:string, phone:string, city:string}}) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
     shippingAddress
  },
  {
    headers: {
      token: localStorage.getItem('userToken')
    }
  }
)
}

export function createVisaOrder({cartId,shippingAddress}: {cartId:string ,shippingAddress :{details:string, phone:string, city:string}}) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{
     shippingAddress
  },
  {
    headers: {
      token: localStorage.getItem('userToken')
    }
  }
)
}

export function getUserOrders(id:string) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
}
export function getAllCategories() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
}