// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Countdown Timer
function updateCountdown() {
    // Set the date we're counting down to (24 hours from now)
    const countDownDate = new Date().getTime() + (24 * 60 * 60 * 1000);

    function update() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = String(days).padStart(2, '0');
        document.getElementById("hours").textContent = String(hours).padStart(2, '0');
        document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
        document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector(".countdown-container").innerHTML = "EXPIRED";
        }
    }

    update();
    const countdownInterval = setInterval(update, 1000);
}

// Live Viewers Counter
function updateViewersCount() {
    const viewersElement = document.querySelector('.viewers-count');
    if (!viewersElement) return;

    let viewers = 2500; // Starting count
    
    setInterval(() => {
        // Randomly increase or decrease viewers
        const change = Math.floor(Math.random() * 10) - 4;
        viewers = Math.max(2000, viewers + change);
        viewersElement.textContent = `${(viewers/1000).toFixed(1)}K watching`;
    }, 3000);
}

// Spots Remaining Animation
function animateSpotsRemaining() {
    const spotsElements = document.querySelectorAll('.spots-left');
    
    spotsElements.forEach(element => {
        const currentSpots = parseInt(element.textContent);
        if (currentSpots > 0) {
            setInterval(() => {
                const newSpots = Math.max(0, currentSpots - 1);
                if (newSpots === 0) {
                    element.textContent = 'Sold Out';
                    element.classList.add('sold-out');
                } else {
                    element.textContent = `${newSpots} spots left`;
                }
            }, Math.random() * 60000 + 30000); // Random interval between 30-90 seconds
        }
    });
}

// GSAP Animations
function initAnimations() {
    // Reveal text animation
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        });
    });

    // Fade in animation
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Event cards animation
    gsap.utils.toArray('.event-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power2.out"
        });
    });
}

// Glitch Text Effect
function initGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;

    setInterval(() => {
        glitchText.classList.add('glitch');
        setTimeout(() => {
            glitchText.classList.remove('glitch');
        }, 200);
    }, 3000);
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    updateViewersCount();
    animateSpotsRemaining();
    initAnimations();
    initGlitchEffect();
});

// Add hover effects for cards
document.querySelectorAll('.event-card, .edition-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});
