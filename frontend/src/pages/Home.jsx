import React, { useEffect, useState } from 'react';
import axios from "axios";
import ProductCard from '../components/ProductCard';

const Home = () => {

const [product, setProduct] = useState([]);

useEffect(() => {
    axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product`)
        .then((response) => {
            setProduct(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
}, []);

  return (
    <div className="p-4 max-w-[1300px] mx-auto my-16">
      <div className="hero-content text-center mb-24">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Welcome to <span className="text-teal-700">Ziifood</span>
          </h1>
          <p className="py-6">
            We offer the high quality food and drink
          </p>
          <a href="/shop" className="btn btn-accent mt-4">
              Shop
          </a>
        </div>
      </div>
      
    <ProductCard product={product} />

    </div>
  )
}

export default Home