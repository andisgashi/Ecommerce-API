// Footer.js
// This module returns the HTML for the footer section used on all pages

export default function Footer() {
    return `
        <footer class="bg-gray-800 px-12 py-12">
            
            <!-- Top navigation links -->
            <div class="text-center mb-5"> 
                <a href="index.html" class="text-gray-200 me-4 text-sm hover:text-blue-600">Home</a>
                <a href="index.html" class="text-gray-200 me-4 text-sm hover:text-blue-600">Shop</a>
                <a href="index.html" class="text-gray-200 text-sm hover:text-blue-600">My Cart</a>
            </div>

            <!-- Secondary links / Legal and support -->
            <div class="text-center mb-5">
                <a href="index.html" class="text-gray-500 me-4 text-sm hover:text-blue-600">Help Center & Contact Us</a>
                <a href="index.html" class="text-gray-500 text-sm hover:text-blue-600">Activate Your Device</a>
                <a href="index.html" class="text-gray-500 me-4 text-sm hover:text-blue-600">Legal Notices</a>
                <a href="index.html" class="text-gray-500 me-4 text-sm hover:text-blue-600">Privacy Policy</a>
                <a href="index.html" class="text-gray-500 me-4 text-sm hover:text-blue-600">Terms of Use</a>
            </div>

            <!-- Privacy / Ads and personal info links -->
            <div class="text-center mb-5"> 
                <a href="index.html" class="text-gray-500 me-4 text-sm hover:text-blue-600">Interest-Based Ads</a>
                <a href="index.html" class="text-gray-500 me-4 text-sm hover:text-blue-600">Your US State Privacy Rights</a>
                <a href="index.html" class="text-gray-500 me-4 text-sm hover:text-blue-600">Do Not Sell or Share My Personal Information</a>
                <a href="index.html" class="text-gray-500 text-sm hover:text-blue-600">Closed Captioning Inquiries</a>
            </div>

            <!-- Separator line -->
            <hr class="mb-3">

            <!-- Copyright text -->
            <p class="text-gray-100 text-center">© 2026 Ecommerce 
                <span class="text-blue-600">All Rights Reserved.</span>
            </p>
        </footer>
    `
}
