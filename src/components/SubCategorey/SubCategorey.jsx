import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react"; // Lucide icon for navigation

export default function SubCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  function getSubCategories() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getSubCategories", id],
    queryFn: getSubCategories,
    enabled: !!id,
    select: (data) => data.data.data,
    onError: (error) => {
      toast.error("Failed to fetch subcategories. Please try again later.");
      console.error("Error fetching subcategories:", error);
    },
  });

  if (!id) return <p>Loading category...</p>;
  if (isLoading) return <Loading />;
  if (isError || !data) return <p>No subcategories found.</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Back Button */}
      <button
        className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition mb-6"
        onClick={() => navigate("/categories")}
      >
        <ArrowLeft size={20} /> Back to Categories
      </button>

      {/* Subcategories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.length > 0 ? (
          data.map((subCategory) => (
            <div
              key={subCategory._id}
              className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition p-6 text-center"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {subCategory.name}
              </h2>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No subcategories found.
          </p>
        )}
      </div>
    </div>
  );
}
