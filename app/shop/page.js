'use client'; // Mark as a client component

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // We will use this for routing to the product details page
import { formatPrice } from '@/hooks/useUtil';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter(); // Initialize the router to navigate to a product's detail page

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://lthshop.azurewebsites.net/api/Products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-lg text-gray-500">Loading products...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  const handleViewDetails = (nameAlias) => {
    router.push(`/product-detail/${nameAlias}`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
            <p className="text-lg text-green-600 mb-4">Price: ${formatPrice(product.productSizes[0].price)}</p>
            {product.imageURL && (
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 mb-2">
              Add to Cart
            </button>
            <button
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors duration-200"
              onClick={() => handleViewDetails(product.nameAlias)} // Handle click to view product details
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
