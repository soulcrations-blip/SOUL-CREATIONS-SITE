// ========================
// SOUL CREATIONS MAIN JS
// ========================
window.addEventListener("load", () => {
    // ---------- LOADER ----------
    const loader = document.getElementById("loader");
    const line = document.getElementById("loader-line");
    const logo = document.getElementById("loader-logo");
    if (logo) gsap.to(logo, { opacity: 1, duration: 1, delay: 0.2 });
    if (line) gsap.to(line, { scaleX: 1, duration: 1.5, ease: "power2.inOut", delay: 0.8 });
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.8,
            delay: 1.8,
            onComplete: () => {
                loader.style.display = "none";
                initAnimations();
                initLenis();
            }
        });
    } else {
        initAnimations();
        initLenis();
    }

    // ---------- LENIS SMOOTH SCROLL ----------
    function initLenis() {
        const lenis = new Lenis({ smoothWheel: true, syncTouch: true, lerp: 0.08 });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
    }

    // ---------- GSAP SCROLL TRIGGER ----------
    function initAnimations() {
        gsap.registerPlugin(ScrollTrigger);
        // Reveal elements
        gsap.utils.toArray(".reveal").forEach(el => {
            gsap.fromTo(el, { autoAlpha: 0, y: 40 }, {
                autoAlpha: 1, y: 0, duration: 1,
                scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" }
            });
        });
        gsap.utils.toArray(".reveal-up").forEach(el => {
            gsap.fromTo(el, { autoAlpha: 0, y: 60 }, {
                autoAlpha: 1, y: 0, duration: 1.2,
                scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" }
            });
        });
        // Service rows stagger
        gsap.utils.toArray(".service-row").forEach((row, i) => {
            gsap.from(row, {
                opacity: 0, x: -30, duration: 0.6, delay: i * 0.1,
                scrollTrigger: { trigger: row, start: "top 90%" }
            });
        });
    }

    // ---------- MOBILE MENU ----------
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    let open = false;
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            if (!open) {
                mobileMenu.style.transform = "translateY(0)";
                document.body.style.overflow = "hidden";
            } else {
                mobileMenu.style.transform = "translateY(-100%)";
                document.body.style.overflow = "";
            }
            open = !open;
        });
    }

    // ---------- PASSPHRASE FORM (for index.html and albums.html) ----------
    const albumForm = document.getElementById("album-form");
    if (albumForm) {
        const redirectMap = { "soul2025": "projects.html" };
        albumForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const pass = document.getElementById("passphrase").value.trim().toLowerCase();
            if (redirectMap[pass]) window.location.href = redirectMap[pass];
            else document.getElementById("form-error")?.classList.remove("hidden");
        });
    }

    // ---------- MOUSE FOLLOWER ----------
    const follower = document.querySelector(".mouse-follower");
    if (follower) {
        document.addEventListener("mousemove", (e) => {
            gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.1 });
        });
    }

    // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) target.scrollIntoView({ behavior: "smooth" });
        });
    });
});

// Fallback for broken images
document.querySelectorAll("img").forEach(img => {
    img.onerror = function() {
        if (!this.src.includes('placehold')) this.style.display = "none";
    };
});