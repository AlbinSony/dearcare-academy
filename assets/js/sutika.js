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
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const hiddenModules = document.querySelectorAll('.hidden-module');
    let isExpanded = false;

    if (viewMoreBtn && hiddenModules.length > 0) {
        viewMoreBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            hiddenModules.forEach(module => {
                if(isExpanded) {
                    module.style.display = 'block';
                    // Use setTimeout to trigger transition after display change
                    setTimeout(() => {
                        module.classList.add('show');
                    }, 10);
                } else {
                    module.classList.remove('show');
                    // Wait for transition to complete before hiding
                    setTimeout(() => {
                        module.style.display = 'none';
                    }, 400);
                }
            });

            // Update button text and icon
            viewMoreBtn.innerHTML = isExpanded ? 
                'Show Less <i class="fas fa-chevron-up"></i>' : 
                'View More Modules <i class="fas fa-chevron-down"></i>';
            
            viewMoreBtn.classList.toggle('active');

            // Smooth scroll to new content if expanding
            if(isExpanded) {
                const firstHiddenModule = hiddenModules[0];
                firstHiddenModule.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
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
});
