// Season Filter Functionality
const initSeasonFilter = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const collectionItems = document.querySelectorAll('.collection-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const season = btn.dataset.season;

            // Filter collections
            collectionItems.forEach(item => {
                if (season === 'all' || item.dataset.season === season) {
                    gsap.to(item, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                    item.style.display = 'block';
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.95,
                        duration: 0.6,
                        ease: "power2.out",
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
};

// Designer Spotlight Animations
const initDesignerSpotlight = () => {
    const designerCards = document.querySelectorAll('.designer-card');

    designerCards.forEach(card => {
        // Hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -20,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        // Scroll animation
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "top center",
                scrub: 1
            },
            y: 100,
            opacity: 0
        });
    });
};

// Collection Item Hover Effects
const initCollectionHover = () => {
    const collections = document.querySelectorAll('.collection-item');

    collections.forEach(collection => {
        const image = collection.querySelector('img');
        const content = collection.querySelector('.item-content');

        collection.addEventListener('mouseenter', () => {
            gsap.to(image, {
                scale: 1.1,
                duration: 0.8,
                ease: "power2.out"
            });

            gsap.to(content, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        collection.addEventListener('mouseleave', () => {
            gsap.to(image, {
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            });

            gsap.to(content, {
                y: 30,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
};

// Video handling
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.hero-video');
    
    if (video) {
        // Handle video loading error
        video.addEventListener('error', (e) => {
            console.log('Video loading error, falling back to image');
            const fallbackImg = video.querySelector('img');
            if (fallbackImg) {
                video.style.display = 'none';
                fallbackImg.style.display = 'block';
            }
        });

        // Handle play interruptions gracefully
        let playAttempt = setInterval(() => {
            video.play()
                .then(() => {
                    clearInterval(playAttempt);
                })
                .catch(error => {
                    console.log("Video autoplay prevented:", error);
                });
        }, 3000);
    }

    // Initialize all animations and interactions
    initSeasonFilter();
    initDesignerSpotlight();
    initCollectionHover();
});

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smartphone: {
        smooth: true
    },
    tablet: {
        smooth: true
    }
});

// Initialize Swiper
const swiper = new Swiper('.designer-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 1000,
    navigation: {
        nextEl: '.next-slide',
        prevEl: '.prev-slide',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 3,
        }
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animation
gsap.from('.hero-title', {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: 'power4.out'
});

gsap.from('.season-nav a', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power4.out',
    delay: 0.5
});

// Collection Stats Animation
gsap.from('.stat-item', {
    scrollTrigger: {
        trigger: '.collection-stats',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power4.out'
});

// Designer Cards Animation
gsap.from('.designer-card', {
    scrollTrigger: {
        trigger: '.designer-collections',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power4.out'
});

// VIP Section Animation
gsap.from('.vip-content', {
    scrollTrigger: {
        trigger: '.vip-access',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
});

// Smooth Scroll for Navigation
document.querySelectorAll('.season-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            scroll.scrollTo(target);
            
            // Update active state
            document.querySelectorAll('.season-nav a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Update active nav item on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.season-nav a[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.season-nav a[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
}

// Locomotive scroll instance
scroll.on('scroll', updateActiveNav);

// Update ScrollTrigger on Locomotive Scroll update
scroll.on('scroll', ScrollTrigger.update);

// Tell ScrollTrigger to use these proxy methods
ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    scroll.update();
    ScrollTrigger.refresh();
});
