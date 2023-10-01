
import React from 'react'
import { useState,useEffect } from 'react';
import "./CreateProduct.scss";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';



const CreateProduct =()=>{

    const [name,setName] = useState('')
    const [category,setCategory] = useState('')
    const [amountLeft,setAmountLeft] = useState('')
    const [discount,setDiscount] = useState('')
    const [price,setPrice] = useState('')
    const [image,setImage] = useState('')
    const [description,setDescription] = useState('')
    const [howToUse,setHowToUse] = useState('')
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault()
        if(name == '' || category == '' || price == '' || amountLeft == '' || discount == '' || image == '' || description == ''|| howToUse == ''){
          setError('Please fill in all the fields')
        }
        else{
          const product = {
            name,
            description,
            price,
            image,
            howToUse,
            amountLeft,
            discount,
            category,
            }
            const response = await fetch ("/products/",{
                method: 'POST',
                body:JSON.stringify(product),
                headers: {
                    'Content-Type':'application/json'
                }
            })

            const json = await response.json()

            if (response.status == 400) {
                setError(json.error);
            }
            if (response.status == 200){
                setName('')
                setCategory('')
                setPrice('')
                setDiscount('')
                setAmountLeft('')
                setDescription('')
                setHowToUse('')
                setImage('')
                setError(null);
            }
        }
    }


    return (
        <Form>
            <div class="CenterWithin">
  <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
       <h2 >Create New Product</h2>
       <br></br>
            </div>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
  
          <Form.Group as={Col} controlId="formGridCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control type="Category" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAmount">
            <Form.Label>Available Amount</Form.Label>
            <Form.Control placeholder="Enter Amount" value={amountLeft} onChange={(e) => setAmountLeft(e.target.value)}/>
          </Form.Group>
  
          <Form.Group as={Col} controlId="formGridPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDiscount">
            <Form.Label>Discount</Form.Label>
            <Form.Control placeholder="Enter Percentage" value={discount} onChange={(e) => setDiscount(e.target.value)} />
          </Form.Group>
        </Row>
  
        <Form.Group className="mb-3" controlId="formGridImage">
          <Form.Label>Product Image</Form.Label>
          <Form.Control placeholder="Enter URL" value={image} onChange={(e) => setImage(e.target.value)} />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="Description">
        <Form.Label>Product Description</Form.Label>
        <Form.Control as="textarea" rows={2} placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="HowToUse">
        <Form.Label>How To Use Product</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter Usage method" value={howToUse} onChange={(e) => setHowToUse(e.target.value)} />
      </Form.Group>
      {error && <div className="error" style={{color: "red", fontSize: "small"}}>{error}</div>}
        <button class="btn-mdb2"  onClick={handleSubmit}>
          Submit
        </button>
      </Form>
      );

}

export default CreateProduct