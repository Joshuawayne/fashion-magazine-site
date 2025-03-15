// Fairy Dust Effect with grainy texture
const fairyDust = {
    scene: null,
    camera: null,
    renderer: null,
    particles: null,
    animationId: null,
    isAnimating: false,
    clock: null,

    createParticleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        // Create grainy texture
        const imageData = ctx.createImageData(32, 32);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const x = (i / 4) % 32;
            const y = Math.floor((i / 4) / 32);
            const distance = Math.sqrt(Math.pow(x - 16, 2) + Math.pow(y - 16, 2));
            
            // Add noise to create grainy effect
            const noise = Math.random() * 0.5;
            const alpha = Math.max(0, 1 - (distance / 16)) * noise;
            
            // Golden color with slight variation
            data[i] = 212 + (Math.random() * 20 - 10);     // R
            data[i + 1] = 175 + (Math.random() * 20 - 10); // G
            data[i + 2] = 55 + (Math.random() * 20 - 10);  // B
            data[i + 3] = alpha * 255;
        }

        ctx.putImageData(imageData, 0, 0);

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    },

    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();

        // Setup camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        // Setup renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('fairy-dust'),
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // Create particles
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 2000;

        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount);
        const turbulence = new Float32Array(particleCount);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = Math.random() * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
            velocities[i] = 0.02 + Math.random() * 0.03;
            turbulence[i] = Math.random() * 2 * Math.PI;
            sizes[i] = 0.05 + Math.random() * 0.1;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));
        particleGeometry.setAttribute('turbulence', new THREE.BufferAttribute(turbulence, 1));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Create particle material with custom texture
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.15,
            map: this.createParticleTexture(),
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            vertexColors: false
        });

        // Create particle system
        this.particles = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particles);

        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    },

    animate() {
        if (!this.isAnimating) return;

        const time = this.clock.getElapsedTime();
        const positions = this.particles.geometry.attributes.position.array;
        const velocities = this.particles.geometry.attributes.velocity.array;
        const turbulence = this.particles.geometry.attributes.turbulence.array;

        for (let i = 0; i < positions.length; i += 3) {
            const idx = i / 3;
            
            // Add swirling motion
            const swirl = Math.sin(time + turbulence[idx]) * 0.02;
            positions[i] += swirl;
            
            // Update vertical position with velocity
            positions[i + 1] -= velocities[idx];

            // Reset particle position when it goes below screen
            if (positions[i + 1] < -5) {
                positions[i] = (Math.random() - 0.5) * 15;
                positions[i + 1] = 15;
                positions[i + 2] = (Math.random() - 0.5) * 15;
            }
        }

        this.particles.geometry.attributes.position.needsUpdate = true;
        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(() => this.animate());
    },

    start() {
        if (!this.scene) {
            this.init();
        }
        this.isAnimating = true;
        this.animate();
    },

    stop() {
        this.isAnimating = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
};

// Make fairyDust available globally
window.fairyDust = fairyDust;
