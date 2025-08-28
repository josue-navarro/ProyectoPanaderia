
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
    }
];

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Sourdough Loaf',
    description: 'Classic tangy sourdough with a chewy crumb and crusty exterior.',
    price: 7.5,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Bread',
    isAvailable: true,
    stock: 25,
  },
  {
    id: 'prod_002',
    name: 'Croissant',
    description: 'Buttery, flaky, and golden perfection.',
    price: 3.5,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Pastries',
    isAvailable: true,
    stock: 50,
  },
  {
    id: 'prod_003',
    name: 'Chocolate Cake Slice',
    description: 'Rich, moist chocolate cake with a decadent fudge frosting.',
    price: 6.0,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Cakes',
    isAvailable: false,
    stock: 0,
  },
  {
    id: 'prod_004',
    name: 'Baguette',
    description: 'A long, thin loaf of French bread that is commonly made from basic lean dough.',
    price: 4.0,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Bread',
    isAvailable: true,
    stock: 30,
  },
  {
    id: 'prod_005',
    name: 'Cinnamon Roll',
    description: 'Soft, fluffy roll with a gooey cinnamon-sugar filling, topped with cream cheese frosting.',
    price: 4.5,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Pastries',
    isAvailable: true,
    stock: 40,
  },
  {
    id: 'prod_006',
    name: 'Espresso',
    description: 'A concentrated form of coffee, served in small, strong shots.',
    price: 3.0,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Drinks',
    isAvailable: true,
    stock: 100,
  },
  {
    id: 'prod_007',
    name: 'Red Velvet Cake',
    description: 'Classic red velvet cake with a smooth cream cheese frosting.',
    price: 55.0,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Cakes',
    isAvailable: true,
    stock: 5,
  },
    {
    id: 'prod_008',
    name: 'Latte',
    description: 'A coffee drink made with espresso and steamed milk.',
    price: 4.5,
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Drinks',
    isAvailable: true,
    stock: 100,
  },
];

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
      { product: products[1], quantity: 2 },
    ],
    total: 14.50,
    status: 'Ready for Pickup',
    orderDate: '2023-10-26'
  },
  {
    id: '#86755',
    customerName: 'John Smith',
    items: [
      { product: products[3], quantity: 1 },
    ],
    total: 4.00,
    status: 'In Progress',
    orderDate: '2023-10-27'
  },
  {
    id: '#86756',
    customerName: 'Peter Jones',
    items: [
      { product: products[4], quantity: 4 },
      { product: products[5], quantity: 4 },
    ],
    total: 30.00,
    status: 'Completed',
    orderDate: '2023-10-25'
  }
];
