import { useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import useProducts from "../../Hooks/useProducts.jsx";
import { WishlistContext } from "../../context/WishlistContext.jsx";

function RecentProducts() {
  const { addProductToCart } = useContext(CartContext);
  const { data, isLoading } = useProducts();
  const { AddToWishList, wishlistData, DeleteFromWishList } =
    useContext(WishlistContext);

  // Convert wishlist items into a Set of product IDs for fast lookup
  const wishlistSet = new Set(wishlistData?.items?.map((item) => item.id));

  return (
    <>
      <h2>Recent Products</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap py-8 gap-y-4 justify-center">
          {data?.map((product) => {
            // Check if the product is in the wishlist
            const isInWishlist = wishlistSet.has(product.id);

            return (
              <div key={product.id} className="lg:w-2/12 md:w-4/12">
                <div className="product p-2 rounded-lg">
                  <Link to={`/productdetails/${product.id}`}>
                    <img
                      src={product.imageCover}
                      className="w-full"
                      alt={product.title}
                    />
                    <h3 className="text-main">{product.category.name}</h3>
                    <h3 className="text-xl">
                      {product.title.split(" ", 2).join(" ")}
                    </h3>
                    <div className="flex justify-between">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>

                  <button
                    onClick={() => addProductToCart(product.id)}
                    className="btn w-full mb-0.5"
                  >
                    Add To Cart
                  </button>

                  <button
                    onClick={() => {
                      isInWishlist
                        ? DeleteFromWishList(product.id)
                        : AddToWishList(product.id);
                    }}
                    className="btn w-full mt-0"
                  >
                    <i
                      className={`fa-solid fa-heart fa-xl ${
                        isInWishlist ? "text-red-500" : "text-gray-500"
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default RecentProducts;
