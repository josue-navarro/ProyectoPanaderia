
export type UserRole = 'superAdmin' | 'admin' | 'employee' | 'customer';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  username: string;
  password?: string; // In a real app, this would be a hash
  role: UserRole;
  address?: string;
  storeId?: string; // This might become a "primary" store or be deprecated.
  storeName?: string;
  verificationCode?: string;
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
  ownerId: string; // The ID of the user who created the store
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
