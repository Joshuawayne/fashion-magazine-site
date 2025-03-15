// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Gallery Controller Class
class GalleryController {
    constructor() {
        this.preloader = document.querySelector('.avant-preloader');
        this.heroVideo = document.querySelector('#heroVideo');
        this.titleLines = document.querySelectorAll('.title-line');
        this.filterBtns = document.querySelectorAll('.avant-filter-btn');
        this.galleryItems = document.querySelectorAll('.avant-item');
        
        this.init();
    }
    
    init() {
        this.initPreloader();
        this.initHeroAnimations();
        this.initScrollAnimations();
        this.initFilters();
        this.initMediaLoading();
        
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    initPreloader() {
        if (this.preloader) {
            window.addEventListener('load', () => {
                gsap.to(this.preloader, {
                    opacity: 0,
                    duration: 1,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        this.preloader.style.display = 'none';
                        this.animateHero();
                    }
                });
            });
        } else {
            this.animateHero();
        }
    }
    
    initHeroAnimations() {
        gsap.set(this.titleLines, { opacity: 0, y: 50 });
    }
    
    animateHero() {
        const tl = gsap.timeline();
        
        tl.to(this.titleLines, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }
    
    initScrollAnimations() {
        this.galleryItems.forEach(item => {
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: -50,
                ease: 'none'
            });
        });
    }
    
    initFilters() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.filterGallery(filter);
            });
        });
    }
    
    filterGallery(filter) {
        this.galleryItems.forEach(item => {
            const isMatch = filter === 'all' || item.classList.contains(filter);
            
            gsap.to(item, {
                opacity: isMatch ? 1 : 0,
                scale: isMatch ? 1 : 0.8,
                duration: 0.6,
                ease: 'power3.out',
                onComplete: () => {
                    item.style.display = isMatch ? 'block' : 'none';
                }
            });
        });
    }
    
    initMediaLoading() {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };
        
        const loadMedia = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const media = item.querySelector('video, img');
                    const loadingIndicator = item.querySelector('.avant-loader');
                    
                    if (!media) return;
                    
                    if (media.tagName === 'VIDEO') {
                        this.loadVideo(media, loadingIndicator);
                    } else {
                        this.loadImage(media, loadingIndicator);
                    }
                    
                    observer.unobserve(item);
                }
            });
        };
        
        const observer = new IntersectionObserver(loadMedia, options);
        this.galleryItems.forEach(item => observer.observe(item));
    }
    
    loadVideo(video, loadingIndicator) {
        const quality = video.dataset.quality || 'medium';
        const source = video.querySelector('source');
        
        if (source && !source.src.includes(video.dataset.src)) {
            source.src = video.dataset.src;
            video.load();
        }
        
        video.addEventListener('canplaythrough', () => {
            gsap.to(loadingIndicator, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    loadingIndicator.style.display = 'none';
                    video.play().catch(err => console.log('Video playback error:', err));
                }
            });
        }, { once: true });
        
        video.addEventListener('error', () => {
            console.error(`Video failed to load: ${video.dataset.src}`);
            loadingIndicator.textContent = 'Video Failed to Load';
        }, { once: true });
    }
    
    loadImage(img, loadingIndicator) {
        const src = img.dataset.src.includes('/.netlify/images') 
            ? img.dataset.src 
            : `/.netlify/images?url=/assets/images/${img.dataset.src.split('/').pop()}&w=800&q=75`;
        const newImg = new Image();
        
        newImg.onload = () => {
            img.src = src;
            gsap.to(loadingIndicator, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    loadingIndicator.style.display = 'none';
                }
            });
        };
        
        newImg.onerror = () => {
            console.error(`Image failed to load: ${src}`);
            loadingIndicator.textContent = 'Image Failed to Load';
        };
        
        newImg.src = src;
    }
}

// Initialize Gallery
document.addEventListener('DOMContentLoaded', () => {
    new GalleryController();
});
