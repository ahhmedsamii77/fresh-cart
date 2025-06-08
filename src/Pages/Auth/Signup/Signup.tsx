import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import { SignUpType } from "./Signup.types";
import * as Yup from 'yup'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSignup } from "../../../lib/react-query/react-query";
import toast from "react-hot-toast";
import { useContext } from "react";
import { authContext } from "../../../lib/Context/authContext";
export default function Signup() {
  const navigate = useNavigate();
  const { mutateAsync: signup, } = useSignup();
  const { setuserToken } = useContext(authContext)!
  const initialValues: SignUpType = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  }
  async function onSubmit(values: SignUpType) {
    try {
      const res = await signup(values);
      toast.success('Account created successfully.', { duration: 1500 });
      setuserToken(res.data.token);
      localStorage.setItem('userToken', res.data.token);
      navigate('/products');
      registerFormik.resetForm();
    } catch (error: any) {
      toast.error(error.response.data.message, { duration: 1500 });
      registerFormik.resetForm();
    }
  }
  const registerFormik = useFormik({
    initialValues,
    onSubmit: onSubmit,
    validationSchema: Yup.object().shape({
      name: Yup.string().required('name is required'),
      email: Yup.string().required('email is required').email('Invalid email'),
      password: Yup.string().required('password is required').min(8, 'password must be at least 8 characters'),
      rePassword: Yup.string().required('password is required').oneOf([Yup.ref('password')], "password don't match confirm-password"),
      phone: Yup.string().required('phone is required').matches(/^(20)?01[0125][1-9]{8}$/, "Invalid egyption number")
    })
  });
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen pt-3">
      <div className="flex flex-col items-center justify-center px-6 mx-auto">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-5 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form onSubmit={registerFormik.handleSubmit} className="space-y-4 md:space-y-3">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                <input value={registerFormik.values.name} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name..." />
                {registerFormik.errors.name && registerFormik.touched.name && <div className="mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span className="font-medium">{registerFormik.errors.name}</span>
                </div>}
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input value={registerFormik.values.email} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                {registerFormik.errors.email && registerFormik.touched.email && <div className="mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span className="font-medium">{registerFormik.errors.email}</span>
                </div>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input value={registerFormik.values.password} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {registerFormik.errors.password && registerFormik.touched.password && <div className="mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span className="font-medium">{registerFormik.errors.password}</span>
                </div>}
              </div>
              <div>
                <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input value={registerFormik.values.rePassword} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="password" name="rePassword" id="rePassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {registerFormik.errors.rePassword && registerFormik.touched.rePassword && <div className="mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span className="font-medium">{registerFormik.errors.rePassword}</span>
                </div>}
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input value={registerFormik.values.phone} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="tel" name="phone" id="phone" placeholder="+20...." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {registerFormik.errors.phone && registerFormik.touched.phone && <div className="mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span className="font-medium">{registerFormik.errors.phone}</span>
                </div>}
              </div>
              <button disabled={!!(!registerFormik.dirty || !registerFormik.isValid)} type="submit" className={`w-full ${!registerFormik.dirty || !registerFormik.isValid ? "cursor-not-allowed bg-[#075985]!" : "cursor-pointer bg-primary-600 dark:hover:bg-primary-700"} text-white  flex items-center justify-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600  dark:focus:ring-primary-800`}>
                {registerFormik.isSubmitting && <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />}
                {!registerFormik.isSubmitting && "Create an account"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link to="/sign-in" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
