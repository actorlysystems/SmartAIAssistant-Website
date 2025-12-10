// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navMobileLinks = document.getElementById("navMobileLinks");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMobileLinks.classList.toggle("nav-open");
  });
}

// Smooth scroll highlight for nav links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (navMobileLinks.classList.contains("nav-open")) {
        navMobileLinks.classList.remove("nav-open");
      }
    }
  });
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Hero entrance
gsap.from(".hero-text", {
  duration: 1.1,
  x: -40,
  opacity: 0,
  ease: "power3.out",
});

gsap.from(".hero-mascot", {
  duration: 1.15,
  y: 40,
  opacity: 0,
  ease: "power3.out",
});

gsap.from(".hero-floating-card, .hero-floating-tag", {
  duration: 1,
  y: 25,
  opacity: 0,
  stagger: 0.18,
  delay: 0.35,
  ease: "back.out(1.6)",
});

// Subtle bobbing for mascot & floating elements
gsap.to(".hero-mascot", {
  y: 10,
  duration: 3,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
});

gsap.to(".hero-floating-card, .hero-floating-tag", {
  y: -6,
  duration: 2.4,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
  stagger: 0.3,
});

// Scroll-triggered reveal cards
gsap.utils.toArray(".feature-card").forEach(function (card) {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
    },
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: "power2.out",
  });
});

// Titles & subtitles
gsap.utils.toArray("section").forEach(function (section) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    },
  });

  tl.from(section.querySelectorAll(".section-title"), {
    y: 24,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
  }).from(
    section.querySelectorAll(".section-subtitle"),
    {
      y: 16,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    },
    "-=0.25"
  );
});
