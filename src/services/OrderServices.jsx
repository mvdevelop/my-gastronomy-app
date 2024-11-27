
import { useState } from "react";

function OrderServices() {
    const [ orderLoading, setOrderLoading ] = useState(false);
    const [ refetchOrders, setRefetchOrders ] = useState(true);
    const [ ordersList, setOrdersList ] = useState([]);

    // const url = 'http://localhost:3000/orders';

    const url = 'https://my-gastronomy-backend.vercel.app/orders';

    const getUserOrders = (userId) => {
        setOrderLoading(true);

        fetch(`${url}/userorders/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
        .then((response) => response.json())
        .then((result) => { 
            if(result.success) {
                setOrdersList(result.body);
            } else {
                console.log(result); 
            }
        })
        .catch((error) => console.log(error))
        .finally(() => { 
            setOrderLoading(false);
            setRefetchOrders(false); 
        });
    }

    const sendOrder = (orderData) => {
        setOrderLoading(true);

        fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(orderData)
        })
        .then((response) => response.json())
        .then((result) => { 
            console.log(result); 
        })
        .catch((error) => console.log(error))
        .finally(() => { 
            setOrderLoading(false); 
        });
    }

    return { getUserOrders, sendOrder, orderLoading, refetchOrders, ordersList }
}

export default OrderServices;
