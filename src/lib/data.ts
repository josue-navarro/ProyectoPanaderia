
import type { Product, Store, Order, User } from './types';

export const users: User[] = [
    {
        id: 'user_admin',
        fullName: 'Admin User',
        email: 'admin@panaderia.cloud',
        username: 'admin',
        password: 'Password1',
        role: 'admin',
        address: '123 Admin Way, Suite 100, San Francisco, CA 94102',
    },
    {
        id: 'user_adm_josue',
        fullName: 'Josue Admin',
        email: 'adm.josue@panaderia.cloud',
        username: 'ADMJosue',
        password: 'Josue123',
        role: 'admin',
        address: '456 Admin Blvd, San Francisco, CA 94103',
    },
    {
        id: 'user_emp_josue',
        fullName: 'Josue Employee',
        email: 'emp.josue@panaderia.cloud',
        username: 'EmpleadoJosue',
        password: 'Josue123',
        role: 'employee',
    },
    {
        id: 'user_cli_josue',
        fullName: 'Josue Customer',
        email: 'cli.josue@panaderia.cloud',
        username: 'ClienteJosue',
        password: 'Josue123',
        role: 'customer',
        address: '789 Customer St, Oakland, CA 94607',
    },
     {
        id: 'user_cli_jane',
        fullName: 'Jane Doe',
        email: 'jane.doe@example.com',
        username: 'janedoe',
        password: 'Password1',
        role: 'customer',
        address: '101 Customer Ave, Berkeley, CA 94704',
    },
    {
        id: 'user_cli_john',
        fullName: 'John Smith',
        email: 'john.smith@example.com',
        username: 'johnsmith',
        password: 'Password1',
        role: 'customer',
        address: '202 Customer Pl, San Francisco, CA 94110',
    },
    {
        id: 'user_cli_peter',
        fullName: 'Peter Jones',
        email: 'peter.jones@example.com',
        username: 'peterjones',
        password: 'Password1',
        role: 'customer',
        address: '303 Customer Ct, San Mateo, CA 94401',
    }
];

// This will act as our in-memory database for products.
// Changes to this array will be reflected across the app.
export const products: Product[] = [];

export const stores: Store[] = [
  {
    id: 'store_01',
    name: 'Panadería Cloud Downtown',
    address: '123 Main St',
    city: 'San Francisco, CA 94102',
    phone: '(415) 555-0101',
    hours: 'Mon-Fri: 6am - 6pm, Sat-Sun: 7am - 4pm'
  },
  {
    id: 'store_02',
    name: 'Panadería Cloud Mission',
    address: '456 Valencia St',
    city: 'San Francisco, CA 94103',
    phone: '(415) 555-0102',
    hours: 'Mon-Sun: 7am - 5pm'
  },
  {
    id: 'store_03',
    name: 'Panadería Cloud Oakland',
    address: '789 Broadway',
    city: 'Oakland, CA 94607',
    phone: '(510) 555-0103',
    hours: 'Mon-Fri: 6:30am - 5:30pm, Sat-Sun: 8am - 4pm'
  }
];

export const orders: Order[] = [
  {
    id: '#86754',
    customerName: 'Jane Doe',
    items: [
      { product: products[0] || { id: 'p1', name: 'Croissant', price: 3.5 } as any, quantity: 2 },
      { product: products[1] || { id: 'p2', name: 'Sourdough', price: 8.0 } as any, quantity: 1 },
    ],
    total: 15.0,
    status: 'Ready for Pickup',
    orderDate: '2023-10-26',
    deliveryAddress: users.find(u => u.username === 'janedoe')?.address || 'N/A',
    paymentMethod: 'Credit Card (**** 1234)'
  },
  {
    id: '#86755',
    customerName: 'John Smith',
    items: [
       { product: products[2] || { id: 'p3', name: 'Baguette', price: 4.0 } as any, quantity: 1 },
    ],
    total: 4.00,
    status: 'In Progress',
    orderDate: '2023-10-27',
    deliveryAddress: users.find(u => u.username === 'johnsmith')?.address || 'N/A',
    paymentMethod: 'Apple Pay'
  },
  {
    id: '#86756',
    customerName: 'Peter Jones',
    items: [
       { product: products[0] || { id: 'p1', name: 'Croissant', price: 3.5 } as any, quantity: 4 },
    ],
    total: 14.00,
    status: 'Completed',
    orderDate: '2023-10-25',
    deliveryAddress: users.find(u => u.username === 'peterjones')?.address || 'N/A',
    paymentMethod: 'Credit Card (**** 5678)'
  }
];
