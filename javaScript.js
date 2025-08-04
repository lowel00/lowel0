document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.category-slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Kategoriye gitme fonksiyonu
    function goToCategory(index) {
        // Slider'ı doğru konuma kaydır
        sliderContainer.style.transform = `translateX(-${index * 100 / totalSlides}%)`;
        currentIndex = index;
        updateNavigation();
    }
    
    // Navigasyon elemanlarını güncelleme fonksiyonu (oklar ve menü linkleri)
    function updateNavigation() {
        // Okların durumunu güncelle
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;

        // Üst menüdeki aktif linki güncelle
        navLinks.forEach((link, index) => {
            link.classList.toggle('active', index === currentIndex);
        });
    }

    // Olay Dinleyicileri
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

    // Üst menü linklerine tıklama olayı ekle
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Sayfanın başına gitmesini engelle
            const index = parseInt(e.target.dataset.index, 10);
            goToCategory(index);
        });
    });

    // Başlangıç durumu
    goToCategory(0);
});