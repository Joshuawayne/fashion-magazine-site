// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Wait for both DOM and all scripts to load
window.addEventListener('load', () => {
    console.log('Page loaded, initializing animations');
    
    // Get elements
    const typewriter = document.querySelector('.typewriter');
    const typewriterText = typewriter.querySelector('.typewriter-text');
    const subtitle = document.querySelector('.subtitle');
    const header = document.querySelector('.main-header');
    
    // Set initial states
    gsap.set(typewriterText, { width: 0 });
    gsap.set(subtitle, { opacity: 0, y: 20 });
    gsap.set(header, { opacity: 0, y: -20 });

    // Create animation sequence
    ScrollTrigger.create({
        trigger: '.hero-video',
        start: 'top center',
        onEnter: () => {
            console.log('Starting animation sequence');
            
            // 1. Typewriter animation
            typewriter.classList.add('active');
            
            // 2. Start fairy dust after typewriter (2.5s)
            setTimeout(() => {
                console.log('Starting fairy dust');
                if (window.fairyDust) {
                    window.fairyDust.init();
                    window.fairyDust.start();
                    
                    // 3. Stop fairy dust after 4s
                    setTimeout(() => {
                        window.fairyDust.stop();
                        
                        // 4. Fade in navigation
                        setTimeout(() => {
                            console.log('Fading in navigation');
                            header.classList.add('visible');
                        }, 500); // Start 0.5s after particles stop
                    }, 4000);
                }
            }, 2500);

            // Fade in subtitle
            setTimeout(() => {
                gsap.to(subtitle, {
                    opacity: 1,
                    y: 0,
                    duration: 1
                });
            }, 3000);
        },
        once: true
    });

    // Animate info items on scroll
    gsap.utils.toArray('.fade-up').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.8
        });
    });

    // Form Animations and Validation
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');

    // Floating label animation
    inputs.forEach(input => {
        // Add active class if input has value
        if (input.value) {
            input.parentElement.classList.add('active');
        }

        input.addEventListener('focus', () => {
            input.parentElement.classList.add('active');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('active');
            }
        });
    });

    // Form submission handling
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.submit-btn');
        
        // Validate form
        const isValid = validateForm();
        if (!isValid) return;

        // Show loading state
        submitBtn.classList.add('loading');

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success state
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');

            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitBtn.classList.remove('success');
                inputs.forEach(input => {
                    input.parentElement.classList.remove('active');
                });
            }, 3000);

        } catch (error) {
            console.error('Form submission error:', error);
            submitBtn.classList.remove('loading');
            alert('An error occurred. Please try again.');
        }
    });
});

// Form validation
function validateForm() {
    const form = document.getElementById('contactForm');
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const subject = form.querySelector('#subject');
    const message = form.querySelector('#message');
    let isValid = true;

    // Reset previous error states
    clearErrors();

    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Please enter your name');
        isValid = false;
    }

    // Validate email
    if (!email.value.trim()) {
        showError(email, 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }

    // Validate subject
    if (!subject.value.trim()) {
        showError(subject, 'Please enter a subject');
        isValid = false;
    }

    // Validate message
    if (!message.value.trim()) {
        showError(message, 'Please enter your message');
        isValid = false;
    }

    return isValid;
}

// Helper functions
function showError(input, message) {
    const formGroup = input.parentElement;
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    formGroup.appendChild(error);
    formGroup.classList.add('error');
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorGroups = document.querySelectorAll('.form-group.error');
    errorMessages.forEach(error => error.remove());
    errorGroups.forEach(group => group.classList.remove('error'));
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Video background handling
const video = document.getElementById('heroVideo');
video.addEventListener('loadeddata', () => {
    video.play().catch(error => {
        console.log('Auto-play was prevented:', error);
        // Add a play button or fallback behavior if needed
    });
});
