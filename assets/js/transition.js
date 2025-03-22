function initPageTransitions() {
    // Create transition element
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);

    // Handle all register and apply buttons
    document.querySelectorAll('.nav-btn, .apply-btn, .floating-button').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') || this.closest('a')) {
                e.preventDefault();
                const targetUrl = this.getAttribute('href') || this.closest('a').getAttribute('href');
                
                // Add loading animation to button
                this.classList.add('loading-btn');

                // Show transition
                transition.classList.add('active');

                // Navigate to new page after animation
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500);
            }
        });
    });

    // Handle back button and initial page load
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            transition.classList.remove('active');
        }
    });

    // Remove transition on page load
    window.addEventListener('load', function() {
        transition.classList.remove('active');
    });
}

// Initialize transitions
document.addEventListener('DOMContentLoaded', initPageTransitions);
