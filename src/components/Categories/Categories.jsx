import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getcategories"],
    queryFn: getProducts,
    select: (data) => data.data.data,
  });

  const handleCategoryClick = (categoryId) => {
    navigate(`/subcategory/${categoryId}`);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap m-4 justify-center">
          {data.map((item) => (
            <div
              key={item._id}
              className="sm:w-6/12 md:w-4/12 lg:w-3/12 p-4 cursor-pointer"
              onClick={() => handleCategoryClick(item._id)}
            >
              <div className="border border-main-1">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[400px] object-cover object-top"
                />
                <h2 className="text-center text-sm font-bold p-2">
                  {item.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
