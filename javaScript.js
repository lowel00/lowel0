document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.category-slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    function goToCategory(index) {
        sliderContainer.style.transform = `translateX(-${index * 100 / totalSlides}%)`;
        currentIndex = index;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;
    }
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - 1) {
            goToCategory(currentIndex + 1);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToCategory(currentIndex - 1);
        }
    });

    // Başlangıç durumu
    goToCategory(0);
});
