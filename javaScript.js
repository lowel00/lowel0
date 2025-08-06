document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.category-slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    // YENİ: Sabit başlığı seçiyoruz
    const fixedHeader = document.getElementById('fixed-brand-header');
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    function goToCategory(index) {
        // Slider'ı doğru konuma kaydır
        sliderContainer.style.transform = `translateX(-${index * 100 / totalSlides}%)`;
        currentIndex = index;
        
        // Okların durumunu güncelle
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;

        // YENİ: Kategori değiştiğinde, yeni sayfanın kaydırma pozisyonuna göre
        // başlığın saydamlığını anında ayarla.
        updateHeaderOpacity();
    }
    
    // YENİ: Başlığın saydamlığını güncelleyen fonksiyon
    function updateHeaderOpacity() {
        // Sadece aktif olan slaydın kaydırma pozisyonunu al
        const currentScrollTop = slides[currentIndex].scrollTop;
        const fadeDistance = 200; // 200 piksel kaydırınca tamamen yok olacak

        // Yeni saydamlığı hesapla (1'den 0'a doğru)
        let newOpacity = 1 - (currentScrollTop / fadeDistance);
        
        // Saydamlığın 0'ın altına düşmesini engelle
        fixedHeader.style.opacity = Math.max(0, newOpacity);
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

    // YENİ: Her bir slayta kaydırma (scroll) dinleyicisi ekle
    slides.forEach(slide => {
        slide.addEventListener('scroll', updateHeaderOpacity);
    });

    // Başlangıç durumu
    goToCategory(0);
});
