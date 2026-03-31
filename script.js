// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    initTypingAnimation();
    initNavigation();
    initScrollAnimations();
    initMatrixRain();
    initFormHandling();
    initGlitchEffect();
    initParticleSystem();
    initTerminalEffects();
    initThemeToggle();
    initCounterAnimation();
    initTestimonialSlider();
    initTimelineAnimations();
    initScrollToTop();
});

// ── Typing Animation ──────────────────────────────────────────
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const texts = [
        'whoami',
        'nmap -sV --script vuln target.com',
        'burpsuite --project-file pentest.burp',
        'sqlmap -u "https://target.com/api" --dbs',
        'nuclei -t cves/ -u https://target.com',
        'subfinder -d target.com | httpx -silent',
        'python3 exploit.py --target 10.10.10.1',
        'msfconsole -q -x "use exploit/multi/handler"',
        'ffuf -w wordlist.txt -u https://target.com/FUZZ',
        'john --wordlist=rockyou.txt --format=bcrypt hash.txt',
        'aws iam list-attached-user-policies --user-name admin',
        'frida -U -f com.target.app --no-pause -l hook.js'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[textIndex];

        typingElement.textContent = isDeleting
            ? currentText.substring(0, charIndex - 1)
            : currentText.substring(0, charIndex + 1);

        isDeleting ? charIndex-- : charIndex++;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }

    typeText();
}

// ── Navigation ────────────────────────────────────────────────
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            // Smooth scroll
            const targetId = this.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 120;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // Active link highlighting on scroll
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');
            if (scrollPos >= sectionTop && scrollPos < sectionTop + section.offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    }, { passive: true });
}

// ── Scroll Animations ─────────────────────────────────────────
function initScrollAnimations() {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.skill-category, .cert-card, .contact-item, .about-content > *')
        .forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
}

// ── Matrix Rain ───────────────────────────────────────────────
function initMatrixRain() {
    const matrixContainer = document.getElementById('matrix-rain');
    if (!matrixContainer) return;

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrixFall {
            0%   { transform: translateY(-100vh); }
            100% { transform: translateY(100vh); }
        }
    `;
    document.head.appendChild(style);

    function createMatrixColumn() {
        const column = document.createElement('div');
        column.style.cssText = `
            position: absolute;
            top: -100px;
            left: ${Math.random() * 100}%;
            color: #00ff41;
            font-family: monospace;
            font-size: 14px;
            opacity: 0.15;
            animation: matrixFall ${3 + Math.random() * 4}s linear;
            pointer-events: none;
            white-space: nowrap;
        `;

        let text = '';
        for (let i = 0; i < 20; i++) {
            text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        column.innerHTML = text;
        matrixContainer.appendChild(column);

        setTimeout(() => column.remove(), 7000);
    }

    setInterval(createMatrixColumn, 200);
}

// ── Form Handling — Web3Forms ─────────────────────────────────
function initFormHandling() {
    const form = document.getElementById('contact-form');
    const btn  = document.getElementById('submit-btn');
    const result = document.getElementById('form-result');
    if (!form || !btn || !result) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        result.className = 'form-result';
        result.textContent = '';

        try {
            const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) });
            const json = await res.json();

            if (json.success) {
                form.reset();
                openSuccessModal();
            } else {
                result.textContent = json.message || 'Something went wrong. Please try again.';
                result.classList.add('form-result--error');
            }
        } catch {
            result.textContent = 'Network error. Please check your connection and try again.';
            result.classList.add('form-result--error');
        }

        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    });
}

// ── Success Modal ─────────────────────────────────────────────
function openSuccessModal() {
    document.getElementById('success-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
    document.getElementById('success-modal').classList.remove('open');
    document.body.style.overflow = '';
}

// ── Certificate Modal ─────────────────────────────────────────
function openCertModal(src, title) {
    const modal = document.getElementById('cert-modal');
    document.getElementById('cert-modal-img').src = src;
    document.getElementById('cert-modal-title').textContent = title;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCertModal(e) {
    if (e && e.target !== document.getElementById('cert-modal') && !e.target.classList.contains('cert-modal-close')) return;
    document.getElementById('cert-modal').classList.remove('open');
    document.body.style.overflow = '';
}

// ── Global keyboard handler ───────────────────────────────────
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        // Close cert modal
        const certModal = document.getElementById('cert-modal');
        if (certModal && certModal.classList.contains('open')) {
            certModal.classList.remove('open');
            document.body.style.overflow = '';
            return;
        }
        // Close success modal
        const successModal = document.getElementById('success-modal');
        if (successModal && successModal.classList.contains('open')) {
            closeSuccessModal();
            return;
        }
        // Close mobile nav
        const navMenu   = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu)   navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});

// ── Glitch Effect ─────────────────────────────────────────────
function initGlitchEffect() {
    document.querySelectorAll('.glitch-text').forEach(el => {
        el.addEventListener('mouseenter', () => el.style.animation = 'glitch 0.3s infinite');
        el.addEventListener('mouseleave', () => el.style.animation = 'glitch 2s infinite');
    });
}

// ── Particle System ───────────────────────────────────────────
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;opacity:0.1;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function makeParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1
        };
    }

    function init() {
        particles = Array.from({ length: 50 }, makeParticle);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,255,65,${p.opacity})`;
            ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0,255,65,${0.1 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    resize();
    init();
    animate();
    window.addEventListener('resize', () => { resize(); init(); }, { passive: true });
}

// ── Terminal Effects ──────────────────────────────────────────
function initTerminalEffects() {
    document.querySelectorAll('.terminal-window').forEach(el => {
        el.addEventListener('mouseenter', () => el.style.boxShadow = '0 0 20px rgba(0,255,65,0.3)');
        el.addEventListener('mouseleave', () => el.style.boxShadow = '');
    });
}

// ── Theme Toggle ──────────────────────────────────────────────
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('light-theme', currentTheme === 'light');
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');
        const newTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

// ── Counter Animation ─────────────────────────────────────────
function initCounterAnimation() {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const counter = entry.target;
            const target  = parseInt(counter.getAttribute('data-target'), 10);
            const increment = target / (2000 / 16);
            let current = 0;

            function update() {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }

            update();
            observer.unobserve(counter);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(c => observer.observe(c));
}

// ── Testimonial Slider ────────────────────────────────────────
function initTestimonialSlider() {
    const cards   = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    if (!cards.length || !prevBtn || !nextBtn) return;

    let current = 0;

    function show(index) {
        cards.forEach((card, i) => card.classList.toggle('active', i === index));
    }

    nextBtn.addEventListener('click', () => { current = (current + 1) % cards.length; show(current); });
    prevBtn.addEventListener('click', () => { current = (current - 1 + cards.length) % cards.length; show(current); });

    setInterval(() => { current = (current + 1) % cards.length; show(current); }, 5000);
}

// ── Timeline Animations ───────────────────────────────────────
function initTimelineAnimations() {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry, index) => {
            if (!entry.isIntersecting) return;
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.timeline-item').forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = i % 2 === 0 ? 'translateX(-40px)' : 'translateX(40px)';
        item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(item);
    });
}

// ── Scroll To Top ─────────────────────────────────────────────
function initScrollToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.style.cssText = `
        position:fixed;bottom:30px;right:30px;width:46px;height:46px;
        background:var(--neon-green);color:var(--primary-bg);border:none;
        border-radius:50%;cursor:pointer;font-size:16px;opacity:0;
        visibility:hidden;transition:all 0.3s ease;z-index:1000;
        box-shadow:0 4px 15px rgba(0,255,65,0.3);display:flex;
        align-items:center;justify-content:center;
    `;
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
        const show = window.scrollY > 300;
        btn.style.opacity      = show ? '1' : '0';
        btn.style.visibility   = show ? 'visible' : 'hidden';
    }, { passive: true });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Loading Screen ────────────────────────────────────────────
window.addEventListener('load', function () {
    const screen = document.createElement('div');
    screen.className = 'loading';
    screen.innerHTML = '<div class="loading-text">Initializing System...</div>';
    screen.style.transition = 'opacity 0.5s ease';
    document.body.prepend(screen);

    setTimeout(() => {
        screen.style.opacity = '0';
        setTimeout(() => screen.remove(), 500);
    }, 1200);
});

// ── Utility ───────────────────────────────────────────────────
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
