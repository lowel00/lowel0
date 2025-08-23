document.addEventListener('DOMContentLoaded', () => {
    // Üst navigasyon menüsü için kod
    const navLinks = document.querySelectorAll('.category-nav a');
    const sections = document.querySelectorAll('.category-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // İlgili bölüme yumuşak bir şekilde kaydır
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // --- YENİ: Tıklandığında kapalıysa kategoriyi aç ---
                // Kaydırılan bölümün içindeki kategori başlığını bul
                const targetHeader = targetSection.querySelector('.category-title');

                // Eğer o başlık 'active' değilse (yani kapalıysa)
                if (targetHeader && !targetHeader.classList.contains('active')) {
                    // Açılması için onu programatik olarak "tıkla"
                    targetHeader.click();
                }
                // --- YENİ KOD BİTTİ ---
            }
        });
    });

    // Kullanıcı kaydırdıkça aktif linki değiştirme kodu (değişiklik yok)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                const activeLink = document.querySelector(`.category-nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, { rootMargin: '-20% 0px -80% 0px' });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Akordeon Menü Mantığı (değişiklik yok)
    const accordionHeaders = document.querySelectorAll('.category-title');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    });
});
