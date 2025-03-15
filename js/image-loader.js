// Image Loading and Optimization

class ImageLoader {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        // Create intersection observer for lazy loading
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Initialize all images on the page
        this.initializeImages();
    }

    initializeImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.setupImage(img);
        });
    }

    setupImage(img) {
        // Create container if not exists
        if (!img.parentElement.classList.contains('image-container')) {
            const container = document.createElement('div');
            container.className = 'image-container loading';
            img.parentNode.insertBefore(container, img);
            container.appendChild(img);

            // Add error overlay
            const errorOverlay = document.createElement('div');
            errorOverlay.className = 'error-overlay';
            errorOverlay.textContent = 'Image failed to load';
            container.appendChild(errorOverlay);
        }

        // Create and add tiny blur placeholder
        const tinyPlaceholder = new Image();
        tinyPlaceholder.className = 'blur-load';
        tinyPlaceholder.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        img.parentElement.insertBefore(tinyPlaceholder, img);

        // Start observing
        this.observer.observe(img);
    }

    loadImage(img) {
        const container = img.closest('.image-container');
        const tinyPlaceholder = container.querySelector('.blur-load');
        
        // Load the full image
        const fullImage = new Image();
        
        fullImage.onload = () => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            container.classList.remove('loading');
            if (tinyPlaceholder) {
                tinyPlaceholder.classList.add('loaded');
            }
        };

        fullImage.onerror = () => {
            console.error(`Failed to load image: ${img.dataset.src}`);
            container.classList.remove('loading');
            container.classList.add('error');
            
            // Try loading fallback image
            this.loadFallbackImage(img);
        };

        fullImage.src = img.dataset.src;
    }

    loadFallbackImage(img) {
        const fallbacks = [
            'https://images.unsplash.com/photo-1558769132-cb1aea458c5e',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae',
            'https://images.unsplash.com/photo-1581338834647-b0fb40704e21'
        ];

        const fallbackUrl = fallbacks[Math.floor(Math.random() * fallbacks.length)];
        img.src = `${fallbackUrl}?w=800&q=80`;
        img.classList.add('loaded');
        img.closest('.image-container').classList.remove('error');
    }

    // Refresh all images (useful after dynamic content updates)
    refresh() {
        this.initializeImages();
    }
}

// Initialize the image loader
const imageLoader = new ImageLoader();

// Refresh on dynamic content updates
document.addEventListener('contentChanged', () => {
    imageLoader.refresh();
});

// Export for use in other modules
window.imageLoader = imageLoader;

// Video optimization
const videos = document.querySelectorAll('video');
videos.forEach(video => {
    // Only load video when in viewport
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    videoObserver.observe(video);
});
