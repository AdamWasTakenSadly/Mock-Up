import React, { useEffect, useState } from "react";
import { useAsyncValue } from "react-router-dom";
import ProductDetails from "../../components/ProductDetails/ProductDetails"; // Replace with your product component
import Cookie from "js-cookie";
import "./Shop.scss";
import { MDBBtn } from "mdb-react-ui-kit"; // Import the MDBBtn component
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { Carousel } from "react-bootstrap";

const Shop = () => {
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
    console.log("input is ")
    console.log(input)

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
      <div className="view-products">
        <Carousel className="custom-carousel">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn.pixabay.com/photo/2016/08/22/16/23/massage-therapy-1612308_1280.jpg"
              alt="Image 1"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn.pixabay.com/photo/2016/08/22/16/23/massage-therapy-1612308_1280.jpg"
              alt="Image 2"
            />
          </Carousel.Item>
        </Carousel>
        
        <h2>Our Products</h2>
        <div>
        <Form className="d-flex">
            <input
              type="text"
              placeholder="  Search our products"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>handleUserSearchInputChange(e)}
              value={userSearchInput}
              style={{ height:'50px',width:'500px',borderRadius:'40px',marginLeft: "175px", padding: "13px 0px 0px 16px",borderColor:'black', float:"right"}}
             
            />
              <Nav.Link
              href={`/shop?search=${(userSearchInput)}`}
            style={{
              backgroundImage: "linear-gradient(to bottom, #0099D3, #006DA3)",
              width: "60px",
              height: "50px",
              borderRadius: "40px",
              marginLeft: "25px",
             padding: "13px 0px 0px 16px",
              marginRight:"-80%"
            }}
          >
            <img width="60%" src="/search.png" alt="Search" />
          </Nav.Link>
          </Form>
          </div>
        <div className="topbar">
          {products &&
            products
              .slice(0, visibleProducts)
              .map((product) => (
                <ProductDetails key={product._id} product={product} />
              ))}
        </div>
        {visibleProducts < (products && products.length) && (
          <div className="load-more-button">
            <button onClick={loadMoreProducts}>Load More</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
