import { useEffect, useState } from "react";
import axios from "axios";

import Loading from "../Loading/Loading"; // Assuming you have a Loading component
import { jwtDecode } from "jwt-decode";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user orders
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        // Get the user token from localStorage
        const userToken = localStorage.getItem("userToken");
        if (!userToken) {
          console.error("User token not found in localStorage");
          return;
        }

        // Decode the token to get the user ID
        const decodedToken = jwtDecode(userToken);
        const userId = decodedToken.id;

        // Fetch orders for the user
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
        );

        setOrders(data);
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user orders:", error);
        setIsLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-4">Order #{index + 1}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Shipping Address */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
                  <p>
                    <span className="font-semibold">City:</span>{" "}
                    {order.shippingAddress.city}
                  </p>
                  <p>
                    <span className="font-semibold">Details:</span>{" "}
                    {order.shippingAddress.details}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {order.shippingAddress.phone}
                  </p>
                </div>

                {/* Order Summary */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Order Summary</h3>
                  <p>
                    <span className="font-semibold">Total Price:</span> $
                    {order.totalOrderPrice}
                  </p>
                  <p>
                    <span className="font-semibold">Payment Method:</span>{" "}
                    {order.paymentMethodType}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {order.isPaid ? "Paid" : "Not Paid"}
                  </p>
                </div>
              </div>

              {/* Cart Items */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Items</h3>
                <div className="space-y-4">
                  {order.cartItems.map((item) => (
                    <div key={item._id} className="flex items-center space-x-4">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{item.product.title}</p>
                        <p>Quantity: {item.count}</p>
                        <p>Price: ${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
