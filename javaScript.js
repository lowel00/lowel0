document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.category-slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const navLinks = document.querySelectorAll('.main-nav a');
    const homeCategoryLinks = document.querySelectorAll('.category-showcase a');
    
    // Anasayfa tıklandığında kategori vitrinine git
    const welcomeSlide = document.getElementById('home');
    if (welcomeSlide) {
        welcomeSlide.addEventListener('click', () => {
            goToCategory(1); // 1. index'teki kategori vitrinine git
        });
    }

    let currentIndex = 0;
    const totalSlides = slides.length;

    function goToCategory(index) {
        if (index < 0 || index >= totalSlides) return;
        sliderContainer.style.transform = `translateX(-${index * 100 / totalSlides}%)`;
        currentIndex = index;
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;

        // Hangi linkin aktif olacağını belirle
        navLinks.forEach((link, i) => {
            link.classList.toggle('active', i === index);
        });
        
        // ***************************************************************
        // ***** YENİ EKLENEN KOD BAŞLANGICI *****
        // ***************************************************************
        
        // Aktif olan linki bul
        const activeLink = navLinks[index];
        
        if (activeLink) {
            // scrollIntoView metodu ile aktif linki görünür alana kaydır
            activeLink.scrollIntoView({
                behavior: 'smooth',  // Animasyonlu (yumuşak) bir kaydırma için
                inline: 'center',    // Yatay olarak tam ortaya hizala
                block: 'nearest'     // Dikey hizalamayı bozma
            });
        }
        
        // ***************************************************************
        // ***** YENİ EKLENEN KOD BİTİŞİ *****
        // ***************************************************************
    }
    
    nextBtn.addEventListener('click', () => goToCategory(currentIndex + 1));
    prevBtn.addEventListener('click', () => goToCategory(currentIndex - 1));

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(link.dataset.index);
            goToCategory(index);
        });
    });

    // Kategori vitrinindeki linkler için event listener
    homeCategoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(link.dataset.index);
            goToCategory(index);
        });
    });

    // Başlangıç durumu
    goToCategory(0);
});