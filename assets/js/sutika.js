document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Navigation toggle
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if(navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Header scroll class
    function scrollHeader() {
        const header = document.getElementById('header');
        if(this.scrollY >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    }
    window.addEventListener('scroll', scrollHeader);

    // View More functionality
    const viewMoreBtn = document.querySelector('.view-more-btn');
    const hiddenModules = document.querySelectorAll('.hidden-module');

    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            hiddenModules.forEach(module => {
                module.classList.toggle('show');
            });
            this.textContent = this.classList.contains('active') ? 'View Less' : 'View More';
        });
    }

    // Add animation end handler
    hiddenModules.forEach(module => {
        module.addEventListener('transitionend', function(e) {
            if (!isExpanded && e.propertyName === 'opacity') {
                module.style.display = 'none';
            }
        });
    });

    // Stat counter animation
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const updateNumber = () => {
                if (current < target) {
                    current += step;
                    if (current > target) current = target;
                    stat.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateNumber);
                }
            };

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateNumber();
                    observer.disconnect();
                }
            });

            observer.observe(stat);
        });
    }

    // Initialize animations when DOM is loaded
    animateStats();

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('.lazy-image');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Form validation and submission
    const applyForm = document.querySelector('.apply-form');
    if (applyForm) {
        applyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form validation and submission logic here
            console.log('Form submitted');
        });
    }

    // Add sticky header behavior
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        lastScroll = currentScroll;
    });
});
