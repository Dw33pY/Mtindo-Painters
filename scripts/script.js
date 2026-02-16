// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Color Palette Interactive Feature
    const colorSamples = document.querySelectorAll('.color-sample, .small-color');
    const wallColor = document.getElementById('wallColor');
    const currentColorName = document.getElementById('currentColorName');
    const currentColorHex = document.getElementById('currentColorHex');
    
    colorSamples.forEach(sample => {
        sample.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            const colorName = this.getAttribute('data-name') || 
                             this.querySelector('.color-name').textContent;
            
            wallColor.style.backgroundColor = color;
            currentColorName.textContent = colorName;
            currentColorHex.textContent = color;
            
            // Add active class to selected color
            colorSamples.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Form Submission Handler
    const quoteForm = document.getElementById('quoteForm');
    
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const service = formData.get('service');
        
        // Create WhatsApp message
        const serviceText = {
            'interior': 'Interior Painting',
            'exterior': 'Exterior Painting',
            'texture': 'Textured Finishes',
            'repair': 'Wall Leak Solutions',
            'apartment': 'Apartment Maintenance',
            'other': 'Other Service'
        }[service] || service;
        
        const message = `Hello Mtindo Painters!%0A%0AI would like to request a quote:%0A%0AName: ${name}%0APhone: ${phone}%0AService: ${serviceText}%0A%0AAdditional Details: ${formData.get('message') || 'None'}`;
        
        // Open WhatsApp with pre-filled message (UPDATED NUMBER)
        window.open(`https://wa.me/254797751895?text=${message}`, '_blank');
        
        // Reset form
        quoteForm.reset();
        
        // Show success message (could be enhanced with a modal or toast)
        alert('Thank you! Your quote request has been submitted. You will be redirected to WhatsApp to complete your request.');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) navLink.classList.add('active');
            } else {
                if (navLink) navLink.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Lazy load images (placeholder for actual implementation)
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});
