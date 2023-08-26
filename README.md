Node.js Express Ecommerce REST API
This repository contains a Node.js and Express-based REST API for building an Ecommerce platform. The API provides endpoints for managing various aspects of an online store, including products, categories, orders, and user authentication.

Table of Contents
Features
Installation
Usage
API Endpoints
Authentication
Contributing
License
Features
Product Management: CRUD operations for managing products.
Category Management: Organize products by categories.
User Authentication: Secure endpoints with user authentication.
Order Handling: Place and manage orders with ease.
Validation: Validate input data to ensure data integrity.
Error Handling: Consistent error handling for better reliability.
Scalable: Built on Node.js and Express, known for scalability.
Installation
Clone the repository: git clone https://github.com/abdultruth/NodejsEcommerceRestApi.git
Navigate to the project directory: cd NodejsEcommerceRestApi
Install dependencies: npm install
Usage
Set up a MongoDB database and update the connection details in config/db.js.
Configure other environment variables in a .env file (use .env.example as a template).
Run the server: npm start
The API will be accessible at http://localhost:3000.
API Endpoints
Products:

GET /api/products: Get a list of products.
GET /api/products/:id: Get a specific product by ID.
POST /api/products: Create a new product.
PUT /api/products/:id: Update a product.
DELETE /api/products/:id: Delete a product.
Categories:

GET /api/categories: Get a list of categories.
GET /api/categories/:id: Get a specific category by ID.
POST /api/categories: Create a new category.
PUT /api/categories/:id: Update a category.
DELETE /api/categories/:id: Delete a category.
Users:

POST /api/users/register: Register a new user.
POST /api/users/login: Log in a user.
GET /api/users/profile: Get the user's profile.
Orders:

POST /api/orders: Place a new order.
GET /api/orders/:id: Get order details.
GET /api/orders: Get a list of orders (admin only).
PUT /api/orders/:id/pay: Update order to paid status.
PUT /api/orders/:id/deliver: Update order to delivered status (admin only).
Authentication
User authentication is required for certain endpoints. When making requests that require authentication, include the user's JWT token in the Authorization header.

Example:

Authorization: Bearer your_token_here
Contributing
Contributions are welcome! If you find any bugs or want to add new features, please open an issue or submit a pull request.

License
This project is licensed under the abdultruth.

Feel free to customize this README according to your project's specific details and requirements. Good luck with your Node.js Express Ecommerce REST API!
