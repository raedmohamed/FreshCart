import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function userProducts() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const response = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
    // staleTime: 100000,
    // gcTime: 3000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchInterval: 1000,
    select: (data) => data.data.data,
  });

  return response;
}
