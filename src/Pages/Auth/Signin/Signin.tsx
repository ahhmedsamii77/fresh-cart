import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import { useContext } from "react";
import { authContext } from "../../../lib/Context/authContext";
import { SigninType } from "./Signin.types";
import { useSignin } from "../../../lib/react-query/react-query";
export default function Signin() {
  const navigate = useNavigate();
  const { mutateAsync: Signin } = useSignin();
  const { setuserToken } = useContext(authContext)!
  const initialValues: SigninType = {
    email: "",
    password: "",
  }
  async function onSubmit(values: SigninType) {
    try {
      const res = await Signin(values);
      toast.success('Login done successfully.', { duration: 1500 });
      setuserToken(res.data.token);
      localStorage.setItem('userToken', res.data.token);
      navigate('/products');
      loginFormik.resetForm();
    } catch (error: any) {
      toast.error(error.response.data.message, { duration: 1500 });
      loginFormik.resetForm();
    }
  }
  const loginFormik = useFormik({
    initialValues,
    onSubmit: onSubmit,
    validationSchema: Yup.object().shape({
      email: Yup.string().required('email is required').email('Invalid email'),
      password: Yup.string().required('password is required').min(8, 'password must be at least 8 characters'),
    })
  });
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen pt-20">
      <div className="flex flex-col items-center justify-center px-6 mx-auto ">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-5 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login to your account
            </h1>
            <form onSubmit={loginFormik.handleSubmit} className="space-y-4 md:space-y-3">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input value={loginFormik.values.email} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                {loginFormik.errors.email && loginFormik.touched.email && <div className="mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span className="font-medium">{loginFormik.errors.email}</span>
                </div>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input value={loginFormik.values.password} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {loginFormik.errors.password && loginFormik.touched.password && <div className="mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span className="font-medium">{loginFormik.errors.password}</span>
                </div>}
              </div>
              <Link  to="/forget-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password ?</Link>
              <button disabled={!!(!loginFormik.dirty || !loginFormik.isValid)} type="submit" className={`w-full ${!loginFormik.dirty || !loginFormik.isValid ? "cursor-not-allowed bg-[#075985]!" : "cursor-pointer bg-primary-600 dark:hover:bg-primary-700"} text-white mt-3  flex items-center justify-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600  dark:focus:ring-primary-800`}>
                {loginFormik.isSubmitting && <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />}
                {!loginFormik.isSubmitting && "Sign in"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account? <Link to="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
