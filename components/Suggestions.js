// Suggestions.js
// Ky modul merr disa produkte për të sugjeruar tek përdoruesi (suggested products)

import axios from "../node_modules/axios/dist/esm/axios.js"

export default function Suggestions(settings) {
    const api_url = settings.api_url           // 🟢 URL e API-së për produktet
    const container1 = settings.container1     // 🟢 Div ku do të shfaqen produktet
    let html = ""                              // 🟢 String ku do të grumbullohet HTML-i

    // 🟢 Thirr API për të marrë produktet
    axios.get(api_url)
    .then(response => {
        // 🟢 Merr 5 produkte nga indeksi 80 deri 84 (slice)
        const products = response.data.products.slice(80, 85)

        // 🟢 Për çdo produkt krijo një card
        for(let product of products) {
            html += `  
                <div class="bg-gray-200 rounded-md shadow-md p-2 flex flex-col hover:opacity-80 transition-shadow duration-300">
                    <div class="flex justify-center w-full mb-8">
                        <a href="shop.html">
                            <img src="${product.images[0]}" alt="${product.title}" class="w-64 h-64 object-contain" />
                        </a>
                    </div>
                    <h2 class="text-gray-500 font-semibold text-xl mb-3">${product.title.slice(0, 20)}</h2>
                    <div class="flex justify-between mb-6">
                        <p class="font-semibold text-xl">${product.price} $</p>
                        <span class="bg-red-500 text-white px-2 py-1">-${product.discountPercentage}%</span>
                    </div>
                </div>
            `
        }

        // 🟢 Shfaq HTML-in në container
        container1.innerHTML = html
    })
    .catch(e => console.log(e)) // 🟢 Log për gabimet
}
