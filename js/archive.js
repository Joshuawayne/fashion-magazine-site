// Archive Page Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Timeline Navigation
    const decades = document.querySelectorAll('.decade');
    const decadeSections = document.querySelectorAll('.decade-section');

    decades.forEach(decade => {
        decade.addEventListener('click', () => {
            const targetYear = decade.dataset.year;
            const targetSection = document.querySelector(`[data-decade="${targetYear}"]`);
            
            // Update active states
            decades.forEach(d => d.classList.remove('active'));
            decade.classList.add('active');
            
            // Smooth scroll to section
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Parallax Effect for Hero Image
    gsap.to('.archive-hero .hero-media img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.archive-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Text Reveal Animations
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.from(text, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: text,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Image Reveal Animations
    gsap.utils.toArray('.reveal-image').forEach(image => {
        gsap.from(image, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: image,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Timeline Animations
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        
        gsap.from(item, {
            x: 100 * direction,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Decade Section Transitions
    decadeSections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            onEnter: () => {
                const year = section.dataset.decade;
                decades.forEach(d => {
                    if (d.dataset.year === year) {
                        d.classList.add('active');
                    } else {
                        d.classList.remove('active');
                    }
                });
            }
        });
    });

    // Smooth Image Loading
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => {
                    img.classList.add('loaded');
                };
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));

    // Cursor Animation
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    gsap.to({}, 0.016, {
        repeat: -1,
        onRepeat: () => {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;
            
            gsap.set(follower, {
                css: {
                    left: posX - 12,
                    top: posY - 12
                }
            });
            
            gsap.set(cursor, {
                css: {
                    left: mouseX,
                    top: mouseY
                }
            });
        }
    });

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Hover Effects
    const hoverItems = document.querySelectorAll('.archive-item, .moment-item, .decade');
    
    hoverItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });
});
