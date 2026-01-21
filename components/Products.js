// Products.js
// Ky modul merr një listë produktesh nga API dhe i shfaq në një container të dhënë

import axios from "../node_modules/axios/dist/esm/axios.js"

export default function Products(settings) {
    // Destructure settings me vlera default për page dhe limit
    const { api_url, container, page = 1, limit = 20 } = settings

    // Kalkulo sa produkte të anashkalohen për pagination
    const skip = (page - 1) * limit
    let html = ""

    // 🟢 Axios GET request për të marrë produktet
    axios.get(`${api_url}?limit=${limit}&skip=${skip}`)
    .then(response => {
        const products = response.data.products  // Merr array me produktet
        
        // 🟢 Loop për çdo produkt dhe krijo HTML
        for(let product of products) {
            html += `  
                <div class="bg-gray-200 rounded-md shadow-md p-2 flex flex-col hover:opacity-80 transition-shadow duration-300">
                    <div class="flex justify-center">
                        <!-- Link për produkt individual -->
                        <a href="product.html?id=${product.id}">
                            <img src="${product.images[0]}" alt="${product.title}" class="w-56 h-56 object-contain" />
                        </a>
                    </div>

                    <!-- Emri i produktit -->
                    <h2 class="text-gray-500 font-semibold text-xl mb-3">${product.title.slice(0, 16)}</h2>

                    <!-- Çmimi dhe discount -->
                    <div class="flex justify-between mb-6">
                        <p class="font-semibold text-xl">${product.price} $</p>
                        <span class="bg-red-500 text-white px-2 py-1">-${product.discountPercentage}%</span>
                    </div>
                </div>
            `
        }

        // Vendos HTML në container
        container.innerHTML = html
    })
    .catch(error => console.log(error))  // Kap çdo gabim nga axios
}
