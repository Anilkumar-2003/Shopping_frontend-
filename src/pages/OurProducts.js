import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pages/OurProducts.css";

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://shopping-backend-4686.onrender.com/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);
  // Filter products safely
  const filteredProducts = products.filter((product) =>
    product?.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="container">

                              {/* Loader - Now using a class to prevent affecting other SVGs */}
                              <div className="loader-container">
                                <svg className="loader-svg" viewBox="25 25 50 50">
                                  <circle r="20" cy="50" cx="50"></circle>
                                </svg>
                              </div>
                            </div>;
  if (error) return <div className="container">

                      {/* Loader - Now using a class to prevent affecting other SVGs */}
                      <div className="loader-container">
                      <svg className="loader-svg" viewBox="25 25 50 50">
                      <circle r="20" cy="50" cx="50"></circle></svg>
                      {/* <div className="error-message">Error: {error}</div> */}
                      </div>
                    </div>;
// console.log(products)
  return (
    <div className="shop-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="items-grid">
        {filteredProducts.length >= 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="item-card">
              <img src={product.img} alt={product.name} className="item-image" />
              <h3>{product.productName}</h3>
              <p>{product.productDescription}</p>
              <p><strong>Price:</strong> ${product.productPrice}</p>
              <p><strong>Product ID:</strong> {product.productId}</p>
              {console.log(product.description)}
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default OurProducts;
