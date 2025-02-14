import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function ValidateCode(values) {
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: values.resetCode }
      );
      console.log(data);
      navigate("/resetPassword");
    } catch (err) {
      console.log(err.response?.data?.message || "Verification failed");
      setApiError(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: { resetCode: "" },
    onSubmit: ValidateCode,
  });

  return (
    <>
      <h2>Verify Code</h2>

      <form onSubmit={formik.handleSubmit} className="w-1/2 mx-auto">
        {apiError && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="resetCode"
            id="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
                      border-gray-300 appearance-none dark:text-black dark:border-gray-600 
                      dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="resetCode"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                       duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                       peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto 
                       peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                       peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                       peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Verification Code
          </label>
        </div>

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
            Verify Code
          </button>
        )}
      </form>
    </>
  );
}
