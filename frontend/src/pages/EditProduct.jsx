import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

function EditProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/product/${id}`)
      .then((response) => {
        setName(response.data.name);
        setPrice(response.data.price);
        setDescription(response.data.description);
        setCategory(response.data.category);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("error, check console");
      });
  }, [id]);

  const handleEditProduct = () => {
    const data = { name, price, description, category };
    setLoading(true);
    axios
      .put(`http://localhost:3000/product/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Produk berhasil diedit", { variant: "success" });
        navigate("/admin");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gray-50">
      {loading && <Spinner />}
      <div className="container max-w-lg shadow-lg rounded-lg p-5 bg-white">
        <Link
          to="/admin"
          className="flex justify-center items-center bg-gray-400 mb-4 w-12 py-2 px-4 text-sm rounded-xl"
        >
          Back
        </Link>
        <h1 className="text-3xl font-semibold my-4 text-gray-700">
          Edit Product
        </h1>
        <div className="my-4">
          <label htmlFor="name" className="block text-md text-gray-600 mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />

          <label htmlFor="price" className="block text-md text-gray-600 mb-2">
            Price
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />

          <label
            htmlFor="description"
            className="block text-md text-gray-600 mb-2"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />

          <label
            htmlFor="category"
            className="block text-md text-gray-600 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
            required
          >
            <option value="">Select Category</option>
            <option value="course">Course</option>
            <option value="template">Template</option>
          </select>
          <button
            onClick={handleEditProduct}
            className="w-full bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded-md mt-4"
          >
            Save Change
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
