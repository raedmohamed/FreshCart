import axios from "axios";
// import style from "./Brands.module.css";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";

function Brands() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, isLoading } = useQuery({
    queryKey: ["getBrands"],
    queryFn: getProducts,
    select: (data) => data.data.data,
  });
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap m-4 justify-center">
          {data.map((item) => (
            <div key={item._id} className="sm:w-6/12 md:w-4/12 lg:w-3/12 p-4">
              <div className=" border border-main-1">
                <img src={item.image} alt={item.name} className="w-full" />
                <h2 className="text-center text-sm mb-2">{item.name}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Brands;
