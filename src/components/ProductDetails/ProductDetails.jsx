// import style from "./ProductDetails.module.css";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Loading from "../Loading/Loading.jsx";
import { CartContext } from "../../context/CartContext.jsx";

function ProductDetails() {
  const { addProductToCart } = useContext(CartContext);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  async function getProduct(productId) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    // console.log(data);
    setProduct(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getProduct(id);
  }, [id]);
  return (
    <>
      <h2>ProductDetails</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex p-8 items-center">
          <div className="w-1/4">
            <Slider {...settings}>
              {product.images.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image}
                    alt={product.title}
                    className="w-full"
                  />
                );
              })}
            </Slider>
          </div>
          <div className="w-3/4 p-6">
            <h2>{product.title}</h2>
            <p className="m-2 text-gray-600">{product.description}</p>
            <p className="">{product.category.name}</p>
            <div className="flex justify-between">
              <span>{product.price} EGP</span>
              <span>
                <i className="fas fa-star rating-color"></i>
                {product.ratingsAverage}
              </span>
            </div>
            <button
              onClick={() => addProductToCart(product.id)}
              className="btn w-full"
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
