// Navigation Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

// Enhanced Hero Animation with Letter Splitting
const heroTimeline = gsap.timeline({
    defaults: {
        ease: 'power4.out'
    }
});

const title = document.querySelector('.hero-content h1');
const letters = title.textContent.split('').map(letter => 
    `<span class="letter-animate">${letter}</span>`
).join('');
title.innerHTML = letters;

heroTimeline
    .from('.letter-animate', {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 1
    })
    .from('.hero-content p', {
        y: 50,
        opacity: 0,
        duration: 1.5,
    }, "-=0.5")
    .from('.artistic-line', {
        width: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=1");

// Light Cursor Effect
const lightCursor = document.querySelector('.light-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(lightCursor, {
        x: e.clientX - 100,
        y: e.clientY - 100,
        duration: 0.3
    });
});

// Video Parallax Effect
const heroVideo = document.querySelector('#heroVideo');
if (heroVideo) {
    ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        onUpdate: self => {
            gsap.to(heroVideo, {
                scale: 1 + (self.progress * 0.2),
                duration: 0.5
            });
        }
    });
}

// Custom Cursor Class
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
        
        this.cursor.style.cssText = `
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent-color);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.3s ease;
        `;
        
        this.cursorinner = document.createElement('div');
        this.cursorinner.className = 'cursor-inner';
        this.cursor.appendChild(this.cursorinner);
        
        this.cursorinner.style.cssText = `
            width: 6px;
            height: 6px;
            background: var(--accent-color);
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `;
        
        document.addEventListener('mousemove', e => {
            this.cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
    }
    
    enter() {
        this.cursor.style.transform += ' scale(2.5)';
    }
    
    leave() {
        this.cursor.style.transform = this.cursor.style.transform.replace(' scale(2.5)', '');
    }
}

// Floating Elements Animation
const initFloatingElements = () => {
    const floatingElements = document.querySelectorAll('.floating-elements span');
    floatingElements.forEach(element => {
        gsap.to(element, {
            x: 'random(-100, 100)',
            y: 'random(-100, 100)',
            duration: 'random(3, 6)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
};

// Smooth Scroll Implementation
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: target,
                    ease: 'power2.inOut'
                });
            }
        });
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cursor = new CustomCursor();
    
    // Add hover effect to all links and buttons
    const hoverElements = document.querySelectorAll('a, button');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => cursor.enter());
        element.addEventListener('mouseleave', () => cursor.leave());
    });

    initFloatingElements();
    initSmoothScroll();
});
