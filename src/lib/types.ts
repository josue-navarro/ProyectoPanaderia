
export type UserRole = 'admin' | 'employee' | 'customer';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  username: string;
  password?: string; // In a real app, this would be a hash
  role: UserRole;
  address?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'Bread' | 'Pastries' | 'Cakes' | 'Drinks';
  isAvailable: boolean;
  stock: number;
}

export interface Store {
  id: string;
  name:string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  isOpen: boolean;
}

export type OrderStatus = 'Pending' | 'In Progress' | 'Ready for Pickup' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  items: {
    product: Product;
    quantity: number;
  }[];
  total: number;
  status: OrderStatus;
  orderDate: string;
  deliveryAddress: string;
  paymentMethod: string;
}
