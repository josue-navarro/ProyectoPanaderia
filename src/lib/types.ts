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
}
