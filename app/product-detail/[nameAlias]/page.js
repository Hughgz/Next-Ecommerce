"use client"; // Ensure this is a client component

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet"; // Import Helmet for meta tags

// Function to dynamically load Facebook SDK
const loadFacebookSDK = () => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && !window.FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.fbAsyncInit = function () {
          FB.init({
            appId: "947940970532246",
            cookie: true,
            xfbml: true,
            version: "v17.0",
          });
          resolve(window.FB);
        };
      };
      document.body.appendChild(script);
    }
  });
};

export default function ProductDetail({ params }) {
  const { nameAlias } = React.use(params); // Get dynamic segment from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fbLoaded, setFbLoaded] = useState(false);

  // Fetch product details on client-side
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://lthshop.azurewebsites.net/api/Products");
        const products = await response.json();
        const foundProduct = products.find((p) => p.nameAlias === nameAlias);
        if (!foundProduct) {
          throw new Error("Product not found");
        }
        setProduct(foundProduct);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [nameAlias]);

  // Load Facebook SDK
  useEffect(() => {
    loadFacebookSDK().then(() => {
      setFbLoaded(true);
    });
  }, []);

  // Handle Facebook Share Button Click
  const handleShareOnFacebook = () => {
    if (fbLoaded && window.FB) {
      FB.ui(
        {
          method: "share",
          href: window.location.href,
        },
        function (response) {
          console.log(response);
        }
      );
    } else {
      console.error("Facebook SDK is not loaded.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Error: {error}</div>;

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Meta tags for Open Graph */}
      <Helmet>
        <meta name="description" content={product.description} />
        <meta name="title" content={product.name} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.imageURL || "https://res.cloudinary.com/dahzoj4fy/image/upload/v1733244037/fg6rbhwjrx2cyrq6uc7i.png"} />
        <title>{product.name}</title>
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={product.imageURL}
            alt={product.name}
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <h2 className="text-xl font-semibold text-gray-600">{product.brand}</h2>
          <p className="text-gray-700">{product.description}</p>
          <div className="text-2xl font-semibold text-gray-900">
            {product.price ? `$${product.price}` : "Price not available"}
          </div>

          {/* Available Sizes */}
          {product.productSizes && product.productSizes.length > 0 && (
            <div>
              <label htmlFor="size-select" className="block text-gray-700 font-medium mb-2">
                Available Sizes
              </label>
              <select
                id="size-select"
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                {product.productSizes.map((size, index) => (
                  <option key={index} value={size.size}>
                    {size.size} - {size.quantity > 0 ? `${size.quantity} available` : "Out of stock"}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
              Add to Cart
            </button>
            <button className="text-red-500 hover:text-red-600">
              <i className="fas fa-heart"></i> Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
          onClick={handleShareOnFacebook}
        >
          Share on Facebook
        </button>
        <button
          className="bg-blue-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-500"
          onClick={() => {
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              product.name
            )}&url=${encodeURIComponent(window.location.href)}&hashtags=product,shopping`;
            window.open(twitterUrl, "_blank");
          }}
        >
          Share on Twitter
        </button>
      </div>
    </div>
  );
}
