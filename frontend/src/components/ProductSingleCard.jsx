import React from "react";

const ProductSingleCard = ({ product }) => {

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[200px] object-cover object-top"
        />
      </figure>

      <div className="card-body bg-base-200">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description || "No description available."}</p>
        <div className="price">Rp. {(product.price).toFixed(2)}</div>

      </div>
    </div>
  );
};

export default ProductSingleCard;
