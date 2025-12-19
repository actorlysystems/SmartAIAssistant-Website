// 1. Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// 3. Navbar Toggle
const navToggle = document.getElementById("navToggle");
const navMobileLinks = document.getElementById("navMobileLinks");

navToggle.addEventListener("click", () => {
    navMobileLinks.classList.toggle("active");
    const icon = navToggle.querySelector("i");
    if (navMobileLinks.classList.contains("active")) {
        icon.classList.replace("bi-list", "bi-x-lg");
    } else {
        icon.classList.replace("bi-x-lg", "bi-list");
    }
});

// 4. Hero Animations
const heroTL = gsap.timeline();

// Staggered Text Reveal
heroTL.from(".reveal-text", {
    y: 30,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out"
})
.from(".main-ui", {
    y: 50,
    opacity: 0,
    rotateX: 10,
    duration: 1,
    ease: "back.out(1.7)"
}, "-=0.6")
.from(".float-card", {
    scale: 0,
    opacity: 0,
    stagger: 0.2,
    duration: 0.5,
    ease: "back.out(2)"
}, "-=0.4");

// 5. Typing Effect in Chat Bubble
gsap.to(".msg.bot.typing", {
    display: "none",
    delay: 2.5
});
gsap.from(".msg.bot.final", {
    display: "none",
    opacity: 0,
    y: 10,
    delay: 2.5,
    duration: 0.4
});

// 6. Scroll Triggered Animations

// Pipeline Steps
gsap.utils.toArray(".process-step").forEach((step, i) => {
    gsap.from(step, {
        scrollTrigger: {
            trigger: step,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1
    });
});

// Architecture Section (Parallax Code Window)
gsap.to(".code-window", {
    scrollTrigger: {
        trigger: ".arch-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
    },
    y: -30,
    rotateY: 5
});

// Pricing Cards Animation (Uncommented and fixed)
// gsap.from(".pricing-card", {
//     scrollTrigger: {
//         trigger: "#pricing",
//         start: "top 80%"
//     },
//     y: 50,
//     opacity: 0,
//     stagger: 0.2,
//     duration: 0.8,
//     ease: "power2.out"
// });

// 7. Active Navigation Link on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link-custom");

function highlightNavigation() {
    let current = "";
    const scrollY = window.scrollY;
    
    // Determine which section is currently on screen
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // 180px offset accounts for navbar height so it highlights slightly before reaching the top
        if (scrollY >= (sectionTop - 180)) {
            current = section.getAttribute("id");
        }
    });

    // Apply 'active' class to the matching link
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
}

// 8. Smooth Click Scrolling with Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Use Lenis to scroll smoothly to the target
            lenis.scrollTo(targetSection, {
                offset: -100 // Adjusts for the fixed header height
            });
            
            // Close mobile menu if open
            navMobileLinks.classList.remove("active");
            const icon = navToggle.querySelector("i");
            if(icon) icon.classList.replace("bi-x-lg", "bi-list");
        }
    });
});

// Attach to window scroll event
window.addEventListener("scroll", highlightNavigation);

// 9. Pricing Toggle Logic
const pricingToggle = document.getElementById("pricingToggle");
const priceAmounts = document.querySelectorAll(".price-amount");
const pricePeriods = document.querySelectorAll(".period");

if (pricingToggle) {
    pricingToggle.addEventListener("change", () => {
        const isYearly = pricingToggle.checked;

        // Animate out
        gsap.to([priceAmounts, pricePeriods], {
            y: -10,
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                // Update Text
                priceAmounts.forEach(el => {
                    el.textContent = isYearly ? el.dataset.yearly : el.dataset.monthly;
                });
                pricePeriods.forEach(el => {
                    el.textContent = isYearly ? "/yr" : "/mo";
                });

                // Animate in
                gsap.to([priceAmounts, pricePeriods], {
                    y: 0,
                    opacity: 1,
                    duration: 0.2
                });
            }
        });
    });
}

// Nav Glass Effect on Scroll
window.addEventListener("scroll", () => {
    const nav = document.querySelector(".smart-nav");
    if (window.scrollY > 50) {
        nav.style.background = "rgba(255, 255, 255, 0.85)";
        nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
    } else {
        nav.style.background = "rgba(255, 255, 255, 0.65)";
        nav.style.boxShadow = "none";
    }
});