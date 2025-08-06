document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.category-slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const fixedHeader = document.getElementById('fixed-brand-header');
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    function goToCategory(index) {
        sliderContainer.style.transform = `translateX(-${index * 100 / totalSlides}%)`;
        currentIndex = index;
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;

        // Kategori değiştiğinde, yeni slaydın scroll pozisyonuna göre başlığın görünürlüğünü anında ayarla.
        handleScroll(); 
    }
    
    // DÜZELTİLDİ: Kaydırma olayını daha basit ve doğru yöneten fonksiyon
    function handleScroll(event) {
        // Hangi slaydın kaydırıldığını event'ten almak yerine, her zaman aktif olanı kontrol et
        const currentScrollTop = slides[currentIndex].scrollTop;
        const fadeDistance = 200;

        let newOpacity = 1 - (currentScrollTop / fadeDistance);
        
        fixedHeader.style.opacity = Math.max(0, newOpacity);
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

    // Her bir slayta kaydırma (scroll) dinleyicisi ekle
    slides.forEach(slide => {
        slide.addEventListener('scroll', handleScroll);
    });

    // Başlangıç durumu
    goToCategory(0);
});
