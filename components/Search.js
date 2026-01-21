// fetchProducts.js
// Ky modul bën kërkim të produkteve sipas query dhe i shfaq në një container të dhënë

import axios from "../node_modules/axios/dist/esm/axios.js";

export function fetchProducts(container, query) {
    // Vlera default për pagination
    const limit = 20
    const skip = 0

    // Krijo URL për API-në e kërkimit, kodon query për siguri
    const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`;

    // 🟢 Axios GET request
    axios.get(url)
    .then(response => {
        const products = response.data.products // Merr array me produktet

        // 🟢 Nëse nuk ka produkte, shfaq mesazh
        if (products.length === 0) {
            container.innerHTML = "<p class='text-white col-span-5 text-center text-3xl'>No products found</p>"
            return
        }

        let html = ""

        // 🟢 Loop për çdo produkt dhe krijo HTML
        for (let product of products) {
            html += `
                <div class="bg-gray-200 rounded-md shadow-md p-2 flex flex-col hover:opacity-80 transition-shadow duration-300">
                    <div class="flex justify-center w-full mb-8">
                        <a href="shop.html">
                            <img src="${product.images[0]}" alt="${product.title}" class="w-64 h-64 object-contain" />
                        </a>
                    </div>

                    <!-- Emri i produktit -->
                    <h2 class="text-gray-500 font-semibold text-xl mb-3">${product.title.slice(0, 20)}</h2>

                    <!-- Çmimi dhe discount -->
                    <div class="flex justify-between mb-6">
                        <p class="font-semibold text-xl">${product.price} $</p>
                        <span class="bg-red-500 text-white px-2 py-1">-${product.discountPercentage}%</span>
                    </div>
                </div>
            `
        }

        // 🟢 Vendos HTML në container
        container.innerHTML = html;
    })
    // 🟢 Kap gabimet dhe shfaq mesazh
    .catch(err => {
            console.error(err);
            container.innerHTML = "<p class='text-white col-span-5 text-center'>Error fetching products</p>";
    });
}





