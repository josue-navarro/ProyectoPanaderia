
import type { Product, Store, Order, User } from './types';

export const users: User[] = [
    {
        id: 'user_adm_josue',
        fullName: 'Josue Admin',
        email: 'adm.josue@panaderia.cloud',
        username: 'ADMJosue',
        password: 'Password123',
        role: 'superAdmin',
        address: '456 Admin Blvd, San Francisco, CA 94103',
    }
];

// This will act as our in-memory database for products.
// Changes to this array will be reflected across the app.
export const products: Product[] = [];

export const stores: Store[] = [];

export const orders: Order[] = [
  {
    id: '#86754',
    customerName: 'Jane Doe',
    items: [
      { product: { id: 'p1', name: 'Croissant', price: 3.5 } as any, quantity: 2 },
      { product: { id: 'p2', name: 'Sourdough', price: 8.0 } as any, quantity: 1 },
    ],
    total: 15.0,
    status: 'Ready for Pickup',
    orderDate: '2023-10-26',
    deliveryAddress: '101 Customer Ave, Berkeley, CA 94704',
    paymentMethod: 'Credit Card (**** 1234)'
  },
  {
    id: '#86755',
    customerName: 'John Smith',
    items: [
       { product: { id: 'p3', name: 'Baguette', price: 4.0 } as any, quantity: 1 },
    ],
    total: 4.00,
    status: 'In Progress',
    orderDate: '2023-10-27',
    deliveryAddress: '202 Customer Pl, San Francisco, CA 94110',
    paymentMethod: 'Apple Pay'
  },
  {
    id: '#86756',
    customerName: 'Peter Jones',
    items: [
       { product: { id: 'p1', name: 'Croissant', price: 3.5 } as any, quantity: 4 },
    ],
    total: 14.00,
    status: 'Completed',
    orderDate: '2023-10-25',
    deliveryAddress: '303 Customer Ct, San Mateo, CA 94401',
    paymentMethod: 'Credit Card (**** 5678)'
  }
];
