import * as React from "react";
import {useState,useEffect} from 'react';
import './AllMyOrders.scss'
import UserOrder from '../../components/UserOrder/UserOrder'

const AllMyOrders = () => {

    const [allOrders,setAllOrders]=useState([])
    const [isInitialRender,setIsInitialRender]=useState(true)
    useEffect(()=>{
        if(isInitialRender)
        {
            fetchOrders();
        }
    },[])

    const fetchOrders=async()=>{
        const response = await fetch ('/orders/getUserOrders')
        const json = await response.json()
        if (response.ok)
        {
            setAllOrders(json)
            console.log(json)
            setIsInitialRender(false);
        }
    }

    return(
        <div>
        <div className="empty-space"></div>

        {allOrders && allOrders.map((order) => (
                    <UserOrder key={order._id} order={order} />
                  ))}

        </div>
    )
}

export default AllMyOrders;