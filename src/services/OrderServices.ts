import { useCallback, useState } from 'react';
import { get, post } from '../lib/apiClient';
import type { Order, OrderPayload } from '../types/domain';

interface OrderService {
  getUserOrders: (userId: string | undefined) => Promise<void>;
  sendOrder: (orderData: OrderPayload) => ReturnType<typeof post>;
  orderLoading: boolean;
  refetchOrders: boolean;
  ordersList: Order[];
}

function OrderServices(): OrderService {
  const [orderLoading, setOrderLoading] = useState(false);
  const [refetchOrders, setRefetchOrders] = useState(true);
  const [ordersList, setOrdersList] = useState<Order[]>([]);

  const getUserOrders = useCallback(async (userId: string | undefined): Promise<void> => {
    if (!userId) return;
    setOrderLoading(true);
    try {
      const result = await get<Order[]>(`/orders/userorders/${encodeURIComponent(userId)}`);
      setOrdersList(result.success && Array.isArray(result.body) ? result.body : []);
    } finally {
      setRefetchOrders(false);
      setOrderLoading(false);
    }
  }, []);

  const sendOrder = useCallback((orderData: OrderPayload) => {
    setOrderLoading(true);
    return post('/orders', orderData).finally(() => setOrderLoading(false));
  }, []);

  return { getUserOrders, sendOrder, orderLoading, refetchOrders, ordersList };
}

export default OrderServices;
