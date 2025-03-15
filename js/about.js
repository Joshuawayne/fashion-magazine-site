// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Split text animation setup
    const splitText = document.querySelector('.split-text');
    if (splitText) {
        const text = splitText.textContent;
        splitText.textContent = '';
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(50px)';
            span.style.display = 'inline-block';
            splitText.appendChild(span);

            gsap.to(span, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: i * 0.05,
                ease: "power2.out"
            });
        });
    }

    // Parallax effect for hero image
    gsap.to('.parallax-image', {
        scrollTrigger: {
            trigger: '.about-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
        ease: 'none'
    });

    // Reveal text animation
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Fade up animation for cards and team members
    gsap.utils.toArray('.fade-up').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Image reveal animation
    gsap.utils.toArray('.image-reveal').forEach(image => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: image,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });

        tl.from(image, {
            clipPath: 'inset(100% 0 0 0)',
            duration: 1.2,
            ease: 'power4.out'
        });
    });

    // Parallax quote section
    gsap.to('.parallax-quote', {
        scrollTrigger: {
            trigger: '.quote-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        backgroundPosition: '50% 100%',
        ease: 'none'
    });

    // Navigation header animation
    const header = document.querySelector('.main-header');
    gsap.to(header, {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: 'power2.inOut'
            });
        }
    });
});
