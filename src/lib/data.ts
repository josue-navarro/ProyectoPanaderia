
import type { Product, Store, Order, User } from './types';
import { users as appUsers } from '@/lib/data';

export const users: User[] = [
    {
        id: 'user_admin',
        fullName: 'Admin User',
        email: 'admin@panaderia.cloud',
        username: 'admin',
        password: 'Password1',
        role: 'admin',
    },
    {
        id: 'user_adm_josue',
        fullName: 'Josue Admin',
        email: 'adm.josue@panaderia.cloud',
        username: 'ADMJosue',
        password: 'Josue123',
        role: 'admin',
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
    }
];

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
      { product: products[0], quantity: 1 },
    ],
    total: 7.5,
    status: 'Ready for Pickup',
    orderDate: '2023-10-26'
  },
  {
    id: '#86755',
    customerName: 'John Smith',
    items: [
      { product: products[0], quantity: 1 },
    ],
    total: 4.00,
    status: 'In Progress',
    orderDate: '2023-10-27'
  },
  {
    id: '#86756',
    customerName: 'Peter Jones',
    items: [
      { product: products[0], quantity: 4 },
    ],
    total: 30.00,
    status: 'Completed',
    orderDate: '2023-10-25'
  }
];
