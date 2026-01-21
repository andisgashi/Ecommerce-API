// Slider.js
// Ky modul krijon një slider për imazhe të ndryshme nga slides.js

import slides from '../resources/slides.js'

export default function Slider() {
    let index = 0 // 🟢 Indeksi i aktual i slide-it

    // 🟢 Timeout i përgjithshëm për të siguruar që elementi të jetë render-uar
    setTimeout(() => {
        const img = document.getElementById('sliderImage') // Imazhi kryesor
        const nextBtn = document.getElementById('nextButton') // Butoni "Next"
        const prevButton = document.getElementById('prevButton') // Butoni "Previous"

        // 🟢 Funksioni për ndryshimin e slide-it
        function changeSlides(newIndex) {
            setTimeout(() => {
                index = newIndex
                img.src = slides[index] // Ndryshon imazhin sipas indeksit
            }, 300) // Delay 300ms për tranzicion më të qetë
        }

        // 🟢 Event listener për butonin "Next"
        nextBtn.addEventListener('click', () => {
            if(index < slides.length - 1) {
                changeSlides(index + 1)
            }
        })

        // 🟢 Event listener për butonin "Previous"
        prevButton.addEventListener('click', () => {
            if(index > 0) {
                changeSlides(index - 1)
            }
        })
    });
    
    // 🟢 HTML i slider-it
    return `
        <div class="w-full relative">
            <img 
                id="sliderImage" 
                src="${slides[0]}" 
                class="w-full"
            />
            <button 
                id="prevButton" 
                class="absolute top-1/2 left-4 -translate-y-1/2 text-white px-2 py-1 bg-blue-700 rounded-full"
            >
                <i class="bi bi-chevron-left text-xl text-white"></i>
            </button>
            <button 
                id="nextButton" 
                class="absolute top-1/2 right-4 -translate-y-1/2 text-white px-2 py-1 bg-blue-700 rounded-full"
            >
                <i class="bi bi-chevron-right text-xl text-white"></i>
            </button>
        </div>
    `
}
