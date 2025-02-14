import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import Loading from "../Loading/Loading";
import { CartContext } from "../../context/CartContext";
import Slider from "react-slick";

function WishList() {
  const { wishlistData, isLoading, DeleteFromWishList } =
    useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Enable arrows for manual navigation
    autoplay: false, // Disable auto scrolling
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : wishlistData.items.length > 0 ? (
        wishlistData.items.map((item) => (
          <div key={item._id} className="flex p-8 items-center border-b">
            <div className="w-1/4">
              <Slider {...settings}>
                {item.images.map((image, index) => (
                  <img
                    key={index}
                    src={`https://ecommerce.routemisr.com/Route-Academy-products/${image}`}
                    alt={item.title}
                    className="w-full"
                  />
                ))}
              </Slider>
            </div>

            <div className="w-3/4 p-6">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="m-2 text-gray-600">{item.description}</p>
              <p className="text-sm text-gray-500">{item.category.name}</p>

              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold">{item.price} EGP</span>
                <span className="flex items-center">
                  <i className="fas fa-star text-yellow-500 mr-1"></i>
                  {item.ratingsAverage}
                </span>
              </div>

              <button
                onClick={() => addProductToCart(item.id)}
                className="btn w-full"
              >
                Add To Cart
              </button>
              <button
                onClick={() => DeleteFromWishList(item.id)}
                className="btn w-full bg-red-600 mt-0"
              >
                Remove from wishList
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No items in your wishlist.
        </p>
      )}
    </>
  );
}

export default WishList;
