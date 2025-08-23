document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.category-nav a');
    const sections = document.querySelectorAll('.category-section');

    // Yumuşak kaydırma işlevselliği
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Kullanıcı kaydırdıkça aktif linki değiştirme işlevselliği
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Önce tüm linklerden 'active' classını kaldır
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                // Sadece doğru linke 'active' classını ekle
                const activeLink = document.querySelector(`.category-nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        rootMargin: '-20% 0px -80% 0px' // Ekranın üst %20'sine giren bölümü aktif say
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});
