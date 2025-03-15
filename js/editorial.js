// Featured Editorial Animations
const initFeaturedEditorial = () => {
    const featuredSection = document.querySelector('.featured-editorial');
    const title = featuredSection.querySelector('.hero-title');
    const subtitle = featuredSection.querySelector('.hero-subtitle');
    const meta = featuredSection.querySelector('.editorial-meta');
    const readMore = featuredSection.querySelector('.read-more');

    // Initial animation sequence
    gsap.from(meta, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(title.querySelectorAll('.line'), {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.3
    });

    gsap.from(subtitle, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8
    });

    gsap.from(readMore, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1
    });
};

// Editorial Grid Animations
const initEditorialGrid = () => {
    const editorialItems = document.querySelectorAll('.editorial-item');

    editorialItems.forEach(item => {
        const content = item.querySelector('.item-content');
        const image = item.querySelector('img');

        // Scroll trigger animation
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

        // Hover animations
        item.addEventListener('mouseenter', () => {
            gsap.to(image, {
                scale: 1.1,
                duration: 1.2,
                ease: "power2.out"
            });

            gsap.to(content, {
                y: -20,
                duration: 0.6,
                ease: "power2.out"
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(image, {
                scale: 1,
                duration: 1.2,
                ease: "power2.out"
            });

            gsap.to(content, {
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            });
        });
    });
};

// Opinion Section Animations
const initOpinionSection = () => {
    const opinionItems = document.querySelectorAll('.opinion-item');

    opinionItems.forEach(item => {
        const authorInfo = item.querySelector('.author-info');
        
        // Scroll trigger animation
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "top center",
                scrub: 1
            },
            y: 50,
            opacity: 0
        });

        // Author info hover animation
        authorInfo.addEventListener('mouseenter', () => {
            gsap.to(authorInfo, {
                scale: 1.05,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        authorInfo.addEventListener('mouseleave', () => {
            gsap.to(authorInfo, {
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });
};

// Archive Highlights Animation
const initArchiveHighlights = () => {
    const archiveItems = document.querySelectorAll('.archive-item');
    
    archiveItems.forEach((item, index) => {
        const year = item.querySelector('.year');
        
        // Staggered entrance animation
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "top center"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out"
        });

        // Year number counter animation
        gsap.from(year, {
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "top center"
            },
            textContent: 1990,
            duration: 2,
            ease: "power1.inOut",
            snap: { textContent: 1 },
            stagger: {
                each: 0.2,
                onUpdate: function() {
                    this.targets()[0].innerHTML = Math.ceil(this.targets()[0].textContent);
                },
            }
        });
    });
};

// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    initFeaturedEditorial();
    initEditorialGrid();
    initOpinionSection();
    initArchiveHighlights();
});
