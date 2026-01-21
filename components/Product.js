// Product.js
// Ky modul merr produktin nga API dhe e shfaq në një container të dhënë

import axios from "../node_modules/axios/dist/esm/axios.js"

// 🟢 Funksioni async për të marrë një produkt sipas ID-së
async function getProduct(id) {
    const api_url = `https://dummyjson.com/products/${id}`
    const response = await axios(api_url)
    return await response.data   // Kthe objektin e produktit
}

export default function Product(settings) {
    // Merr produktin me ID nga settings
    getProduct(settings.id)
    .then(response => {
        const product = response
        let html = ""

        // 🟢 HTML për produktin
        html += `
            <img src=${product.images[0]} class="w-96" />
            <div>
               <h2 class="font-semibold text-2xl mb-6">${product.title}</h2>
               <p class="text-gray-600">${product.description}</p>

               <!-- Table me info të produktit -->
                <div class="overflow-hidden w-3/4 rounded-lg border border-gray-400 bg-gray-300 shadow-sm mt-10">
                    <table class="w-full text-sm">
                        <tbody>
                            <tr class="border-b">
                                <td class="px-4 py-3 text-gray-500">Rating</td>
                                <td class="px-4 py-3 font-semibold text-gray-800">
                                    ⭐ ${product.rating}
                                </td>
                            </tr>

                            <tr class="border-b bg-gray-200">
                                <td class="px-4 py-3 text-gray-500">Brand</td>
                                <td class="px-4 py-3 font-semibold capitalize text-gray-800">
                                    ${product.brand}
                                </td>
                            </tr>

                            <tr>
                                <td class="px-4 py-3 text-gray-500">Stock</td>
                                <td class="px-4 py-3 font-semibold text-gray-800">
                                    ${product.stock > 0 
                                        ? `<span class="text-green-600">In Stock</span>` 
                                        : `<span class="text-red-600">Out of Stock</span>`
                                    }            
                                </td>
                            </tr>

                            <tr class="border-b bg-gray-200">
                                <td class="px-4 py-3 text-gray-500">Price</td>
                                <td class="px-4 py-3 font-semibold capitalize text-gray-800">
                                    ${product.price} $
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Form për shtimin e produktit në cart -->
                <form action="#" class="mt-10">
                    <input type="number" min="1" value="1" class="py-1 me-4 border border-gray-400 w-12 text-center" />
                    <!-- Produkti i koduar si hidden input për t'u dërguar në cart -->
                    <input type="hidden" value="${encodeURIComponent(JSON.stringify(product, null))}" />
                    <button type="submit" class="bg-gray-500 text-white hover:bg-gray-400 font-bold py-1 px-3 rounded">Add To Cart</button>
                </form>
            </div>
        `
        // Vendos HTML në container-in që është dhënë nga settings
        settings.container.innerHTML = html
    })
    .catch(e => console.log(e))  // Kap gabimet nga axios
}
