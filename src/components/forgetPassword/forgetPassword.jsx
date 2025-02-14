import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"; // ✅ Import Yup

export default function ForgetPassword() {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function ForgetPassword(obj) {
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        obj
      );
      console.log(data);
      navigate("/verifycode");
    } catch (err) {
      console.log(err.response.data.message);
      setApiError(err.response.data.message);
      setIsLoading(false);
    }
  }

  // ✅ Yup Schema for Validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema, // ✅ Apply Yup validation
    onSubmit: ForgetPassword,
  });

  return (
    <>
      <h2>Forget Password</h2>

      <form onSubmit={formik.handleSubmit} className="w-1/2 mx-auto">
        {apiError && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        )}

        {/* Email Field with Validation */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
                      border-gray-300 appearance-none dark:text-black dark:border-gray-600 
                      dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                       duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                       peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto 
                       peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                       peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                       peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your Email
          </label>
          {formik.errors.email && formik.touched.email && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-2"
              role="alert"
            >
              {formik.errors.email}
            </div>
          )}
        </div>

        {/* Submit Button */}
        {isLoading ? (
          <button
            type="submit"
            disabled
            className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none 
                      focus:ring-green-500 ms-0 mt-0"
          >
            <i className="fas fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none 
                      focus:ring-green-500 ms-0 mt-0 disabled:opacity-50"
            disabled={!formik.isValid || !formik.dirty}
          >
            Send Code
          </button>
        )}
      </form>
    </>
  );
}
