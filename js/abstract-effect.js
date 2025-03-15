class AbstractEffect {
    constructor() {
        this.container = document.querySelector('.abstract-container');
        this.image = document.querySelector('.reflection-piece img');
        this.fragments = document.querySelector('.abstract-fragments');
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.container.addEventListener('click', () => this.shatterTransition());
        this.addMouseTracking();
    }

    addMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            if (this.isAnimating) return;

            const { clientX, clientY } = e;
            const { left, top, width, height } = this.image.getBoundingClientRect();
            
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;

            gsap.to(this.image, {
                duration: 0.8,
                ease: 'power2.out',
                scale: 1.2 + Math.abs(x) * 0.1,
                skewX: 5 + x * 2,
                x: x * 10
            });
        });
    }

    shatterTransition() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const pieces = 6; // Reduced number of fragments for more abstract feel
        const fragments = [];
        const bounds = this.image.getBoundingClientRect();

        // Create abstract fragments
        for (let i = 0; i < pieces * pieces; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'fragment';
            
            // Position fragments
            const x = (i % pieces) / pieces * 100;
            const y = Math.floor(i / pieces) / pieces * 100;
            
            fragment.style.backgroundImage = `url(${this.image.src})`;
            fragment.style.left = `${x}%`;
            fragment.style.top = `${y}%`;
            fragment.style.width = `${100 / pieces}%`;
            fragment.style.height = `${100 / pieces}%`;
            fragment.style.backgroundPosition = `-${x}% -${y}%`;
            
            // Abstract movement values
            const angle = (i / (pieces * pieces)) * Math.PI * 2;
            const radius = Math.random() * 200 + 100;
            const translateX = Math.cos(angle) * radius;
            const translateY = Math.sin(angle) * radius;
            const rotate = Math.random() * 90 - 45;
            
            fragment.style.setProperty('--translateX', `${translateX}px`);
            fragment.style.setProperty('--translateY', `${translateY}px`);
            fragment.style.setProperty('--rotate', `${rotate}deg`);
            fragment.style.setProperty('--scale', 0);
            
            this.fragments.appendChild(fragment);
            fragments.push(fragment);
        }

        // Animate fragments
        requestAnimationFrame(() => {
            fragments.forEach((fragment, i) => {
                setTimeout(() => {
                    fragment.classList.add('active');
                }, i * 30);
            });
        });

        // Transition to gallery
        gsap.to(window, {
            duration: 1,
            scrollTo: '.gallery-grid',
            ease: 'power2.inOut',
            delay: 0.4
        });

        // Cleanup
        setTimeout(() => {
            fragments.forEach(fragment => fragment.remove());
            this.isAnimating = false;
        }, 1500);
    }
}

class SplitEffect {
    constructor() {
        this.container = document.querySelector('.split-container');
        this.fragments = document.querySelector('.split-fragments');
        this.originalImage = document.querySelector('.original-image');
        this.reflectedImage = document.querySelector('.reflected-image');
        this.galleryGrid = document.querySelector('.gallery-grid');
        this.gridItems = document.querySelectorAll('.grid-item');
        this.fragmentsArray = [];
        this.isAnimating = false;
        this.hasRevealed = false;

        this.init();
    }

    init() {
        this.createFragments();
        this.bindEvents();
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasRevealed) {
                    this.revealGallery();
                    this.hasRevealed = true;
                }
            });
        }, options);

        observer.observe(this.galleryGrid);
    }

    createFragments() {
        const numFragments = 8;
        const imageUrl = this.originalImage.src;

        for (let i = 0; i < numFragments; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'fragment';
            fragment.style.backgroundImage = `url(${imageUrl})`;
            
            const size = Math.random() * 150 + 100;
            fragment.style.width = `${size}px`;
            fragment.style.height = `${size}px`;
            
            fragment.style.left = `${Math.random() * 100}vw`;
            fragment.style.top = `${Math.random() * 100}vh`;
            
            this.fragments.appendChild(fragment);
            this.fragmentsArray.push(fragment);
        }
    }

    animateFragments(event) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const rect = this.container.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Trigger gallery reveal
        if (!this.hasRevealed) {
            setTimeout(() => {
                this.revealGallery();
                this.hasRevealed = true;
            }, 800);
        }

        this.fragmentsArray.forEach((fragment, index) => {
            const delay = index * 50;
            const angle = (index / this.fragmentsArray.length) * Math.PI * 2;
            const distance = 100 + Math.random() * 100;

            const targetX = mouseX + Math.cos(angle) * distance;
            const targetY = mouseY + Math.sin(angle) * distance;

            fragment.style.transform = `translate(${targetX}px, ${targetY}px) rotate(${Math.random() * 360}deg)`;
            fragment.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
            fragment.classList.add('active');

            setTimeout(() => {
                fragment.style.transform = 'translate(0, 0) rotate(0deg)';
                fragment.classList.remove('active');
                
                if (index === this.fragmentsArray.length - 1) {
                    setTimeout(() => {
                        this.isAnimating = false;
                    }, 800);
                }
            }, 800 + delay);
        });
    }

    revealGallery() {
        this.galleryGrid.classList.add('revealed');
        
        this.gridItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('revealed');
            }, index * 100);
        });

        // Smooth scroll to gallery
        setTimeout(() => {
            this.galleryGrid.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 400);
    }

    bindEvents() {
        this.container.addEventListener('mousemove', (e) => {
            if (!this.isAnimating) {
                const rect = this.container.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;

                this.originalImage.style.transform = `scale(1.1) translate(${x * 20}px, ${y * 20}px)`;
                this.reflectedImage.style.transform = `scale(1.1) scaleX(-1) translate(${-x * 20}px, ${y * 20}px)`;
            }
        });

        this.container.addEventListener('click', (e) => {
            this.animateFragments(e);
        });

        this.container.addEventListener('mouseleave', () => {
            this.originalImage.style.transform = 'scale(1.1)';
            this.reflectedImage.style.transform = 'scale(1.1) scaleX(-1)';
        });
    }
}

class MirrorTransformation {
    constructor() {
        this.container = document.querySelector('.gallery-hero');
        this.mirror = document.querySelector('.reflection-piece');
        this.image = this.mirror.querySelector('img');
        this.overlay = document.querySelector('.abstract-overlay');
        this.text = document.querySelector('.abstract-text');
        this.fragments = document.querySelector('.abstract-fragments');
        this.meditationPhases = [
            { text: '見る', subtext: 'To See' },
            { text: '気付く', subtext: 'To Realize' },
            { text: '変わる', subtext: 'To Transform' },
            { text: '目覚める', subtext: 'To Awaken' }
        ];
        this.currentPhase = 0;
        this.isTransforming = false;
        this.ripples = [];
        
        this.init();
    }

    init() {
        this.createRippleEffect();
        this.bindEvents();
        this.startMeditativeBreathing();
    }

    createRippleEffect() {
        const rippleContainer = document.createElement('div');
        rippleContainer.className = 'ripple-container';
        this.container.appendChild(rippleContainer);

        for (let i = 0; i < 3; i++) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            rippleContainer.appendChild(ripple);
            this.ripples.push(ripple);
        }
    }

    startMeditativeBreathing() {
        this.ripples.forEach((ripple, index) => {
            ripple.style.animation = `ripple ${4 + index}s ease-in-out infinite`;
            ripple.style.animationDelay = `${index * 1}s`;
        });

        // Subtle image pulse animation
        this.image.style.animation = 'breathe 8s ease-in-out infinite';
    }

    async transformToNextPhase(event) {
        if (this.isTransforming) return;
        this.isTransforming = true;

        // Create ethereal fragments
        const fragments = this.createTransformationFragments();
        
        // Animate current phase dissolution
        await this.dissolveCurrentPhase(fragments, event);
        
        // Progress to next phase
        this.currentPhase = (this.currentPhase + 1) % this.meditationPhases.length;
        
        // Reveal new phase
        await this.revealNewPhase();
        
        // If reached final phase, trigger transcendence
        if (this.currentPhase === this.meditationPhases.length - 1) {
            this.triggerTranscendence();
        }

        this.isTransforming = false;
    }

    createTransformationFragments() {
        const fragments = [];
        const numFragments = 12; // Number represents spiritual completeness

        for (let i = 0; i < numFragments; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'meditation-fragment';
            
            // Set fragment properties based on spiritual symbolism
            const angle = (i / numFragments) * Math.PI * 2;
            const distance = 150;
            fragment.style.left = `${50 + Math.cos(angle) * distance}%`;
            fragment.style.top = `${50 + Math.sin(angle) * distance}%`;
            
            this.fragments.appendChild(fragment);
            fragments.push(fragment);
        }

        return fragments;
    }

    async dissolveCurrentPhase(fragments, event) {
        const duration = 2000; // Time for mindful transition
        
        // Fade out current text
        this.text.style.opacity = 0;
        this.text.style.transform = 'scale(0.8)';

        // Emanate fragments in spiritual pattern
        fragments.forEach((fragment, i) => {
            const delay = i * (duration / fragments.length);
            setTimeout(() => {
                fragment.style.opacity = '1';
                fragment.style.transform = `
                    translate(${Math.cos(i) * 100}px, ${Math.sin(i) * 100}px)
                    rotate(${i * 30}deg)
                    scale(${0.5 + Math.random() * 0.5})
                `;
            }, delay);
        });

        await new Promise(resolve => setTimeout(resolve, duration));
    }

    async revealNewPhase() {
        const phase = this.meditationPhases[this.currentPhase];
        
        // Update meditation text
        this.text.querySelector('.glitch-abstract').textContent = phase.text;
        this.text.querySelector('.glitch-abstract').setAttribute('data-text', phase.text);
        
        // Add subtext for deeper meaning
        const subtext = document.createElement('span');
        subtext.className = 'meditation-subtext';
        subtext.textContent = phase.subtext;
        this.text.appendChild(subtext);

        // Mindful revelation
        await new Promise(resolve => {
            setTimeout(() => {
                this.text.style.opacity = 1;
                this.text.style.transform = 'scale(1)';
                resolve();
            }, 100);
        });
    }

    triggerTranscendence() {
        // Create enlightenment effect
        const light = document.createElement('div');
        light.className = 'enlightenment';
        this.container.appendChild(light);

        // Transition to gallery with spiritual meaning
        setTimeout(() => {
            document.querySelector('.gallery-grid').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 3000);
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => this.transformToNextPhase(e));
        
        // Add mindful hover interaction
        this.mirror.addEventListener('mousemove', (e) => {
            if (!this.isTransforming) {
                const rect = this.mirror.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                // Gentle, flowing movement
                this.image.style.transform = `
                    scale(1.1)
                    translate(${x * 20}px, ${y * 20}px)
                `;
                
                // Subtle light interaction
                this.overlay.style.background = `
                    radial-gradient(
                        circle at ${x * 100}% ${y * 100}%,
                        rgba(255,255,255,0.2),
                        rgba(0,0,0,0.1)
                    )
                `;
            }
        });

        // Reset to centered state
        this.mirror.addEventListener('mouseleave', () => {
            this.image.style.transform = 'scale(1.1)';
            this.overlay.style.background = 'rgba(0,0,0,0.1)';
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new AbstractEffect();
    new SplitEffect();
    new MirrorTransformation();
});
