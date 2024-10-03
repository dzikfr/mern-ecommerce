import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImg(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImgPreview(null);
    }
  };

  const uploadFile = async () => {
    if (!img) {
      enqueueSnackbar("No image selected", { variant: "warning" });
      return;
    }

    const data = new FormData();
    data.append("file", img);

    try {
      const uploadUrl = (`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/upload-image`);
      const res = await axios.post(uploadUrl, data);
      const { secure_url } = res.data;

      console.log("Uploaded image url :", secure_url);
      enqueueSnackbar("Image uploaded successfull", { variant: "success" });
      return secure_url;
    } catch (error) {
      console.log("Upload error", error);
      enqueueSnackbar("Failed to upload image", { variant: "error" });
    }
  };

  const handleSaveProduct = async () => {
    if (!name || !price || !category) {
      enqueueSnackbar("Please fill all required fields", {
        variant: "warning",
      });
      return;
    }

    const priceCheck = parseInt(price);
    if (isNaN(priceCheck) || priceCheck <= 0) {
      enqueueSnackbar("Price must be a positive number", {
        variant: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      const uploadedImageUrl = await uploadFile();
      if (!uploadedImageUrl) {
        throw new Error("Image upload failed");
      }

      const formData = {
        name,
        price,
        description,
        image: uploadedImageUrl,
        category
      };

      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product`,
        formData
      );

      enqueueSnackbar("Product saved successfull", { variant: "success" });
      navigate('/admin');
    } catch (error) {
      console.log("Error: ", error);
      enqueueSnackbar('Error saving product: ' + (error.response?.data?.message || error.message), { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

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
          Create Product
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
            <option value="food">Food</option>
            <option value="drink">Drink</option>
          </select>

          <label htmlFor="img" className="block text-md text-gray-600 mb-2">
            Upload Image
          </label>
          <input
            id="img"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />


            {imgPreview && (
                <div className="my-4">
                    <img src={imgPreview} alt="Preview" className="max-w-full h-auto"/>
                </div>
            )}

          <button
            onClick={handleSaveProduct}
            className="w-full bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded-md mt-4"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
