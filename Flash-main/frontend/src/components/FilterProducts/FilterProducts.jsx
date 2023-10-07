import { useEffect, useState } from "react";
import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select
} from "@mui/material";
import './FilterProducts.scss'
import Chip from '@mui/material/Chip';
import Slider from '@mui/material/Slider';
import Rating from "@mui/material/Rating";


const FilterProducts = ({ onProductsFiltered }) => {

  const [priceFilter, setPriceFilter] = useState(null)
  const [inStockFilter, setInStockFilter]=useState(false)
  const [ratingFilter, setRatingFilter] = useState(null)
  const [categoryFilter, setCategoryFilter]=useState(null)

  const [allCategories,setAllCategories]=useState(null)
  const [isInitialRender,setIsInitialRender]=useState(true)

  const [error,setError]=useState(null)

  useEffect(()=>{

    if(isInitialRender)
    {
      getAllCategories()
    }
   
  },[isInitialRender])

  const getAllCategories=async()=>{

  const response = await fetch ("/products/getAllCategories")
  const json = await response.json()

  if (response.status === 200){
    console.log(json)
    setAllCategories(json)
    setIsInitialRender(false)
  }
  else if(response.status === 400)
  {
    setError(json.error)
  }
  }

  const handleResetAll = () => {
    setPriceFilter(null);
    setInStockFilter(false);
    setRatingFilter(null)
    setCategoryFilter(null)
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value)
  };

  const handleInStockChange =()=>{
    console.log(inStockFilter)
    if(inStockFilter===true)
    {
      setInStockFilter(false)
    }
    else{
      setInStockFilter(true)
    }
  }

  const handlePriceChange =(event)=>{
    setPriceFilter(event.target.value)
  }

  const handleRatingChange =(event)=>{
    setRatingFilter(event.target.value)
  }

  const handleFilterClick=async()=>{
    const filters = { price: priceFilter,rating:ratingFilter,inStock:inStockFilter,category:categoryFilter };


    try {
      const response = await fetch("/products/filterProducts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
        body: JSON.stringify(filters),
      });

      const json = await response.json();
      console.log(json)
      if (response.ok) {
       onProductsFiltered(json)
      } else {
       setError(json.error)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if(isInitialRender)
  {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      
      <Box class ="filter-container" >

      <Box class="filter-header">
        <Box class="filter-header-text">
          Filters
        </Box>
        <button class="reset-button" onClick={handleResetAll}>
          Reset All
        </button>
      </Box>
<br></br>
      <List>

      <React.Fragment >
      <Divider >
       <Chip label="" />
       </Divider>
        <ListItem >
          <FormControl fullWidth>
           <label class="filter-text">
          <input
          type="checkbox"
          class="filter-stock-checkbox"
          checked={inStockFilter}
          onChange={handleInStockChange}
        />
        In Stock
        </label>
           </FormControl>
        </ListItem>
      </React.Fragment>

          <React.Fragment >
          <Divider >
       <Chip label="" />
       </Divider>
                <ListItem >
                  <FormControl fullWidth>
                    <InputLabel style={{color:"#F0F0F0"}} >Category</InputLabel>
                    <Select
                      value={categoryFilter}
                      onChange={handleCategoryChange}
                    >
                      {allCategories.map((item) => (
                        <MenuItem key={item.category} value={item.category}>
                          {item.category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </ListItem>
          </React.Fragment>

          <React.Fragment >
          <Divider >
       <Chip label="Price" />
       </Divider>
                <ListItem >
                  <FormControl fullWidth>
                  <Slider
                  value={priceFilter}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  style={{color:"#F0F0F0"}}
                  min={0}
                  max={2000}
                />
                  </FormControl>
                </ListItem>
             <Divider />
          </React.Fragment>

          <React.Fragment >
          <Divider >
       <Chip label="Rating" />
       </Divider>
                <ListItem >
                  <FormControl fullWidth>
                  <Rating
                  value={ratingFilter}
                  onChange={handleRatingChange}
                  >
                  </Rating>
                  </FormControl>
                </ListItem>
             <Divider />
          </React.Fragment>

      </List>

      <Box class="filter-footer">
      <button class="filter-button" onClick={handleFilterClick}>
          Filter
        </button>
        </Box>
    </Box>
    </div>
  );
};

export default FilterProducts;
