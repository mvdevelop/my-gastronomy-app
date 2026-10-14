export interface User {
  _id: string;
  fullname?: string;
  email?: string;
}

export interface AuthSession {
  token: string;
  user: User;
}

export interface JwtPayload {
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  body?: T;
  message?: string;
  [key: string]: unknown;
}

export interface Plate {
  _id: string;
  name: string;
  ingredients?: string[] | string;
  description?: string;
  imgUrl?: string;
  price?: number | string;
}

export interface CartItem extends Plate {
  quantity: number;
}

export interface OrderItem {
  _id?: string;
  plateId?: string;
  quantity: number;
  itemDetails?: Plate[];
}

export type PickupStatus = 'Pending' | 'Completed' | 'Canceled' | string;

export interface Order {
  _id: string;
  userId?: string;
  pickupTime: string;
  pickupStatus?: PickupStatus;
  orderItems?: OrderItem[];
}

export interface OrderPayload {
  userId: string;
  pickupTime: string;
  items: Array<{ plateId: string; quantity: number }>;
}
