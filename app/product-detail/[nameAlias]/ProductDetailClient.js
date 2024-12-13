"use client";

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

// Hàm tải Facebook SDK
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
            appId: "947940970532246", // Thay đổi appId của bạn
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

export default function ProductDetailClient({ product }) {
  const [fbLoaded, setFbLoaded] = useState(false);

  useEffect(() => {
    loadFacebookSDK().then(() => {
      setFbLoaded(true);
    });
  }, []);

  // Hàm chia sẻ lên Twitter với hình ảnh
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      product.name
    )}&url=${encodeURIComponent(window.location.href)}&hashtags=product,shopping&via=yourtwitterhandle&description=${encodeURIComponent(
      product.description
    )}&image=${encodeURIComponent(product.imageURL)}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Meta tags cho SEO */}
      <Helmet>
        <meta name="description" content={product.description} />
        <meta name="title" content={product.name} />
        <meta property="og:url" content={`https://yourwebsite.com/product-detail/${product.nameAlias}`} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.imageURL || "https://res.cloudinary.com/dahzoj4fy/image/upload/v1733244037/fg6rbhwjrx2cyrq6uc7i.png"} />
        <title>{product.name}</title>
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hình ảnh sản phẩm */}
        <div className="flex justify-center items-center">
          <img
            src={product.imageURL}
            alt={product.name}
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <h2 className="text-xl font-semibold text-gray-600">{product.brand}</h2>
          <p className="text-gray-700">{product.description}</p>
          <div className="text-2xl font-semibold text-gray-900">
            {product.price ? `$${product.price}` : "Price not available"}
          </div>

          {/* Kích thước sản phẩm */}
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

          {/* Các nút thao tác */}
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

      {/* Chia sẻ lên mạng xã hội */}
      <div className="flex justify-center mt-8 space-x-4">
        {/* Chia sẻ lên Facebook */}
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
          onClick={() => {
            if (fbLoaded && window.FB) {
              window.FB.ui(
                {
                  method: "share",
                  href: window.location.href,
                },
                function (response) {
                  console.log(response);
                }
              );
            }
          }}
        >
          Share on Facebook
        </button>

        {/* Chia sẻ lên Twitter */}
        <button
          className="bg-blue-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-500"
          onClick={shareOnTwitter}
        >
          Share on Twitter
        </button>
      </div>
    </div>
  );
}
