import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const DeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate;
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteProduct = () => {
    setLoading(true);

    axios
      .delete(`http://localhost:3000/product/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Product delete", { variant: "success" });
        navigate("/admin");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-6 bg-gray-59 flex justify-center items-center">
      {loading && <Spinner/>}
      <div className="container max-w-lg shadow-lg p-5">
        <Link
          to="/admin"
          className="flex justify-center items-center bg-gray-400 mb-4 w-12 py-2 px-4 text-sm rounded-xl"
        >
          Back
        </Link>
        <h2 className="text-2xl mb-4 font-semibold text-gray-800">
          Are you sure want to delete this product?
        </h2>
        <button
          onClick={handleDeleteProduct}
          className="bg-red-400 hover:bg-red-800 text-white py-2 px-4 rounded-lg w-full"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteProduct;
