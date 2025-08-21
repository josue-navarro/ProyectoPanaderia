# **App Name**: Panadería Cloud

## Core Features:

- Role-Based Authentication: User authentication and authorization based on roles (Admin, Employee, Customer) to restrict access to different parts of the system, without backend integration.
- Product Catalog: Display available products, their details (name, price, description), and availability status.
- Order Creation: Allow customers to create orders by selecting products from the catalog.
- Order Tracking: Display the current status of an order.
- Store Locator: Display the contact information of our physical stores.
- AI Product Recommendations: A generative AI tool to suggest new combinations of products. Based on products customers typically order, this AI-powered tool provides relevant recommendations.
- Inventory Management: Complete Inventory Module: additions/removals, audited movements, and low stock alerts.
- Stock Blocking Rule: Business rule to block orders due to lack of stock when creating orders.
- Order Status Notifications: Automatic notifications when changing the order status (FCM/email).
- Reporting: Daily reports (sales and inventory) and customer behavior.
- Loyalty Program: Loyalty program (benefits/points) and history per client.
- Personnel & Promotions: Staff management and automatic promotions.
- Firestore Security: Firestore security rules per collection/role + indexes (orders by customer/status/date; inventory by productId).
- Non-Functional Requirements: Explicit NFRs in the project sheet: security, performance ≤5s, auditability, compatibility and accessibility.

## Style Guidelines:

- Primary color: Warm brown (#A67B5B), evoking the feeling of baked goods.
- Background color: Light beige (#F5F5DC), creating a comforting and appetizing atmosphere.
- Accent color: Muted gold (#D4A27A), used sparingly for highlights and important actions.
- Headline font: 'Playfair', serif, for an elegant and readable heading.
- Body font: 'PT Sans', sans-serif, as a complement to 'Playfair' for easy readability.
- Use simple, line-based icons to represent product categories and actions.
- Design a clean and well-spaced layout, making it easy for users to navigate and browse products.