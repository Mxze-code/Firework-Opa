/**
 * LAWS PAGE - Premium Animations (React Bits inspired)
 *
 * Animations: Split Text, Blur/Scroll Reveal, Shiny Button, Circular Badge, Decrypted Text
 * Implemented in vanilla JS/CSS - no React, no GSAP (lightweight)
 *
 * TWEAK GUIDE:
 * - splitText.staggerMs: delay between each letter (higher = slower reveal)
 * - splitText.durationMs: duration of each letter's animation
 * - decrypted.durationMs: total decrypt animation time
 * - decrypted.scrambleSteps: number of scramble frames (more = smoother)
 *
 * CSS tweaks (style.css):
 * - .split-char animation: @keyframes splitCharReveal
 * - .reveal-on-scroll transition: opacity, filter, transform
 * - .btn-shiny::after: @keyframes shinySweep (change 4s for speed)
 * - .circular-badge-wrap opacity: 0.4 for intensity
 */

const ANIMATION_CONFIG = {
    splitText: { staggerMs: 45, durationMs: 1200, fromY: 28 },
    blurReveal: { durationMs: 900, blurStart: 8 },
    decrypted: { durationMs: 600, scrambleSteps: 12 },
};

// ========== SPLIT TEXT (hero heading) ==========
// Word-based wrapping: each word is wrapped in a span with white-space:nowrap so the browser
// can only break between words—never mid-word ("H" / "uman"). Supports laws page and home.
function initSplitText() {
    const lawsEl = document.getElementById('heroSplitHeading');
    const homeEl = document.getElementById('homeHeroTitle');
    const els = [lawsEl, homeEl].filter(Boolean);
    if (!els.length) return;

    els.forEach((el) => {
        const text = el.textContent.trim();
        if (!text) return;
        el.innerHTML = '';
        el.style.opacity = '1';

        const words = text.split(/\s+/);
        let charIndex = 0;
        const stagger = ANIMATION_CONFIG.splitText.staggerMs;
        const duration = ANIMATION_CONFIG.splitText.durationMs;

        words.forEach((word, wordIdx) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'split-word';
            word.split('').forEach((char) => {
                const span = document.createElement('span');
                span.className = 'split-char';
                span.textContent = char;
                span.style.animationDelay = `${charIndex * stagger}ms`;
                span.style.animationDuration = `${duration}ms`;
                wordSpan.appendChild(span);
                charIndex++;
            });
            el.appendChild(wordSpan);
            if (wordIdx < words.length - 1) {
                const space = document.createTextNode('\u00A0');
                el.appendChild(space);
            }
        });
    });
}

// ========== BLUR / SCROLL REVEAL (subtitle, quote) ==========
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal-on-scroll');
    if (!els.length) return;
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '-20px' }
    );
    els.forEach((el) => observer.observe(el));
}

// ========== DECRYPTED TEXT (Random Law output) ==========
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function scramble(str, progress) {
    return str
        .split('')
        .map((c, i) => {
            if (c === ' ' || c === '—' || c === '•') return c;
            const revealIndex = progress * str.length;
            if (i < revealIndex) return str[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');
}

function animateDecrypted(element, finalText, onComplete) {
    const steps = ANIMATION_CONFIG.decrypted.scrambleSteps;
    const duration = ANIMATION_CONFIG.decrypted.durationMs;
    const stepMs = duration / steps;
    let step = 0;
    const interval = setInterval(() => {
        step++;
        const progress = Math.min(1, step / steps);
        element.textContent = scramble(finalText, progress);
        if (step >= steps) {
            clearInterval(interval);
            element.textContent = finalText;
            if (onComplete) onComplete();
        }
    }, stepMs);
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    initSplitText();
    initScrollReveal();
});

// Export for use by script.js
window.LawsAnimations = {
    animateDecrypted,
};
