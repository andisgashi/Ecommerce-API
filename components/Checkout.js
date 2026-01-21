// Checkout.js
// This module initializes the checkout form and handles order submission

export default function initCheckout() {
    // Check user authentication
    const auth_json = localStorage.getItem('auth')
    const auth = auth_json ? JSON.parse(auth_json) : null

    if (!auth || !auth.is_loggedIn) {
        alert("You must be logged in to checkout!")
        window.location.href = "login.html"
        return
    }

    const container = document.getElementById('checkoutFormContainer')
    if (!container) return

    // Get the user's cart, fallback to guest cart if user cart is empty
    const cartKey = `cart_${auth.email}`
    const cart_json = localStorage.getItem(cartKey) || localStorage.getItem('cart')
    const cart = cart_json ? JSON.parse(cart_json) : []

    // If cart is empty, show message
    if (cart.length === 0) {
        container.innerHTML = `<p class="text-center text-red-600">Your cart is empty!</p>`
        return
    }

    // Build checkout form HTML
    container.innerHTML = `
        <form id="checkoutForm" class="max-w-lg mx-auto bg-gray-100 p-6 rounded-md shadow-md space-y-4">
            <div>
                <label class="block mb-1 font-semibold">First Name</label>
                <input type="text" name="firstName" class="w-full p-2 border border-gray-300 rounded" required>
            </div>
            <div>
                <label class="block mb-1 font-semibold">Last Name</label>
                <input type="text" name="lastName" class="w-full p-2 border border-gray-300 rounded" required>
            </div>
            <div>
                <label class="block mb-1 font-semibold">Address</label>
                <input type="text" name="address" class="w-full p-2 border border-gray-300 rounded" required>
            </div>
            <div>
                <label class="block mb-1 font-semibold">City</label>
                <input type="text" name="city" class="w-full p-2 border border-gray-300 rounded" required>
            </div>
            <div class="space-y-2">
                <label class="block font-semibold">Payment Method</label>
                <label class="inline-flex items-center gap-2">
                    <input type="radio" name="payment" value="card" required> Card
                </label>
                <label class="inline-flex items-center gap-2">
                    <input type="radio" name="payment" value="cash" required> Cash
                </label>
            </div>
            <div class="text-center">
                <button type="submit" class="mt-8 w-60 bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-500">Place Order</button>
            </div>
        </form>
    `

    // Handle form submission
    const form = document.getElementById('checkoutForm')
    form.addEventListener('submit', e => {
        e.preventDefault()

        // Get form values
        const formData = new FormData(form)
        const firstName = formData.get('firstName')
        const lastName = formData.get('lastName')
        const address = formData.get('address')
        const city = formData.get('city')
        const payment = formData.get('payment')

        // Validate payment selection
        if (!payment) {
            alert("Select a payment method!")
            return
        }

        // Create new order object
        const newOrder = {
            info: {
                name: firstName,
                surname: lastName,
                address,
                city,
                payment
            },
            items: cart
        }
        console.log(newOrder) // for debugging

        // Save order in localStorage under user's email
        const ordersKey = `orders_${auth.email}`
        const orders_json = localStorage.getItem(ordersKey)
        const orders = orders_json ? JSON.parse(orders_json) : []
        orders.push(newOrder)
        localStorage.setItem(ordersKey, JSON.stringify(orders))

        // Empty the cart after placing order
        localStorage.setItem(cartKey, JSON.stringify([]))

        alert("Order placed successfully!")
        window.location.href = "dashboard.html"
    })
}



