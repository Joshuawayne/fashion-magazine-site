// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    lerp: 0.1
});

// Update ScrollTrigger on scroll
scroll.on('scroll', ScrollTrigger.update);

// Update ScrollTrigger when Locomotive Scroll updates
ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value) : scroll.scroll.instance.scroll.y;
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

// Custom Cursor (inherited from main.js)
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    
    gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
    });
});

// Countdown Timer
const updateCountdown = () => {
    const countdowns = document.querySelectorAll('.countdown');
    
    countdowns.forEach(countdown => {
        const endDate = new Date(countdown.dataset.time).getTime();
        const now = new Date().getTime();
        const timeLeft = endDate - now;

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdown.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    });
};

setInterval(updateCountdown, 1000);
updateCountdown();

// Hero Section Animations
const initHeroAnimations = () => {
    const heroVideo = document.querySelector('.hero-background video');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (heroVideo && heroTitle && heroSubtitle) {
        // Parallax effect on video
        gsap.to(heroVideo, {
            scrollTrigger: {
                trigger: '.runway-hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            scale: 1.2
        });
    }
};

// Show Grid Animations
const initShowGrid = () => {
    const showCards = document.querySelectorAll('.show-card');
    
    showCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'top center',
                scrub: 1
            },
            y: 100,
            opacity: 0
        });
    });
};

// Collection Preview Animations
const initCollectionPreview = () => {
    const previewContent = document.querySelector('.preview-content');
    const previewImage = document.querySelector('.preview-image');

    if (previewContent && previewImage) {
        gsap.from(previewContent.children, {
            scrollTrigger: {
                trigger: previewContent,
                start: 'top 80%',
                end: 'bottom center',
                scrub: 1
            },
            y: 50,
            opacity: 0,
            stagger: 0.2
        });

        gsap.from(previewImage, {
            scrollTrigger: {
                trigger: previewImage,
                start: 'top 80%',
                end: 'bottom center',
                scrub: 1
            },
            x: 100,
            opacity: 0
        });
    }
};

// Season Navigation
const initSeasonNav = () => {
    const seasonDots = document.querySelectorAll('.season-dot');
    const showCards = document.querySelectorAll('.show-card');

    seasonDots.forEach(dot => {
        dot.addEventListener('click', () => {
            // Remove active class from all dots
            seasonDots.forEach(d => d.classList.remove('active'));
            // Add active class to clicked dot
            dot.classList.add('active');

            const season = dot.dataset.season;
            
            // Filter shows based on season
            showCards.forEach(card => {
                if (season === 'all' || card.dataset.season === season) {
                    gsap.to(card, {
                        opacity: 1,
                        duration: 0.5,
                        y: 0
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0.3,
                        duration: 0.5,
                        y: 30
                    });
                }
            });
        });
    });
};

// Initialize Swiper for Behind The Scenes
const initScenesSlider = () => {
    new Swiper('.scenes-slider', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        speed: 1000,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
};

// Smooth Scroll to Sections
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                scroll.scrollTo(target);
            }
        });
    });
};

// Collection Showcase Navigation
const initShowcaseNav = () => {
    const grid = document.querySelector('.showcase-grid');
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');
    
    if (grid && prevBtn && nextBtn) {
        let scrollAmount = 0;
        const maxScroll = grid.scrollWidth - grid.clientWidth;
        
        prevBtn.addEventListener('click', () => {
            scrollAmount = Math.max(scrollAmount - 400, 0);
            gsap.to(grid, {
                scrollLeft: scrollAmount,
                duration: 0.8,
                ease: "power2.inOut"
            });
        });
        
        nextBtn.addEventListener('click', () => {
            scrollAmount = Math.min(scrollAmount + 400, maxScroll);
            gsap.to(grid, {
                scrollLeft: scrollAmount,
                duration: 0.8,
                ease: "power2.inOut"
            });
        });
    }
};

// Scroll Animations
const initScrollAnimations = () => {
    // Animate showcase items
    gsap.utils.toArray('.showcase-item').forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "top center",
                scrub: 1
            },
            y: 100,
            opacity: 0
        });
    });

    // Animate exclusive access section
    const accessSection = document.querySelector('.exclusive-access');
    if (accessSection) {
        gsap.from('.access-content', {
            scrollTrigger: {
                trigger: accessSection,
                start: "top center",
                end: "top top",
                scrub: 1
            },
            y: 50,
            opacity: 0
        });

        gsap.from('.feature', {
            scrollTrigger: {
                trigger: accessSection,
                start: "top center",
                end: "top top",
            },
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8
        });
    }
};

// Season Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const seasonItems = document.querySelectorAll('.season-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter season items
            const filter = button.dataset.filter;
            
            gsap.to(seasonItems, {
                opacity: 0,
                y: 30,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                onComplete: () => {
                    seasonItems.forEach(item => {
                        if (filter === 'all' || item.dataset.season === filter) {
                            item.style.display = 'block';
                            gsap.to(item, {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                ease: 'power2.out'
                            });
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });

    // Initialize GSAP animations
    gsap.utils.toArray('.season-item').forEach(item => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Smooth hover transitions
    seasonItems.forEach(item => {
        const image = item.querySelector('img');
        const overlay = item.querySelector('.season-overlay');
        const meta = item.querySelector('.season-meta');

        item.addEventListener('mouseenter', () => {
            gsap.to(image, {
                scale: 1.1,
                duration: 1.2,
                ease: 'power2.out'
            });
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            });
            gsap.to(meta, {
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                delay: 0.1
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(image, {
                scale: 1,
                duration: 1.2,
                ease: 'power2.out'
            });
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
            gsap.to(meta, {
                y: 20,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    });

    // Initialize all animations and interactions
    initHeroAnimations();
    initShowGrid();
    initCollectionPreview();
    initSeasonNav();
    initScenesSlider();
    initSmoothScroll();
    initShowcaseNav();
    initScrollAnimations();

    // Update ScrollTrigger after everything is set up
    ScrollTrigger.refresh();
});

// Season Grid Animations
const initSeasonAnimations = () => {
    const seasonItems = document.querySelectorAll('.season-item');
    const revealTexts = document.querySelectorAll('.reveal-text');
    const revealImages = document.querySelectorAll('.reveal-image');

    // Animate reveal texts
    revealTexts.forEach(text => {
        gsap.fromTo(text,
            { opacity: 0, y: 30 },
            {
                scrollTrigger: {
                    trigger: text,
                    start: 'top 85%'
                },
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            }
        );
    });

    // Animate reveal images
    revealImages.forEach(image => {
        gsap.fromTo(image,
            { opacity: 0, y: 50 },
            {
                scrollTrigger: {
                    trigger: image,
                    start: 'top 85%'
                },
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out'
            }
        );
    });
};

// Glass Card Animations
const initGlassCards = () => {
    const glassItems = document.querySelectorAll('.glass-item');

    glassItems.forEach(item => {
        // Initial animation on scroll
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            }
        });

        // Hover animations
        const overlay = item.querySelector('.glass-overlay');
        const content = item.querySelector('.glass-content');
        const image = item.querySelector('img');

        item.addEventListener('mouseenter', () => {
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out'
            });

            gsap.to(content, {
                y: 0,
                duration: 0.4,
                delay: 0.1,
                ease: 'power2.out'
            });

            gsap.to(image, {
                scale: 1.1,
                duration: 1.2,
                ease: 'power2.out'
            });

            // Add shimmer effect
            gsap.fromTo(item.querySelector('.glass-card::before'),
                {
                    left: '-100%'
                },
                {
                    left: '100%',
                    duration: 1.5,
                    ease: 'power2.inOut'
                }
            );
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.out'
            });

            gsap.to(content, {
                y: 20,
                duration: 0.4,
                ease: 'power2.out'
            });

            gsap.to(image, {
                scale: 1,
                duration: 1.2,
                ease: 'power2.out'
            });
        });
    });
};

// Initialize glass cards
initGlassCards();

// Runway Video Parallax and Animations
const initRunwayVideo = () => {
    const videoContainer = document.querySelector('.parallax-video');
    const video = videoContainer?.querySelector('video');
    const runwayContent = document.querySelector('.runway-content');

    if (videoContainer && video) {
        gsap.to(video, {
            scrollTrigger: {
                trigger: videoContainer,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: '20%',
            scale: 1.1
        });

        if (runwayContent) {
            gsap.fromTo(runwayContent,
                { opacity: 0, y: 30 },
                {
                    scrollTrigger: {
                        trigger: runwayContent,
                        start: 'top 80%'
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power3.out'
                }
            );
        }
    }
};

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize animations
    initHeroAnimations();
    initSeasonAnimations();
    initRunwayVideo();
});

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations and components
    initHeroAnimations();
    initShowGrid();
    initCollectionPreview();
    initSeasonNav();
    initScenesSlider();
    initSmoothScroll();
    
    // Handle scroll updates
    ScrollTrigger.addEventListener('refresh', () => scroll.update());
    ScrollTrigger.refresh();

    // Newsletter Form Handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            // Add your newsletter subscription logic here
            console.log('Newsletter subscription for:', email);
            // Show success message
            alert('Thank you for subscribing!');
            newsletterForm.reset();
        });
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    scroll.update();
    ScrollTrigger.refresh();
});
