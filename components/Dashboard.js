// Dashboard.js
// This module displays the user's orders on the dashboard page

export default function Dashboard() {

    // Get auth info from localStorage
    const auth_json = localStorage.getItem('auth')
    const auth = auth_json ? JSON.parse(auth_json) : null

    // If user is not logged in, show message
    if (!auth || !auth.is_loggedIn) {
        document.querySelector('.orders').innerHTML = "<p>Please login first!</p>"
    } else {
        // Retrieve user's orders from localStorage
        const ordersKey = `orders_${auth.email}`
        const orders_json = localStorage.getItem(ordersKey)
        const orders = orders_json ? JSON.parse(orders_json) : []

        // If no orders exist, show empty message
        if(orders.length === 0) {
            document.querySelector('.orders').innerHTML = `
                <div class="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <span class="text-5xl mb-4">📦</span>
                    <h3 class="text-xl font-semibold mb-2">No orders yet</h3>
                    <p class="text-gray-500 mb-6">
                        You haven’t placed any orders yet.
                    </p>
                    <a 
                        href="shop.html"
                        class="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                    >
                        Start shopping
                    </a>
                </div>
            `
        } else {
            // Build HTML table for orders
            let html = `<table class="w-full border border-gray-300">
                <tr class="bg-gray-100">
                    <th class="p-3 text-left">Name</th>
                    <th class="p-3 text-left">Address</th>
                    <th class="p-3 text-left">Items</th>
                    <th class="p-3 text-left">Payment</th>
                </tr>
            `

            for (let order of orders) {

                // Badge for payment type
                const paymentBadge =
                    order.info.payment === 'card'
                    ? `<span class="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700">
                            💳 Card
                       </span>`
                    : `<span class="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                            💵 Cash
                       </span>`

                // Append each order as table row
                html += `
                    <tr class="border-b border-gray-300">
                        <td class="p-3">${order.info.name} ${order.info.surname}</td>
                        <td class="p-3">${order.info.address}, ${order.info.city}</td>
                        <td class="p-3">${order.items.length}</td>
                        <td class="p-3">${paymentBadge}</td>
                    </tr>
                `
            }

            html += `</table>`
            document.querySelector('.orders').innerHTML = html
        }
    }
}

