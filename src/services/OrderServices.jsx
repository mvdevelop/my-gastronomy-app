import { useCallback, useState } from 'react';
import { get, post } from '../lib/apiClient';

function OrderServices() {
  const [orderLoading, setOrderLoading] = useState(false);
  const [refetchOrders, setRefetchOrders] = useState(true);
  const [ordersList, setOrdersList] = useState([]);

  const getUserOrders = useCallback(async (userId) => {
    if (!userId) return;
    setOrderLoading(true);
    const result = await get(`/orders/userorders/${encodeURIComponent(userId)}`);
    if (result.success && Array.isArray(result.body)) {
      setOrdersList(result.body);
    } else {
      setOrdersList([]);
    }
    setRefetchOrders(false);
    setOrderLoading(false);
  }, []);

  const sendOrder = useCallback(async (orderData) => {
    setOrderLoading(true);
    const result = await post('/orders', orderData);
    setOrderLoading(false);
    return result;
  }, []);

  return { getUserOrders, sendOrder, orderLoading, refetchOrders, ordersList };
}

export default OrderServices;
