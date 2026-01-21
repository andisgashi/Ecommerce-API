# Ecommerce Project (Vanilla JS + Tailwind CSS + LocalStorage)

This is a **Vanilla JS e-commerce project** built with **HTML, Tailwind CSS, and LocalStorage**. There is **no real backend**; all data is stored and managed in **localStorage**.

---

## Features

- User authentication: Login & Register (with localStorage)
- Cart management for both guests and logged-in users
- Checkout functionality with order storage
- Dashboard showing all user orders
- Image slider on homepage
- Products fetched from **[DummyJSON API](https://dummyjson.com)**
- Search and product suggestions
- Fully responsive design (Desktop + Mobile)
- Dynamic Header & Footer based on user status

---

## Project Structure & Modules

### 1. `Cart.js`
- Displays the cart for guest or logged-in users
- Updates cart in localStorage
- Global function: `updateCart(cart)`

### 2. `Checkout.js`
- Generates the checkout form
- Checks user authentication
- Retrieves the cart and saves orders in localStorage
- Clears cart after checkout and redirects to dashboard

### 3. `Dashboard.js`
- Shows all orders for the logged-in user
- Displays a message if no orders exist

### 4. `Header.js`
- Builds the Header for desktop & mobile
- Shows login/logout/dashboard buttons based on user status
- Merges guest cart with user cart upon login
- Global function: `logout()`

### 5. `Footer.js`
- Builds the Footer with navigation and legal links

### 6. `Slider.js` & `slides.js`
- `slides.js`: Array of slider image URLs
- `Slider.js`: Creates the slider with prev/next buttons

### 7. `Products.js`
- Fetches and displays a list of products from the API

### 8. `Product.js`
- Fetches and displays a single product with details
- Includes "Add to Cart" form

### 9. `Suggestions.js`
- Fetches a subset of products for homepage suggestions

### 10. `Search.js`
- Searches products in the API based on a query
- Displays results dynamically

---




