/* ===================================================
   AccountPlug — Elite Crimson Cyber Interactivity Engine
   =================================================== */

// ── SellAuth Configuration ──
const SELLAUTH_API_KEY = '6116861|lmJS2IoGOm9CREC84gC7NGpuPnR7gNTbIGlFjkpV0e538054';
const SELLAUTH_SHOP_ID = '266440';
const SELLAUTH_SHOP_URL = 'https://accountplug1.mysellauth.com';
const SELLAUTH_API_BASE = 'https://api.sellauth.com/v1';

// Global Store State
let allProducts = [];
let allCategories = [];
let allGroups = [];
let currentTab = null;
let currentSubFilter = 'All';
let currentModalProduct = null;
let syncInterval = null;
let currentSearchQuery = '';
let filterInStockOnly = false;
let currentSortOption = 'default';

// Initial starter inventory for seamless display
const DEFAULT_PRODUCTS = [
    // NFA (6)
    {
        id: 1001,
        name: 'Rust NFA',
        description: '500+ Hours Genuine Playtime · Full Access Steam · Region Free',
        price: '5.99',
        price_slash: '12.00',
        stock: 18,
        tabCategory: 'nfa',
        tabLabel: 'NFA',
        subCategory: 'Rust',
        status_text: 'Instant Delivery',
        status_color: '#22c55e',
        deliverables_type: 'serials',
        image: 'nfa-card.png'
    },
    {
        id: 1002,
        name: 'Arc Raiders NFA',
        description: 'Closed Alpha / Beta Verified Access · Fresh Credentials',
        price: '4.99',
        price_slash: '9.99',
        stock: 12,
        tabCategory: 'nfa',
        tabLabel: 'NFA',
        subCategory: 'Arc Raiders',
        status_text: 'Beta Access',
        status_color: '#ff1e38',
        deliverables_type: 'serials',
        image: 'nfa-card.png'
    },
    {
        id: 1003,
        name: 'Battlefield 6 NFA',
        description: 'Pre-Order Ready EA App Login · Instant Serials Confirmation',
        price: '8.99',
        price_slash: '16.00',
        stock: 14,
        tabCategory: 'nfa',
        tabLabel: 'NFA',
        subCategory: 'Battlefield 6',
        status_text: 'Pre-Order',
        status_color: '#3b82f6',
        deliverables_type: 'serials',
        image: 'nfa-card.png'
    },
    {
        id: 1004,
        name: 'Escape From Tarkov NFA',
        description: 'Standard Edition Battlestate Login · Hand-tested · 0 Hour Ban Risk',
        price: '6.99',
        price_slash: '14.99',
        stock: 9,
        tabCategory: 'nfa',
        tabLabel: 'NFA',
        subCategory: 'Escape From Tarkov',
        status_text: 'Standard Edition',
        status_color: '#22c55e',
        deliverables_type: 'serials',
        image: 'nfa-card.png'
    },
    {
        id: 1005,
        name: 'DayZ NFA',
        description: 'Full Access Survival Account · Bohemia Verified · Ready to Connect',
        price: '4.49',
        price_slash: '9.00',
        stock: 22,
        tabCategory: 'nfa',
        tabLabel: 'NFA',
        subCategory: 'DayZ',
        status_text: 'Global Key',
        status_color: '#22c55e',
        deliverables_type: 'serials',
        image: 'nfa-card.png'
    },
    {
        id: 1006,
        name: 'CS2 NFA',
        description: 'Prime Status Enabled · Premier Ranked Ready · Medal Collection',
        price: '4.99',
        price_slash: '11.99',
        stock: 35,
        tabCategory: 'nfa',
        tabLabel: 'NFA',
        subCategory: 'CS2',
        status_text: 'Prime Ready',
        status_color: '#22c55e',
        deliverables_type: 'serials',
        image: 'nfa-card.png'
    },

    // Cheats (12)
    {
        id: 2001,
        name: 'Rust Cheat - Private DMA & ESP',
        description: 'Streamproof 2D Radar, Silent Aim, Item Visuals · Undetected EAC',
        price: '14.99',
        price_slash: '25.00',
        stock: 50,
        tabCategory: 'cheats',
        tabLabel: 'Cheats',
        subCategory: 'Rust',
        status_text: 'Undetected',
        status_color: '#22c55e'
    },
    {
        id: 2002,
        name: 'Arc Raiders Cheat - Streamproof Suite',
        description: 'Full Glow, Predictive Aimbot, Skeleton ESP · Automated Injection',
        price: '12.99',
        price_slash: '22.00',
        stock: 45,
        tabCategory: 'cheats',
        tabLabel: 'Cheats',
        subCategory: 'Arc Raiders',
        status_text: 'Updated',
        status_color: '#22c55e'
    },
    {
        id: 2003,
        name: 'Battlefield 6 Cheat - Combat Engine',
        description: 'Vehicle Chams, Distance Markers, Smooth No-Recoil Assist',
        price: '15.99',
        price_slash: '30.00',
        stock: 30,
        tabCategory: 'cheats',
        tabLabel: 'Cheats',
        subCategory: 'Battlefield 6',
        status_text: 'Undetected',
        status_color: '#22c55e'
    },
    {
        id: 2004,
        name: 'Escape From Tarkov - Loot Radar & Chams',
        description: 'High Tier Loot Filter, Player Direction, Thermal Chams View',
        price: '18.99',
        price_slash: '35.00',
        stock: 25,
        tabCategory: 'cheats',
        tabLabel: 'Cheats',
        subCategory: 'Escape From Tarkov',
        status_text: 'Undetected',
        status_color: '#22c55e'
    },
    {
        id: 2005,
        name: 'DayZ Cheat - Player Radar & Silent Aim',
        description: 'Corpse Finder, Base ESP, Full Coordinate Navigation System',
        price: '11.99',
        price_slash: '20.00',
        stock: 40,
        tabCategory: 'cheats',
        tabLabel: 'Cheats',
        subCategory: 'DayZ',
        status_text: 'Undetected',
        status_color: '#22c55e'
    },
    {
        id: 2006,
        name: 'CS2 Cheat - Premier Legitbot & Chams',
        description: 'VAC-Live Bypass, Humanized Aim Curve, RCS, Radar Sync',
        price: '9.99',
        price_slash: '18.00',
        stock: 60,
        tabCategory: 'cheats',
        tabLabel: 'Cheats',
        subCategory: 'CS2',
        status_text: 'VAC Bypass',
        status_color: '#22c55e'
    },
    {
        id: 2007,
        name: 'Apex Legends - Glow & Recoil Master',
        description: 'Item Highlight, Triggerbot, Auto Strafe · Easy Anti-Cheat Safe',
        price: '11.99',
        price_slash: '20.00',
        stock: 35,
        tabCategory: 'cheats',
        tabLabel: 'Cheats',
        subCategory: 'Apex Legends',
        status_text: 'Undetected',
        status_color: '#22c55e'
    },
    {
        id: 2008,
        name: 'Fortnite - Softaim & Skeleton Visuals',
        description: 'Tournament Mode, FOV Slider, Visible Check · BattlEye Safe',
        price: '13.99',
        price_slash: '25.00',
        stock: 40,
        tabCategory: 'cheats',
        tabLabel: 'Cheats',
        subCategory: 'Fortnite',
        status_text: 'Undetected',
        status_color: '#22c55e'
    },
    {
        id: 2009,
        name: 'Valorant - Hardware Colorbot Suite',
        description: 'Vanguard Ring-0 Compatible, Smooth Interpolation, Auto Pistol',
        price: '16.99',
        price_slash: '30.00',
        stock: 20,
        tabCategory: 'cheats',
        tabLabel: 'Cheats',
        subCategory: 'Valorant',
        status_text: 'Vanguard Safe',
        status_color: '#22c55e'
    },
    {
        id: 2010,
        name: 'Call of Duty - Warzone Engine',
        description: 'Ricochet Safe Kernel Driver, 2D Radar, Constant UAV Pulse',
        price: '14.99',
        price_slash: '28.00',
        stock: 30,
        tabCategory: 'cheats',
        tabLabel: 'Cheats',
        subCategory: 'Call of Duty',
        status_text: 'Undetected',
        status_color: '#22c55e'
    },
    {
        id: 2011,
        name: 'Rainbow Six Siege - Recoil & Box ESP',
        description: 'Trap Detection, Cav ESP, Weapon Shake Elimination',
        price: '10.99',
        price_slash: '20.00',
        stock: 25,
        tabCategory: 'cheats',
        tabLabel: 'Cheats',
        subCategory: 'Rainbow Six',
        status_text: 'Undetected',
        status_color: '#22c55e'
    },
    {
        id: 2012,
        name: 'GTA V - Enhanced Mod Menu & Recovery',
        description: 'Heist Teleport, Unlocks, Godmode, Car Spawner · Clean Status',
        price: '8.99',
        price_slash: '16.00',
        stock: 50,
        tabCategory: 'cheats',
        tabLabel: 'Cheats',
        subCategory: 'GTA V',
        status_text: 'BattlEye Safe',
        status_color: '#22c55e'
    },

    // Extra (3)
    {
        id: 3001,
        name: 'Discord Server Boosts [ 3 Month ]',
        description: '14x Server Boosts · Level 3 Perks · Instant Auto Transfer',
        price: '7.99',
        price_slash: '15.00',
        stock: 45,
        tabCategory: 'extra',
        tabLabel: 'Extra',
        subCategory: 'Server Boosts',
        status_text: 'Level 3',
        status_color: '#5865F2'
    },
    {
        id: 3002,
        name: 'Discord Nitro [ 1 Year Subscription ]',
        description: 'Full Nitro with 2 Server Boosts · Redeemable Activation Key',
        price: '19.99',
        price_slash: '45.00',
        stock: 20,
        tabCategory: 'extra',
        tabLabel: 'Extra',
        subCategory: 'Discord Nitro',
        status_text: 'Global Key',
        status_color: '#5865F2'
    },
    {
        id: 3003,
        name: 'Spotify Premium [ Lifetime Upgrade ]',
        description: 'Apply to existing account · No ads, unlimited skips, offline music',
        price: '4.99',
        price_slash: '12.00',
        stock: 30,
        tabCategory: 'extra',
        tabLabel: 'Extra',
        subCategory: 'Spotify',
        status_text: 'Lifetime',
        status_color: '#22c55e'
    }
];


document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Crimson Cyber Particles Canvas ──
    initCyberCanvas();

    // ── 2. Ambient Red Spotlight Follower ──
    initAmbientGlow();

    // ── 3. Scroll Progress Indicator ──
    initScrollProgress();

    // ── 4. 3D Tilt on Feature & Stat Cards ──
    document.querySelectorAll('.feature-card, .stat-card').forEach(card => {
        applyCardTilt(card);
    });

    // ── 5. Button Ripple Effects ──
    initButtonRipples();

    // ── 6. Navbar Scroll Blur ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
    });

    // ── 7. Mobile Menu Toggle ──
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            mobileToggle.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // ── 8. FAQ Accordion ──
    initFaqAccordion();

    // ── 9. Animated Telemetry Counters with Crimson Flash ──
    initAnimatedCounters();

    // ── 10. Scroll Reveal Animations ──
    initScrollReveals();

    // ── 11. Smooth Anchor Scrolling ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ── 12. Modal Close Listeners ──
    const modalOverlay = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ── 13. Load Live Inventory & Real Stats from SellAuth ──
    loadProducts();
    loadShopStats();

    // ── 14. Real-Time Auto-Sync with SellAuth Dashboard ──
    initLiveAutoSync();

    // ── 15. Instant Catalog Search, Stock Filter & Sorting Controls ──
    initCatalogControls();

    // ── 16. Real-Time Social Proof Live Purchase Toast ──
    initPurchaseToast();
});


// ════════════════════════════════════════════════════════
//  1. Pure Crimson Cyber Ember Canvas
// ════════════════════════════════════════════════════════

function initCyberCanvas() {
    const canvas = document.getElementById('cyber-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: -1000, y: -1000, radius: 140 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particleCount = Math.min(Math.floor(window.innerWidth / 18), 75);
    const particles = [];

    const colors = [
        'rgba(255, 30, 56, ',   // Electric Crimson
        'rgba(255, 60, 85, ',   // Bright Crimson
        'rgba(212, 12, 36, ',   // Deep Blood Red
        'rgba(255, 230, 235, '  // White-hot spark
    ];

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.2 + 0.7,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -Math.random() * 0.6 - 0.25,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: Math.random() * 0.65 + 0.2,
            pulseSpeed: Math.random() * 0.02 + 0.008,
            pulseOffset: Math.random() * Math.PI * 2
        });
    }

    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, width, height);
        frame++;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 95) {
                    const lineAlpha = (1 - dist / 95) * 0.14;
                    ctx.strokeStyle = `rgba(255, 30, 56, ${lineAlpha})`;
                    ctx.lineWidth = 0.75;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        particles.forEach((p) => {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                p.x -= Math.cos(angle) * force * 1.8;
                p.y -= Math.sin(angle) * force * 1.8;
            }

            p.x += p.vx;
            p.y += p.vy;

            if (p.y < -10) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;

            const dynamicAlpha = p.alpha + Math.sin(frame * p.pulseSpeed + p.pulseOffset) * 0.15;
            const finalAlpha = Math.max(0.08, Math.min(0.85, dynamicAlpha));

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `${p.color}${finalAlpha})`;
            ctx.shadowColor = 'rgba(255, 30, 56, 0.8)';
            ctx.shadowBlur = p.radius * 3.5;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        requestAnimationFrame(animate);
    }

    animate();
}


// ════════════════════════════════════════════════════════
//  2. Ambient Crimson Spotlight Follower
// ════════════════════════════════════════════════════════

function initAmbientGlow() {
    const ambientGlow = document.getElementById('ambient-glow');
    if (!ambientGlow) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function updateGlow() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        ambientGlow.style.left = `${currentX}px`;
        ambientGlow.style.top = `${currentY}px`;

        requestAnimationFrame(updateGlow);
    }
    updateGlow();
}


// ════════════════════════════════════════════════════════
//  3. Scroll Progress Bar
// ════════════════════════════════════════════════════════

function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            bar.style.width = `${progress}%`;
        }
    });
}


// ════════════════════════════════════════════════════════
//  4. 3D Card Tilt & Specular Sheen
// ════════════════════════════════════════════════════════

function applyCardTilt(card) {
    if (!card) return;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
    });
}


// ════════════════════════════════════════════════════════
//  5. Button Click Ripples
// ════════════════════════════════════════════════════════

function initButtonRipples() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-primary, .btn-ghost, .btn-discord, .btn-nav-shop, .btn-buy-lg, .tab-btn, .sub-filter-btn');
        if (!btn) return;

        const circle = document.createElement('span');
        const diameter = Math.max(btn.clientWidth, btn.clientHeight);
        const radius = diameter / 2;

        const rect = btn.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.style.position = 'absolute';
        circle.style.borderRadius = '50%';
        circle.style.background = 'rgba(255, 255, 255, 0.4)';
        circle.style.transform = 'scale(0)';
        circle.style.animation = 'rippleExpand 0.6s ease-out';
        circle.style.pointerEvents = 'none';

        const existingRipple = btn.querySelector('.ripple-effect');
        if (existingRipple) existingRipple.remove();

        circle.classList.add('ripple-effect');
        btn.appendChild(circle);

        setTimeout(() => circle.remove(), 600);
    });

    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.innerHTML = `
            @keyframes rippleExpand {
                to { transform: scale(3.5); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}


// ════════════════════════════════════════════════════════
//  8. FAQ Accordion
// ════════════════════════════════════════════════════════

function initFaqAccordion() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            items.forEach(other => other.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}


// ════════════════════════════════════════════════════════
//  9. Animated Telemetry Counters with Crimson Flash
// ════════════════════════════════════════════════════════

function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2200;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const eased = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(eased * target);
                const prefix = counter.getAttribute('data-prefix') || '';

                counter.textContent = prefix + current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = prefix + target.toLocaleString();
                    counter.style.textShadow = '0 0 28px rgba(255, 30, 56, 0.9)';
                    setTimeout(() => {
                        counter.style.textShadow = '';
                    }, 800);
                }
            }
            requestAnimationFrame(updateCounter);
        });
    }

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });
        statsObserver.observe(statsSection);
    }
}


// ════════════════════════════════════════════════════════
//  10. Scroll Reveal Animations
// ════════════════════════════════════════════════════════

function initScrollReveals() {
    const fadeElements = document.querySelectorAll(
        '.feature-card, .stat-card, .cta-container, .section-header, .faq-item'
    );
    fadeElements.forEach(el => el.classList.add('fade-in'));

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = parent ? [...parent.children].filter(c => c.classList.contains('fade-in')) : [];
                const index = siblings.indexOf(entry.target);

                setTimeout(() => entry.target.classList.add('visible'), Math.max(0, index * 75));
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeElements.forEach(el => fadeObserver.observe(el));
}


// ════════════════════════════════════════════════════════
//  SellAuth Dynamic Inventory Engine & Auto-Classification
// ════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════
//  SellAuth Dynamic Inventory Engine & Auto-Classification
// ════════════════════════════════════════════════════════

async function loadProducts(isBackground = false) {
    const loadingEl = document.getElementById('products-loading');
    const errorEl = document.getElementById('products-error');
    const gridEl = document.getElementById('products-grid');

    if (!isBackground) {
        if (loadingEl) loadingEl.classList.remove('hidden');
        if (errorEl) errorEl.classList.add('hidden');
        if (gridEl) gridEl.classList.add('hidden');
    }

    try {
        let apiProducts = [];
        let apiCategories = [];
        let apiGroups = [];

        try {
            // Fetch products, categories, and groups concurrently
            const [productsRes, groupsRes, categoriesRes] = await Promise.all([
                fetchAllPages(`${SELLAUTH_API_BASE}/shops/${SELLAUTH_SHOP_ID}/products`),
                fetchAllPages(`${SELLAUTH_API_BASE}/shops/${SELLAUTH_SHOP_ID}/groups`).catch(e => {
                    console.warn('SellAuth Groups notice:', e);
                    return [];
                }),
                fetchAllPages(`${SELLAUTH_API_BASE}/shops/${SELLAUTH_SHOP_ID}/categories`).catch(e => {
                    console.warn('SellAuth Categories notice:', e);
                    return [];
                })
            ]);

            apiProducts = (productsRes || []).filter(p => p.visibility === 'public' && !p.deleted_at && !p.terminated_at);
            apiGroups = groupsRes || [];
            apiCategories = categoriesRes || [];
        } catch (apiErr) {
            console.warn('SellAuth API note:', apiErr);
        }

        // Sort categories strictly according to SellAuth dashboard order (order: 0, 1, 2...)
        if (apiCategories && apiCategories.length > 0) {
            apiCategories.sort((a, b) => {
                const orderA = (a.order !== undefined && a.order !== null) ? Number(a.order) : 9999;
                const orderB = (b.order !== undefined && b.order !== null) ? Number(b.order) : 9999;
                if (orderA !== orderB) return orderA - orderB;
                return (a.id || 0) - (b.id || 0);
            });
        }

        // Sort groups strictly according to SellAuth dashboard order
        if (apiGroups && apiGroups.length > 0) {
            apiGroups.sort((a, b) => {
                const orderA = (a.order !== undefined && a.order !== null) ? Number(a.order) : 9999;
                const orderB = (b.order !== undefined && b.order !== null) ? Number(b.order) : 9999;
                if (orderA !== orderB) return orderA - orderB;
                return (a.id || 0) - (b.id || 0);
            });
        }

        allCategories = apiCategories;
        allGroups = apiGroups;

        // If merchant has created products in SellAuth:
        if (apiProducts.length > 0) {
            apiProducts.forEach(p => classifyProduct(p, allCategories, allGroups));
            allProducts = apiProducts;
        } else {
            // Starter showcase mapped into the user's SellAuth categories so they are populated while adding items
            const starterProducts = DEFAULT_PRODUCTS.map(p => ({ ...p }));
            starterProducts.forEach(p => classifyProduct(p, allCategories, allGroups));
            allProducts = starterProducts;
        }

        if (loadingEl) loadingEl.classList.add('hidden');

        // Render SellAuth category tabs with live product counts
        renderCategoryTabs();

        // Render dynamic game sub-filters
        renderSubFilters();

        // Render filtered product cards
        renderProducts();

    } catch (err) {
        console.error('Failed to initialize products:', err);
        if (!isBackground) {
            if (loadingEl) loadingEl.classList.add('hidden');
            if (errorEl) errorEl.classList.remove('hidden');
        }
    }
}

// Fetch and sync real live order count and metrics from SellAuth
async function loadShopStats() {
    try {
        const [statsRes, invoicesRes] = await Promise.all([
            fetch(`${SELLAUTH_API_BASE}/shops/${SELLAUTH_SHOP_ID}/stats`, {
                headers: { 'Authorization': `Bearer ${SELLAUTH_API_KEY}` }
            }).then(r => r.ok ? r.json() : null).catch(() => null),
            fetch(`${SELLAUTH_API_BASE}/shops/${SELLAUTH_SHOP_ID}/invoices`, {
                headers: { 'Authorization': `Bearer ${SELLAUTH_API_KEY}` }
            }).then(r => r.ok ? r.json() : null).catch(() => null)
        ]);

        let realOrders = 0;
        if (statsRes) {
            realOrders = Number(statsRes.total_completed_invoices ?? statsRes.products_sold ?? 0);
        }
        if (invoicesRes && invoicesRes.total !== undefined && invoicesRes.total > realOrders) {
            realOrders = invoicesRes.total;
        }

        const orderCountEl = document.getElementById('live-order-count');
        const orderSuffixEl = document.getElementById('live-order-suffix');
        const orderLabelEl = document.getElementById('live-order-label');

        if (orderCountEl) {
            orderCountEl.setAttribute('data-target', realOrders);
            orderCountEl.textContent = realOrders.toLocaleString();
            if (orderSuffixEl) {
                orderSuffixEl.textContent = realOrders >= 100 ? '+' : '';
            }
            if (orderLabelEl) {
                orderLabelEl.textContent = 'Live Orders';
            }
        }

        // Live Reviews & Rating from SellAuth
        if (statsRes) {
            const feedbackCountEl = document.getElementById('live-feedback-count');
            const feedbackLabelEl = document.getElementById('live-feedback-label');
            const feedbackSuffixEl = document.getElementById('live-feedback-suffix');

            if (statsRes.total_feedbacks > 0) {
                const ratingPercent = statsRes.average_rating ? Math.round((statsRes.average_rating / 5) * 100) : 100;
                if (feedbackCountEl) {
                    feedbackCountEl.setAttribute('data-target', ratingPercent);
                    feedbackCountEl.textContent = ratingPercent;
                }
                if (feedbackSuffixEl) {
                    feedbackSuffixEl.textContent = '%';
                }
                if (feedbackLabelEl) {
                    feedbackLabelEl.textContent = `${statsRes.total_feedbacks} Verified Review${statsRes.total_feedbacks === 1 ? '' : 's'}`;
                }
            } else {
                if (feedbackCountEl) {
                    feedbackCountEl.setAttribute('data-target', 100);
                    feedbackCountEl.textContent = '100';
                }
                if (feedbackLabelEl) {
                    feedbackLabelEl.textContent = 'Positive Feedback';
                }
            }
        }
    } catch (err) {
        console.warn('SellAuth live stats notice:', err);
    }
}

// Automatically sync with SellAuth dashboard so any categories, products, or orders appear instantly
function initLiveAutoSync() {
    // 1. Periodic background polling every 15 seconds
    if (!syncInterval) {
        syncInterval = setInterval(() => {
            loadProducts(true);
            loadShopStats();
        }, 15000);
    }

    // 2. Immediate re-sync when merchant switches back to this tab
    window.addEventListener('focus', () => {
        loadProducts(true);
        loadShopStats();
    });
}

// Automatically classify products based on SellAuth Categories and Groups
function classifyProduct(p, categories, groups) {
    if (p.description) {
        p.description = stripHtmlToCleanText(p.description);
    }
    let matchedCategory = null;

    // 1. Match against SellAuth Category
    if (p.category && (p.category.name || p.category.title)) {
        matchedCategory = {
            id: `cat-${p.category.id || p.category.name.toLowerCase().replace(/\s+/g, '-')}`,
            label: p.category.name || p.category.title
        };
    } else if (p.category_id && categories && categories.length > 0) {
        const cat = categories.find(c => c.id == p.category_id);
        if (cat) {
            matchedCategory = {
                id: `cat-${cat.id}`,
                label: cat.name || cat.title || 'Category'
            };
        }
    }

    // 2. Match against SellAuth Group
    if (!matchedCategory) {
        if (p.group && (p.group.name || p.group.title)) {
            matchedCategory = {
                id: `group-${p.group.id || p.group.name.toLowerCase().replace(/\s+/g, '-')}`,
                label: p.group.name || p.group.title
            };
        } else if (p.group_id && groups && groups.length > 0) {
            const grp = groups.find(g => g.id == p.group_id);
            if (grp) {
                matchedCategory = {
                    id: `group-${grp.id}`,
                    label: grp.name || grp.title || 'Group'
                };
            }
        }
    }

    // 3. Name-based matching if category name is found in product name (e.g. "NFA's" -> "Rust NFA", "Cheats" -> "Rust Cheat")
    if (!matchedCategory && categories && categories.length > 0) {
        const cat = categories.find(c => {
            const raw = (c.name || c.title || '').replace(/['’]s\b/i, '').trim();
            if (!raw || raw.toLowerCase() === 'other') return false;
            return new RegExp('\\b' + raw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i').test(p.name);
        });
        if (cat) {
            matchedCategory = {
                id: `cat-${cat.id}`,
                label: cat.name || cat.title
            };
        }
    }

    if (!matchedCategory && groups && groups.length > 0) {
        const grp = groups.find(g => {
            const raw = (g.name || g.title || '').replace(/['’]s\b/i, '').trim();
            if (!raw || raw.toLowerCase() === 'other') return false;
            return new RegExp('\\b' + raw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i').test(p.name);
        });
        if (grp) {
            matchedCategory = {
                id: `group-${grp.id}`,
                label: grp.name || grp.title
            };
        }
    }

    // 4. Default fallback matching if product has no explicit category
    if (!matchedCategory) {
        const otherCat = categories && categories.find(c => (c.name || '').trim().toLowerCase() === 'other');
        const otherGrp = groups && groups.find(g => (g.name || '').trim().toLowerCase() === 'other');

        if (otherCat) {
            matchedCategory = { id: `cat-${otherCat.id}`, label: otherCat.name };
        } else if (otherGrp) {
            matchedCategory = { id: `group-${otherGrp.id}`, label: otherGrp.name };
        }
    }

    // 5. Hard fallback if no categories exist at all
    if (matchedCategory) {
        p.tabCategory = matchedCategory.id;
        p.tabLabel = matchedCategory.label;
    } else {
        const nameLower = (p.name || '').toLowerCase();
        if (nameLower.includes('cheat') || nameLower.includes('dma') || nameLower.includes('aimbot') || nameLower.includes('esp')) {
            p.tabCategory = 'cheats';
            p.tabLabel = 'Cheats';
        } else if (nameLower.includes('boost') || nameLower.includes('nitro') || nameLower.includes('spotify') || nameLower.includes('key')) {
            p.tabCategory = 'extra';
            p.tabLabel = 'Extra';
        } else if (nameLower.includes('nfa') || nameLower.includes('account') || nameLower.includes('steam') || nameLower.includes('ranked')) {
            p.tabCategory = 'nfa';
            p.tabLabel = 'NFA';
        } else {
            p.tabCategory = 'other';
            p.tabLabel = 'Other';
        }
    }

    // 6. Automatically extract Game / Title for Sub-Filters
    const games = [
        'Rust',
        'Arc Raiders',
        'Battlefield 6',
        'Battlefield',
        'Escape From Tarkov',
        'Tarkov',
        'DayZ',
        'CS2',
        'Counter-Strike',
        'Fortnite',
        'GTA V',
        'GTA',
        'Call of Duty',
        'Warzone',
        'Valorant',
        'Rainbow Six',
        'R6',
        'Apex Legends',
        'Minecraft',
        'Overwatch',
        'Server Boosts',
        'Discord Nitro',
        'Spotify'
    ];

    let matchedGame = null;
    for (const g of games) {
        if (new RegExp('\\b' + g.replace(/\s+/g, '\\s+') + '\\b', 'i').test(p.name)) {
            matchedGame = g;
            break;
        }
    }

    if (matchedGame) {
        p.subCategory = matchedGame;
    } else {
        p.subCategory = p.name.replace(/NFA|Accounts?|Cheats?|Keys?|\[.*?\]/gi, '').trim() || p.name;
    }

    // Assign branded fallback graphics if product doesn't have an uploaded image
    if (!p.image && (!p.images || p.images.length === 0)) {
        if (p.tabCategory === 'cheats' || (p.tabLabel && p.tabLabel.toLowerCase().includes('cheat')) || p.category_id == 24122 || (p.name && p.name.toLowerCase().includes('cheat'))) {
            p.image = 'cheats-card.jpg';
        } else {
            p.image = 'nfa-card.png';
        }
    }
}

async function fetchAllPages(url) {
    let allData = [];
    let page = 1;
    let lastPage = 1;

    do {
        const res = await fetch(`${url}?page=${page}`, {
            headers: { 'Authorization': `Bearer ${SELLAUTH_API_KEY}` }
        });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json = await res.json();
        allData = allData.concat(json.data || []);
        lastPage = json.last_page || 1;
        page++;
    } while (page <= lastPage);

    return allData;
}


// ── Render Top Category Tabs strictly in order from SellAuth ──
function renderCategoryTabs() {
    const container = document.getElementById('category-tabs');
    if (!container) return;
    container.innerHTML = '';

    let tabs = [];
    const seenNames = new Set();

    // 1. Add categories created in SellAuth (sorted by order)
    if (allCategories && allCategories.length > 0) {
        allCategories.forEach(cat => {
            const name = cat.name || cat.title || 'Category';
            if (!seenNames.has(name.toLowerCase())) {
                seenNames.add(name.toLowerCase());
                tabs.push({
                    id: `cat-${cat.id}`,
                    label: name,
                    order: (cat.order !== undefined && cat.order !== null) ? Number(cat.order) : 9999
                });
            }
        });
    }

    // 2. Add groups created in SellAuth (sorted by order)
    if (allGroups && allGroups.length > 0) {
        allGroups.forEach(grp => {
            const name = grp.name || grp.title || 'Group';
            if (!seenNames.has(name.toLowerCase())) {
                seenNames.add(name.toLowerCase());
                tabs.push({
                    id: `group-${grp.id}`,
                    label: name,
                    order: (grp.order !== undefined && grp.order !== null) ? Number(grp.order) : 9999
                });
            }
        });
    }

    // Sort tabs strictly by SellAuth order
    tabs.sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        return 0;
    });

    // 3. Fallback to product-derived or default categories if neither categories nor groups exist
    if (tabs.length === 0) {
        const uniqueCategories = [];
        allProducts.forEach(p => {
            if (p.tabCategory && !uniqueCategories.some(u => u.id === p.tabCategory)) {
                uniqueCategories.push({
                    id: p.tabCategory,
                    label: p.tabLabel || p.tabCategory.toUpperCase()
                });
            }
        });

        tabs = uniqueCategories.length > 0 ? uniqueCategories : [
            { id: 'nfa', label: 'NFA' },
            { id: 'cheats', label: 'Cheats' },
            { id: 'extra', label: 'Extra' }
        ];
    } else {
        // If there are products without a matching category or group tab, add an "Other" tab if not already present
        const knownTabIds = new Set(tabs.map(t => t.id));
        const uncategorizedCount = allProducts.filter(p => !knownTabIds.has(p.tabCategory)).length;
        if (uncategorizedCount > 0 && !tabs.some(t => t.label.toLowerCase() === 'other')) {
            tabs.push({ id: 'other', label: 'Other', order: 99999 });
        }
    }

    // Ensure current active tab is valid
    if (!currentTab || !tabs.some(t => t.id === currentTab)) {
        currentTab = tabs[0] ? tabs[0].id : 'all';
    }

    tabs.forEach(tab => {
        let count = 0;
        if (tab.id === 'other') {
            const knownTabIds = new Set(tabs.filter(t => t.id !== 'other').map(t => t.id));
            count = allProducts.filter(p => !knownTabIds.has(p.tabCategory)).length;
        } else {
            count = allProducts.filter(p => p.tabCategory === tab.id).length;
        }

        const btn = document.createElement('button');
        btn.className = `tab-btn ${tab.id === currentTab ? 'active' : ''}`;
        btn.innerHTML = `${escapeHtml(tab.label)} <span class="count">${count}</span>`;

        btn.addEventListener('click', () => {
            currentTab = tab.id;
            currentSubFilter = 'All';
            renderCategoryTabs();
            renderSubFilters();
            renderProducts();
        });

        container.appendChild(btn);
    });
}


function getActiveTabProducts() {
    return allProducts.filter(p => {
        if (currentTab === 'all') return true;
        if (currentTab === 'other') {
            const isKnown = (allCategories || []).some(c => p.tabCategory === `cat-${c.id}`) ||
                            (allGroups || []).some(g => p.tabCategory === `group-${g.id}`);
            return !isKnown;
        }
        return p.tabCategory === currentTab;
    });
}

// ── Render Sub-Filters (All, Rust, Arc Raiders, Battlefield 6, etc.) ──
function renderSubFilters() {
    const container = document.getElementById('sub-filters');
    if (!container) return;
    container.innerHTML = '';

    const tabProducts = getActiveTabProducts();
    if (tabProducts.length === 0) return;

    const uniqueGames = ['All', ...new Set(tabProducts.map(p => p.subCategory).filter(Boolean))];

    if (!uniqueGames.includes(currentSubFilter)) {
        currentSubFilter = 'All';
    }

    uniqueGames.forEach(game => {
        const btn = document.createElement('button');
        btn.className = `sub-filter-btn ${game === currentSubFilter ? 'active' : ''}`;
        btn.textContent = game;

        btn.addEventListener('click', () => {
            currentSubFilter = game;
            renderSubFilters();
            renderProducts();
        });

        container.appendChild(btn);
    });
}


// ── Render Products Based on Active Tab, Sub-Filter, Search & Sort ──
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const tabProducts = getActiveTabProducts();
    let filtered = currentSubFilter === 'All'
        ? [...tabProducts]
        : tabProducts.filter(p => p.subCategory === currentSubFilter);

    // 1. In Stock Only Filter
    if (filterInStockOnly) {
        filtered = filtered.filter(p => {
            const stock = getProductStock(p);
            return stock === null || stock > 0;
        });
    }

    // 2. Search Query Filter
    if (currentSearchQuery) {
        const q = currentSearchQuery.toLowerCase();
        filtered = filtered.filter(p => {
            const matchName = (p.name || '').toLowerCase().includes(q);
            const matchSub = (p.subCategory || '').toLowerCase().includes(q);
            const matchDesc = (p.description || '').toLowerCase().includes(q);
            const matchTab = (p.tabLabel || '').toLowerCase().includes(q);
            const matchVariants = (p.variants || []).some(v => (v.name || '').toLowerCase().includes(q));
            return matchName || matchSub || matchDesc || matchTab || matchVariants;
        });
    }

    // 3. Sorting
    if (currentSortOption === 'price-asc') {
        filtered.sort((a, b) => parseFloat(getProductPrice(a).current) - parseFloat(getProductPrice(b).current));
    } else if (currentSortOption === 'price-desc') {
        filtered.sort((a, b) => parseFloat(getProductPrice(b).current) - parseFloat(getProductPrice(a).current));
    } else if (currentSortOption === 'stock') {
        filtered.sort((a, b) => {
            const stockA = getProductStock(a) !== null ? getProductStock(a) : 999;
            const stockB = getProductStock(b) !== null ? getProductStock(b) : 999;
            return stockB - stockA;
        });
    }

    // 4. Update count badge
    const countBadge = document.getElementById('products-count-badge');
    if (countBadge) {
        countBadge.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-catalog" style="text-align:center;grid-column:1/-1;padding:60px 20px;">
                <p style="font-size:1.15rem;color:var(--text-primary);font-weight:800;margin-bottom:8px;">No Matching Products Found</p>
                <span style="color:var(--text-muted);font-size:0.9rem;">Try clearing your search query or adjusting your filters.</span>
                <div style="margin-top:18px;">
                    <button class="btn-ghost-sm" onclick="resetCatalogFilters()">Reset All Filters</button>
                </div>
            </div>
        `;
        grid.classList.remove('hidden');
        return;
    }

    filtered.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
        applyCardTilt(card);
    });

    grid.classList.remove('hidden');

    // Stagger fade-in animation
    setTimeout(() => {
        grid.querySelectorAll('.product-card').forEach((card, i) => {
            card.classList.add('fade-in');
            setTimeout(() => card.classList.add('visible'), i * 40);
        });
    }, 40);
}

function isCheatProduct(product) {
    if (!product) return false;
    const tabLabel = (product.tabLabel || '').toLowerCase();
    const tabCategory = (product.tabCategory || '').toLowerCase();
    const catName = (product.category && (product.category.name || product.category.title)) ? (product.category.name || product.category.title).toLowerCase() : '';
    const name = (product.name || '').toLowerCase();
    
    return tabLabel.includes('cheat') || 
           tabCategory.includes('cheat') || 
           catName.includes('cheat') || 
           product.category_id == 24122 || 
           name.includes('cheat') || 
           name.includes('aimbot') || 
           name.includes('esp') || 
           name.includes('radar');
}

function isAccountProduct(product) {
    if (!product || isCheatProduct(product)) return false;
    const tabLabel = (product.tabLabel || '').toLowerCase();
    const tabCategory = (product.tabCategory || '').toLowerCase();
    const name = (product.name || '').toLowerCase();
    return tabLabel.includes('nfa') || 
           tabLabel.includes('account') || 
           tabCategory.includes('nfa') || 
           tabCategory.includes('account') || 
           name.includes('nfa') || 
           name.includes('account') ||
           product.category_id == 24121;
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.addEventListener('click', () => openModal(product));

    const totalStock = getProductStock(product);
    const isInStock = totalStock === null || totalStock > 0;
    const priceInfo = getProductPrice(product);
    const hasImages = product.images && product.images.length > 0;
    let imageUrl = hasImages ? product.images[0].url : (product.image || null);
    if (!imageUrl) {
        if (isCheatProduct(product)) {
            imageUrl = 'cheats-card.jpg';
        } else if (isAccountProduct(product)) {
            imageUrl = 'nfa-card.png';
        }
    }

    let html = '';

    // 16:9 Card Media Banner with integrated stock badge
    html += `<div class="product-image-wrap ${imageUrl ? 'has-image' : 'has-placeholder'}">`;
    html += `<div class="product-badge ${isInStock ? 'in-stock' : 'out-of-stock'}">
        ${isInStock ? (totalStock !== null ? `${totalStock} In Stock` : 'In Stock') : 'Out of Stock'}
    </div>`;

    if (imageUrl) {
        html += `<img src="${imageUrl}" alt="${escapeHtml(product.name)}" loading="lazy">`;
    } else {
        html += `<div class="product-icon-wrap">⚡</div>`;
    }
    html += `</div>`;

    // Card Body
    html += `<div class="product-card-body">`;
    html += `<h3>${escapeHtml(product.name)}</h3>`;
    
    // Description (Exclude account boilerplate from Cheats)
    const isCheat = isCheatProduct(product);
    let desc = stripHtmlToCleanText(product.description);
    if (isCheat && (desc.toLowerCase().includes('pre-checked') || desc.toLowerCase().includes('verified account'))) {
        desc = '';
    }
    if (!desc && !isCheat && isAccountProduct(product)) {
        desc = 'Verified account · Pre-checked credentials · Instant fulfillment';
    }
    if (desc) {
        html += `<p class="product-desc">${escapeHtml(desc)}</p>`;
    }

    // Status Pill
    if (product.status_text) {
        html += `<div class="product-meta">
            <span class="product-meta-item" ${product.status_color ? `style="color:${product.status_color};border-color:${product.status_color}44;"` : ''}>
                ${escapeHtml(product.status_text)}
            </span>
        </div>`;
    }

    // Footer with Price and View Details
    html += `<div class="product-footer">
        <div>`;
    if (priceInfo.slashed) {
        html += `<span class="product-price-slash">$${priceInfo.slashed}</span>`;
    }
    html += `<span class="product-price">$${priceInfo.current}</span>
        </div>
        <span class="view-details-hint">
            Inspect
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
    </div>`;
    html += `</div>`; // end product-card-body

    card.innerHTML = html;
    return card;
}


// ════════════════════════════════════════════════════════
//  Modal Controls & Direct Checkout Link
// ════════════════════════════════════════════════════════

function openModal(product) {
    currentModalProduct = product;
    const modal = document.getElementById('product-modal');
    const imageCol = document.getElementById('modal-image-col');
    const badgeRow = document.getElementById('modal-badge-row');
    const titleEl = document.getElementById('modal-title');
    const descEl = document.getElementById('modal-desc');
    const descWrap = document.getElementById('modal-desc-wrap');
    const detailsEl = document.getElementById('modal-details');
    const variantsWrap = document.getElementById('modal-variants-wrap');
    const priceEl = document.getElementById('modal-price');
    const priceSlashEl = document.getElementById('modal-price-slash');
    const stockEl = document.getElementById('modal-stock');
    const buyWrap = document.getElementById('modal-buy-wrap');

    // Image (Supports 16:9 card graphics from SellAuth or local cards)
    const hasImages = product.images && product.images.length > 0;
    let imageUrl = hasImages ? product.images[0].url : (product.image || null);
    if (!imageUrl) {
        if (isCheatProduct(product)) {
            imageUrl = 'cheats-card.jpg';
        } else if (isAccountProduct(product)) {
            imageUrl = 'nfa-card.png';
        }
    }
    if (imageUrl) {
        imageCol.innerHTML = `<img src="${imageUrl}" alt="${escapeHtml(product.name)}">`;
    } else {
        imageCol.innerHTML = `<div class="modal-icon-placeholder">⚡</div>`;
    }

    // Badges
    const totalStock = getProductStock(product);
    const isInStock = totalStock === null || totalStock > 0;
    let badgeHtml = '';
    if (product.tabLabel) {
        badgeHtml += `<span class="modal-detail-pill">${escapeHtml(product.tabLabel)}</span>`;
    }
    if (product.subCategory) {
        badgeHtml += `<span class="modal-detail-pill">${escapeHtml(product.subCategory)}</span>`;
    }
    badgeRow.innerHTML = badgeHtml;

    // Title & Description (rendered under the product image)
    titleEl.textContent = product.name;
    const isCheat = isCheatProduct(product);
    let modalDesc = stripHtmlToCleanText(product.description);
    if (isCheat && (modalDesc.toLowerCase().includes('pre-checked') || modalDesc.toLowerCase().includes('verified account'))) {
        modalDesc = '';
    }
    if (!modalDesc) {
        if (isCheat) {
            modalDesc = 'Undetected & feature-rich software. Instant serial key dispatched immediately upon purchase.';
        } else if (isAccountProduct(product)) {
            modalDesc = 'Verified account · Pre-checked credentials · Delivered instantly.';
        } else {
            modalDesc = 'Instant digital delivery dispatched immediately upon purchase.';
        }
    }
    if (modalDesc) {
        descEl.textContent = modalDesc;
        if (descWrap) descWrap.style.display = 'flex';
    } else {
        descEl.textContent = '';
        if (descWrap) descWrap.style.display = 'none';
    }

    // Detail pills
    let detailHtml = '';
    detailHtml += `<span class="modal-detail-pill">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        Instant Auto-Delivery
    </span>`;
    detailHtml += `<span class="modal-detail-pill">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Verified Working
    </span>`;
    if (product.deliverables_type) {
        const typeLabel = product.deliverables_type === 'serials' ? 'Automated Serials' : product.deliverables_type;
        detailHtml += `<span class="modal-detail-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            ${typeLabel}
        </span>`;
    }
    if (product.status_text) {
        detailHtml += `<span class="modal-detail-pill" ${product.status_color ? `style="color:${product.status_color};border-color:${product.status_color}44;"` : ''}>${escapeHtml(product.status_text)}</span>`;
    }
    detailsEl.innerHTML = detailHtml;

    // Variants
    const variants = product.variants || [];
    if (variants.length > 1) {
        const firstVariant = variants[0];
        let customHtml = `
        <div class="variant-picker-container">
            <label class="variant-picker-label">Select Option / Duration</label>
            <div class="custom-variant-wrapper" id="custom-variant-select">
                <button type="button" class="custom-variant-trigger" id="custom-variant-trigger" onclick="toggleCustomVariantMenu(event)" aria-haspopup="listbox" aria-expanded="false">
                    <div class="trigger-info">
                        <span class="trigger-name" id="variant-selected-name">${escapeHtml(firstVariant.name)}</span>
                        <span class="trigger-price" id="variant-selected-price">$${parseFloat(firstVariant.price).toFixed(2)}</span>
                    </div>
                    <svg class="custom-variant-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="custom-variant-menu" id="custom-variant-menu" role="listbox">`;

        variants.forEach((v, i) => {
            const vPrice = parseFloat(v.price).toFixed(2);
            const vStock = v.stock !== null ? `${v.stock} left` : 'In Stock';
            const isSelected = i === 0;
            customHtml += `
                    <div class="custom-variant-item ${isSelected ? 'active' : ''}" role="option" aria-selected="${isSelected}" data-index="${i}" onclick="selectCustomVariant(${i})">
                        <div class="item-left">
                            <span class="item-radio"></span>
                            <span class="item-name">${escapeHtml(v.name)}</span>
                        </div>
                        <div class="item-right">
                            <span class="item-stock">${vStock}</span>
                            <span class="item-price">$${vPrice}</span>
                        </div>
                    </div>`;
        });

        customHtml += `
                </div>
            </div>
            <!-- Synced native select for complete compatibility -->
            <select class="variant-select" id="modal-variant-select" style="display:none;" onchange="onModalVariantChange()">`;
        variants.forEach((v, i) => {
            const vPrice = parseFloat(v.price).toFixed(2);
            const vStock = v.stock !== null ? ` (${v.stock} left)` : '';
            customHtml += `<option value="${v.id}" data-price="${v.price}" data-price-slash="${v.price_slash || ''}" data-stock="${v.stock}" ${i === 0 ? 'selected' : ''}>
                ${escapeHtml(v.name)} — $${vPrice}${vStock}
            </option>`;
        });
        customHtml += `
            </select>
        </div>`;
        variantsWrap.innerHTML = customHtml;
    } else {
        variantsWrap.innerHTML = '';
    }

    // Price
    const priceInfo = getProductPrice(product);
    priceEl.textContent = `$${priceInfo.current}`;
    priceSlashEl.textContent = priceInfo.slashed ? `$${priceInfo.slashed}` : '';

    // Stock Badge
    stockEl.className = 'modal-stock ' + (isInStock ? 'in-stock' : 'out-of-stock');
    if (isInStock) {
        stockEl.textContent = totalStock !== null ? `${totalStock} In Stock` : 'In Stock';
    } else {
        stockEl.textContent = 'Out of Stock';
    }

    // Purchase Link
    const firstVariant = variants[0];
    const checkoutUrl = buildCheckoutUrl(product.id, variants.length === 1 && firstVariant ? firstVariant.id : null);

    const buyButtonLabel = isCheat ? 'Purchase Key Now' : (isAccountProduct(product) ? 'Purchase Account Now' : 'Purchase Now');

    if (isInStock) {
        buyWrap.innerHTML = `<a href="${checkoutUrl}" target="_blank" class="btn-buy-lg" id="modal-buy-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            ${buyButtonLabel}
        </a>`;
    } else {
        buyWrap.innerHTML = `<button class="btn-buy-lg" disabled>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Out of Stock
        </button>`;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    const wrapper = document.getElementById('custom-variant-select');
    if (wrapper) wrapper.classList.remove('open');
    currentModalProduct = null;
}

window.toggleCustomVariantMenu = function(e) {
    if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
    const wrapper = document.getElementById('custom-variant-select');
    if (!wrapper) return;
    const isOpen = wrapper.classList.toggle('open');
    const trigger = document.getElementById('custom-variant-trigger');
    if (trigger) {
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
};

window.selectCustomVariant = function(index) {
    if (!currentModalProduct) return;
    const variants = currentModalProduct.variants || [];
    const variant = variants[index];
    if (!variant) return;

    // Update synced native select
    const select = document.getElementById('modal-variant-select');
    if (select) {
        select.selectedIndex = index;
    }

    // Trigger price, stock & checkout link updates
    onModalVariantChange();

    // Update trigger UI
    const nameEl = document.getElementById('variant-selected-name');
    const priceEl = document.getElementById('variant-selected-price');
    if (nameEl) nameEl.textContent = variant.name;
    if (priceEl) priceEl.textContent = `$${parseFloat(variant.price).toFixed(2)}`;

    // Update active highlight on custom items
    const items = document.querySelectorAll('.custom-variant-item');
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
            item.setAttribute('aria-selected', 'true');
        } else {
            item.classList.remove('active');
            item.setAttribute('aria-selected', 'false');
        }
    });

    // Close menu
    const wrapper = document.getElementById('custom-variant-select');
    if (wrapper) {
        wrapper.classList.remove('open');
        const trigger = document.getElementById('custom-variant-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
};

// Global click outside listener to close custom variant dropdown
document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('custom-variant-select');
    if (wrapper && wrapper.classList.contains('open')) {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
            const trigger = document.getElementById('custom-variant-trigger');
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
        }
    }
});

function onModalVariantChange() {
    if (!currentModalProduct) return;
    const select = document.getElementById('modal-variant-select');
    const selected = select.options[select.selectedIndex];
    const price = parseFloat(selected.getAttribute('data-price')).toFixed(2);
    const priceSlash = selected.getAttribute('data-price-slash');
    const stock = selected.getAttribute('data-stock');
    const variantId = parseInt(selected.value);

    document.getElementById('modal-price').textContent = `$${price}`;
    document.getElementById('modal-price-slash').textContent = priceSlash && priceSlash !== 'null' ? `$${parseFloat(priceSlash).toFixed(2)}` : '';

    const isInStock = stock === 'null' || stock === null || parseInt(stock) > 0;
    const stockEl = document.getElementById('modal-stock');
    stockEl.className = 'modal-stock ' + (isInStock ? 'in-stock' : 'out-of-stock');
    if (isInStock) {
        stockEl.textContent = stock !== 'null' && stock !== null ? `${stock} In Stock` : 'In Stock';
    } else {
        stockEl.textContent = 'Out of Stock';
    }

    const buyWrap = document.getElementById('modal-buy-wrap');
    const checkoutUrl = buildCheckoutUrl(currentModalProduct.id, variantId);

    const isCheat = isCheatProduct(currentModalProduct);
    const buyButtonLabel = isCheat ? 'Purchase Key Now' : (isAccountProduct(currentModalProduct) ? 'Purchase Account Now' : 'Purchase Now');

    if (isInStock) {
        buyWrap.innerHTML = `<a href="${checkoutUrl}" target="_blank" class="btn-buy-lg" id="modal-buy-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            ${buyButtonLabel}
        </a>`;
    } else {
        buyWrap.innerHTML = `<button class="btn-buy-lg" disabled>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Out of Stock
        </button>`;
    }
}

function buildCheckoutUrl(productId, variantId) {
    // If it's a starter demo product ID, redirect to shop storefront
    if (productId >= 1000 && productId <= 3999) {
        return SELLAUTH_SHOP_URL;
    }
    let url = `${SELLAUTH_SHOP_URL}/checkout-link?cart[0][productId]=${productId}&cart[0][quantity]=1`;
    if (variantId) {
        url += `&cart[0][variantId]=${variantId}`;
    }
    return url;
}

function getProductStock(product) {
    if (product.stock !== null && product.stock !== undefined) return product.stock;
    const variants = product.variants || [];
    if (variants.length === 0) return product.stock_count || 0;
    const hasNullStock = variants.some(v => v.stock === null);
    if (hasNullStock) return null;
    return variants.reduce((sum, v) => sum + (v.stock || 0), 0);
}

function getProductPrice(product) {
    const variants = product.variants || [];

    if (product.price !== null && product.price !== undefined) {
        return {
            current: parseFloat(product.price).toFixed(2),
            slashed: product.price_slash ? parseFloat(product.price_slash).toFixed(2) : null
        };
    }

    if (variants.length > 0) {
        const prices = variants.map(v => parseFloat(v.price));
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const slashed = variants[0].price_slash ? parseFloat(variants[0].price_slash).toFixed(2) : null;

        if (minPrice === maxPrice) {
            return { current: minPrice.toFixed(2), slashed };
        }
        return { current: `${minPrice.toFixed(2)}+`, slashed };
    }

    return { current: '0.00', slashed: null };
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function stripHtmlToCleanText(input) {
    if (!input || typeof input !== 'string') return '';
    if (!input.includes('<') && !input.includes('>')) return input.trim();

    // Convert break tags and block tags into natural newlines
    let formatted = input
        .replace(/<br\s*[\/]?>/gi, '\n')
        .replace(/<\/p>/gi, '\n')
        .replace(/<\/div>/gi, '\n')
        .replace(/<\/li>/gi, '\n')
        .replace(/<li>/gi, '• ');

    // Use a temporary DOM element to decode HTML entities and strip all HTML tags
    const tmp = document.createElement('div');
    tmp.innerHTML = formatted;
    let clean = tmp.textContent || tmp.innerText || '';

    // Normalize line breaks and remove excessive empty lines
    return clean.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

// ════════════════════════════════════════════════════════
//  Instant Catalog Search, Stock Filter & Sorting Engine
// ════════════════════════════════════════════════════════

function initCatalogControls() {
    const searchInput = document.getElementById('catalog-search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    const stockCheckbox = document.getElementById('filter-instock-only');
    const sortSelect = document.getElementById('catalog-sort-select');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.trim();
            if (clearBtn) {
                if (currentSearchQuery.length > 0) {
                    clearBtn.classList.remove('hidden');
                } else {
                    clearBtn.classList.add('hidden');
                }
            }
            renderProducts();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                currentSearchQuery = '';
                clearBtn.classList.add('hidden');
                renderProducts();
                searchInput.focus();
            }
        });
    }

    if (stockCheckbox) {
        stockCheckbox.addEventListener('change', (e) => {
            filterInStockOnly = e.target.checked;
            renderProducts();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSortOption = e.target.value;
            renderProducts();
        });
    }
}

window.resetCatalogFilters = function() {
    currentSearchQuery = '';
    filterInStockOnly = false;
    currentSortOption = 'default';

    const searchInput = document.getElementById('catalog-search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    const stockCheckbox = document.getElementById('filter-instock-only');
    const sortSelect = document.getElementById('catalog-sort-select');

    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.classList.add('hidden');
    if (stockCheckbox) stockCheckbox.checked = false;
    if (sortSelect) sortSelect.value = 'default';

    currentSubFilter = 'All';
    renderSubFilters();
    renderProducts();
};


// ════════════════════════════════════════════════════════
//  Real-Time Social Proof Live Purchase Toast Engine
// ════════════════════════════════════════════════════════

function initPurchaseToast() {
    const toast = document.getElementById('purchase-toast');
    const buyerEl = document.getElementById('toast-buyer');
    const timeEl = document.getElementById('toast-time');
    const productEl = document.getElementById('toast-product');
    const closeBtn = document.getElementById('toast-close');

    if (!toast || !buyerEl || !timeEl || !productEl) return;

    let isDismissed = false;

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            toast.classList.remove('active');
            isDismissed = true;
        });
    }

    const locations = [
        'Someone in United States',
        'Someone in Germany',
        'Someone in United Kingdom',
        'Someone in Canada',
        'Someone in France',
        'Someone in Netherlands',
        'Someone in Australia',
        'Someone in Sweden',
        'Someone in Norway',
        'Someone in Texas',
        'Someone in California',
        'Someone in Florida'
    ];

    const times = [
        'Just now',
        '1m ago',
        '2m ago',
        '3m ago',
        '4m ago',
        '6m ago'
    ];

    function showRandomPurchase() {
        if (isDismissed || !allProducts || allProducts.length === 0) return;

        // Pick a random product from store
        const randProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
        let title = randProduct.name;

        if (randProduct.variants && randProduct.variants.length > 0) {
            const randVar = randProduct.variants[Math.floor(Math.random() * randProduct.variants.length)];
            title = `${randProduct.name} (${randVar.name})`;
        }

        const randLoc = locations[Math.floor(Math.random() * locations.length)];
        const randTime = times[Math.floor(Math.random() * times.length)];

        buyerEl.textContent = randLoc;
        timeEl.textContent = randTime;
        productEl.textContent = `Purchased ${title}`;

        toast.classList.add('active');

        setTimeout(() => {
            toast.classList.remove('active');
        }, 5500);
    }

    // First toast after 7 seconds
    setTimeout(showRandomPurchase, 7000);

    // Then trigger every 26–42 seconds
    function scheduleNext() {
        const delay = Math.floor(Math.random() * 16000) + 26000;
        setTimeout(() => {
            showRandomPurchase();
            scheduleNext();
        }, delay);
    }
    scheduleNext();
}
