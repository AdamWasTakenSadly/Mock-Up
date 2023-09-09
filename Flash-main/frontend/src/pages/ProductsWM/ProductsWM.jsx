import React, { useEffect, useState } from "react";
import ProductDetailsWM from "../../components/ProductDetailsWM/ProductDetailsWM"; // Replace with your product component
import "./ProductsWM.scss";
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';


const ProductsWM = () => {
  const params = new URLSearchParams(window.location.search);
  const searchItem = params.get("search");
  const [searchWord, setSearchWord] = useState(searchItem);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(16);
  const [userSearchInput,setUserSearchInput]=useState('');

  useEffect(() => {
    fetchProducts();
  }, [searchWord]);

  const fetchProducts = async () => {
    const input = { input: searchWord };

    try {
      const response = await fetch("/products/search", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const json = await response.json();
        console.log("hereeeeeeeee");
        console.log(json);
        setError(json.error);
      } else {
        const json = await response.json();
        console.log("hereeeeeeeee");
        console.log(json);
        setError(null);
        setProducts(json);
        setVisibleProducts(4); // Reset visibleProducts when new products are fetched
      }
    } catch (error) {
      console.error("Error searching products:", error);
      setError("Error searching products");
    }
  };

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 16); // Load 16 more products each time
  };

  const handleUserSearchInputChange=(e)=>{
    setUserSearchInput(e.target.value);
    console.log(...userSearchInput)
  }


  return (
    <div className="allproducts">
      <div class = "empty-space"></div>
      <div className="view-products">
      <h2>All products</h2>
        <div className="topbar">
          {products &&
            products
              .slice(0, visibleProducts)
              .map((product) => (
                <ProductDetailsWM key={product._id} product={product} />
              ))}
        </div>
        {visibleProducts < (products && products.length) && (
          <div className="load-more-button">
            <button class ="btn-mdb" onClick={loadMoreProducts}>Load More</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsWM;
