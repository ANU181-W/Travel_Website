"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      // Show success toast
      toast.success("Product created successfully!");

      // Redirect to admin page on successful product creation
      // router.push("/admin");
    } catch (error) {
      console.error("Error creating product:", error);

      // Show error toast
      toast.error("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast container */}
      <div>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create New Product
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Price
            </label>
            <input
              type="number"
              step="0.01"
              id="price"
              name="price"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Product Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default CreateProduct;
