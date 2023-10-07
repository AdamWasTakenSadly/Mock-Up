import * as React from "react";
import {useState,useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import './UserOrder.scss'


const UserOrder = (order) => {

    const [orderNoOfItems,setOrderNoOfItems]=useState(null)
    const [orderImage,setOrderImage]=useState(null)

    const [isInitialRender1,setIsInitialRender1]=useState(true)
    const [isInitialRender2,setIsInitialRender2]=useState(true)

    useEffect(()=>{
        if(isInitialRender1 || isInitialRender2)
        {
            getOrderNoOfItems()
            getOrderImage()
        }
    },[])

    const getOrderNoOfItems=()=>{
        var i=0
        for (i=0;i<order.order.orderProducts.length;i++)
        {
            i+=order.order.orderProducts[i].quantity
        }
        setOrderNoOfItems(i)
        setIsInitialRender1(false)
    }

    const getOrderImage=async()=>{

        const firstProductId=order.order.orderProducts[0].product
        console.log(firstProductId +"prodd")
        const response = await fetch ('/products/'+firstProductId+'/image')
        const json = await response.json()
        if (response.ok)
        {
            setOrderImage(json.image)
            setIsInitialRender2(false);
        }
    }

    if(isInitialRender1 || isInitialRender2)
    {
        return(<di>Loading...</di>)
    }
return(
<Card className="order-container">
        <CardMedia
        component="img"
        sx={{ width: 151 }}
        src={orderImage || "https://media.istockphoto.com/id/1206806317/de/vektor/cart-icon-isoliert-auf-wei%C3%9Fem-hintergrund.jpg?s=612x612&w=0&k=20&c=C8M_hZIFVmivufyr8J36_Cpbs09Usu4HaNBnR8PTf2M="}
      />
        <Box className="order-text-container">
        <CardContent className="order-text">
          <Typography component="div" variant="h5">
            {order.order.orderFirstName}{'\u0020'}{order.order.orderLastName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {order.order.orderPhone}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {orderNoOfItems}{'\u0020'} items
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {order.order.totalAmount}{'\u0020'} EGP
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
           {order.order.orderStatus}
          </Typography>
        </CardContent>
      </Box>
    </Card>
)
}

export default UserOrder