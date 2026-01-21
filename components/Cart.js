// Cart.js
// This module exports the Cart component which renders the shopping cart dynamically
// It also exports a helper function `updateCart` to update cart items and re-render the cart

// Main Cart component
export default function Cart() {
    // Retrieve auth status from localStorage
    const auth_json = localStorage.getItem('auth')
    const auth = auth_json ? JSON.parse(auth_json) : null

    // Get cart items based on user login status
    let cart = []
    if(auth && auth.is_loggedIn) {
        // Logged-in user: cart stored with email key
        const cartKey = `cart_${auth.email}`
        cart = JSON.parse(localStorage.getItem(cartKey)) || []
    } else {
        // Guest user: default cart key
        cart = JSON.parse(localStorage.getItem('cart')) || []
    }

    // If cart is empty, return a styled message
    if (!cart.length) {
        return `
            <div class="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                <span class="text-4xl mb-3">🛒</span>
                <h3 class="text-lg font-semibold mb-1">Your cart is empty</h3>
                <p class="text-gray-500 mb-5">
                    Looks like you haven’t added anything yet.
                </p>
                <a 
                    href="shop.html"
                    class="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                >
                    Browse products
                </a>
            </div>
        `
    }

    // If cart has items, build the HTML table
    let total = 0
    let html = `
        <div class="max-w-full">
            <table class="min-w-full border border-gray-300 bg-white rounded-md shadow-sm">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="p-3 text-left">Image</th>
                        <th class="p-3 text-left">Product</th>
                        <th class="p-3 text-center">Qty</th>
                        <th class="p-3 text-right">Price</th>
                        <th class="p-3 text-right">Total</th>
                        <th class="hidden md:block lg:block xl:block p-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
    `

    // Render each cart item
    cart.forEach(item => {
        const itemTotal = item.price * item.qty
        total += itemTotal

        html += `
            <tr class="border-t">
                <td><img src="${item.images[0]}" class="w-16" /></td>
                <td class="p-3">${item.title.slice(0, 20)}</td>

                <td class="p-3 text-center">
                    <div class="inline-flex items-center gap-2">
                        <button data-action="dec" data-id="${item.id}" class="px-2 bg-gray-300">−</button>
                        <span class="min-w-[24px] text-center">${item.qty}</span>
                        <button data-action="inc" data-id="${item.id}" class="px-2 bg-gray-300">+</button>
                    </div>
                </td>

                <td class="p-1 text-right">${item.price} $</td>
                <td class="p-1 text-right font-semibold">${itemTotal.toFixed(2)}</td>

                <td class="hidden md:block lg:block xl:block py-5 text-center">
                    <button data-action="remove" data-id="${item.id}" class="bg-red-600 text-white rounded-lg px-2 py-1 font-semibold">
                        Remove
                    </button>
                </td>
            </tr>
        `
    })

    html += `
                </tbody>
            </table>

            <!-- Display total -->
            <div class="text-left mt-8 text-xl font-bold">
                Total: ${total.toFixed(2)} $
            </div>
        </div>

        <!-- Checkout button -->
        <div class="flex justify-end mt-6">
            <a href="checkout.html" class="bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-500 transition">Checkout</a>
        </div>
    `

    return html
}

// Helper function to update the cart
export function updateCart(cart) {
    const auth_json = localStorage.getItem('auth')
    const auth = auth_json ? JSON.parse(auth_json) : null

    if(auth && auth.is_loggedIn) {
        // Save cart per user email
        const cartKey = `cart_${auth.email}`
        localStorage.setItem(cartKey, JSON.stringify(cart))
    } else {
        // Save cart for guest
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    // Re-render the cart after update
    document.querySelector('#cart').innerHTML = Cart()
}


