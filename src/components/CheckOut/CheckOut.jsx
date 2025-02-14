import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Updated import
import * as Yup from "yup"; // Import Yup

export default function CheckOut() {
  const [isLoading, setIsLoading] = useState(false);
  const { cart, clearCart } = useContext(CartContext); // Add setCart
  const navigate = useNavigate(); // Hook for navigation

  // Yup validation schema
  const validationSchema = Yup.object({
    city: Yup.string()
      .required("City is required")
      .min(3, "City must be at least 3 characters"),
    details: Yup.string()
      .required("Details are required")
      .min(10, "Details must be at least 10 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
    paymentMethod: Yup.string()
      .required("Payment method is required")
      .oneOf(["visa", "cash"], "Invalid payment method"),
  });

  async function handleCheckOut(shippingAddress) {
    try {
      setIsLoading(true);
      let url =
        formik.values.paymentMethod === "visa"
          ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`
          : `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`;

      let { data } = await axios.post(
        url,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      toast.success(data.status);

      clearCart();

      if (formik.values.paymentMethod === "visa") {
        location.href = data.session.url; // Redirect to payment gateway
      } else {
        navigate("/allorders"); // Navigate to All Orders page for cash payment
      }
      console.log(data);
    } catch (err) {
      console.error("Error during checkout:", err);

      // Handle Axios errors (server errors)
      if (err.response) {
        console.error("Server responded with an error:", err.response.data);
        toast.error(
          err.response.data.message ||
            "Failed to complete the order. Please try again."
        );
      }
      // Handle network errors (no response from server)
      else if (err.request) {
        console.error("No response received from the server:", err.request);
        toast.error(
          "Network error. Please check your internet connection and try again."
        );
      }
      // Handle other errors (e.g., runtime errors)
      else {
        console.error("An unexpected error occurred:", err.message);
        toast.error("An unexpected error occurred. Please try again.");
      }

      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      city: "",
      details: "",
      phone: "",
      paymentMethod: "visa",
    },
    validationSchema, // Add Yup validation schema
    onSubmit: handleCheckOut,
  });

  return (
    <>
      <h2>CheckOut</h2>

      <form onSubmit={formik.handleSubmit} className="w-1/2 mx-auto">
        {/* City Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your city
          </label>
          {formik.touched.city && formik.errors.city ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.city}
            </div>
          ) : null}
        </div>

        {/* Details Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            id="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your details
          </label>
          {formik.touched.details && formik.errors.details ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.details}
            </div>
          ) : null}
        </div>

        {/* Phone Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your phone
          </label>
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.phone}
            </div>
          ) : null}
        </div>

        {/* Payment Method Field */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            value={formik.values.paymentMethod}
            onChange={formik.handleChange}
            className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="visa">Visa</option>
            <option value="cash">Cash</option>
          </select>
          {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.paymentMethod}
            </div>
          ) : null}
        </div>

        {/* Submit Button */}
        {isLoading ? (
          <button
            type="submit"
            className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-green-500"
          >
            <i className="fas fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-green-500"
          >
            CheckOut
          </button>
        )}
      </form>
    </>
  );
}
