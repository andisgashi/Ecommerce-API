// Header.js
// This module returns the HTML for the header, including navigation, cart count, and auth links

export default function Header() {

    // 🟢 Get auth info from localStorage
    const auth_json = localStorage.getItem('auth')
    const auth = auth_json ? JSON.parse(auth_json) : null

    let cart = []

    // 🟢 Merge carts if user is logged in
    if(auth && auth.is_loggedIn) {
        const cartKey = `cart_${auth.email}`
        const userCart = JSON.parse(localStorage.getItem(cartKey)) || []
        const guestCart = JSON.parse(localStorage.getItem('cart')) || []

        // Merge guest cart into user cart
        const mergedCart = [...userCart]
        guestCart.forEach(gc => {
            const exists = mergedCart.find(item => item.id == gc.id)
            if(exists) exists.qty += gc.qty
            else mergedCart.push(gc)
        })

        cart = mergedCart

        // Save merged cart and remove guest cart
        localStorage.setItem(cartKey, JSON.stringify(cart))
        localStorage.removeItem('cart')
    } else {
        cart = JSON.parse(localStorage.getItem('cart')) || []
    }

    // 🟢 Calculate total items for cart badge
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

    // 🟢 Desktop Auth Links
    const desktopAuthHtml = auth && auth.is_loggedIn
        ? `
        <div class="hidden md:flex items-center space-x-4">
            <a href="dashboard.html" class="text-white hover:text-blue-400">Dashboard</a>
            <button onclick="logout()" class="text-white px-3 py-1 bg-red-600 rounded hover:bg-red-400">Logout</button>
        </div>
        `
        : `
        <ul class="hidden md:flex items-center space-x-6">
            <li><a href="login.html" class="text-white hover:text-blue-400">Sign in</a></li>
            <li><a href="register.html" class="bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-400">Sign up</a></li>
        </ul>
        `

    return `
    <header class="bg-gray-700">
        <div class="container mx-auto px-8 md:px-10 lg:px-24 py-6 flex items-center justify-between">
            <h2 class="text-xl md:text-2xl text-white font-semibold">Ecommerce</h2>

            <!-- Desktop Menu -->
            <ul class="hidden md:flex items-center text-white space-x-10">
                <li><a href="index.html" class="header-link pb-1 border-b-2 border-transparent hover:border-blue-400 text-xl">Home</a></li>
                <li><a href="shop.html" class="header-link pb-1 border-b-2 border-transparent hover:border-blue-400 text-xl">Shop</a></li>
                <li class="relative">
                    <a href="cart.html" class="header-link pb-1 border-b-2 border-transparent hover:border-blue-400 text-xl">
                        My Cart
                        <span class="absolute -top-1 -right-5 w-5 h-5 bg-red-600 text-white text-xs flex items-center justify-center rounded-full">
                            ${cartCount}  <!-- Cart badge -->
                        </span>
                    </a>
                </li>
            </ul>

            <!-- Desktop Auth Links -->
            ${desktopAuthHtml}

            <!-- Mobile Menu Button -->
            <button id="menuBtn" class="md:hidden text-white text-2xl">
                <i class="bi bi-list"></i>
            </button>
        </div>

        <!-- Mobile Menu -->
        <div id="mobileMenu" class="fixed inset-0 bg-zinc-900 z-50 hidden">
            <div class="flex justify-between items-center px-6 py-4">
                <h2 class="text-xl text-white font-semibold">Ecommerce</h2>
                <button id="closeBtn" class="text-white text-2xl">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>

            <!-- Mobile Navigation Links -->
            <ul class="flex flex-col items-center gap-6 text-white mt-10">
                <li><a href="index.html" class="mobile-link hover:border-b-2 hover:border-blue-400 pb-1">Home</a></li>
                <li><a href="shop.html" class="mobile-link hover:border-b-2 hover:border-blue-400 pb-1">Shop</a></li>
                <li class="relative">
                    <a href="cart.html" class="header-link pb-1 border-b-2 border-transparent hover:border-blue-400">
                        My Cart (${cartCount})
                    </a>
                </li>
                ${auth && auth.is_loggedIn
                    ? `<li><a href="dashboard.html" class="mobile-link hover:border-b-2 hover:border-blue-400 pb-1">Dashboard</a></li>
                       <li><button onclick="logout()" class="bg-red-600 px-6 py-2 rounded hover:bg-red-400">Logout</button></li>`
                    : `<li><a href="login.html" class="mobile-link hover:border-b-2 hover:border-blue-400 pb-1">Sign in</a></li>
                       <li><a href="register.html" class="bg-blue-600 px-6 py-2 rounded hover:bg-blue-400">Sign up</a></li>`}
            </ul>
        </div>
    </header>
    `
}

// 🟢 Global logout function
window.logout = function() {
    localStorage.removeItem('auth')
    window.location.href = "index.html"
}






