/* ==========================================================================
   IBAP-RJ – Site institucional
   Cada componente tem sua função de inicialização e só roda se existir na página.
   ========================================================================== */

'use strict';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const supportsObserver = 'IntersectionObserver' in window;

/* Utilitário: mantém o foco dentro de um conjunto de elementos */
function trapFocus(elements, event) {
    const focusable = Array.from(elements).filter((el) => el.offsetParent !== null);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

/* Cabeçalho: sombra quando a página é rolada */
function initHeader() {
    const header = document.querySelector('.site-header');
    const sentinel = document.querySelector('[data-header-sentinel]');
    if (!header || !sentinel || !supportsObserver) return;

    const observer = new IntersectionObserver(([entry]) => {
        header.classList.toggle('is-scrolled', !entry.isIntersecting);
    });
    observer.observe(sentinel);
}

/* Menu responsivo (hamburger) */
function initMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    const desktop = window.matchMedia('(min-width: 1100px)');
    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    const setOpen = (open) => {
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        nav.classList.toggle('is-open', open);
        document.body.classList.toggle('menu-open', open);
    };

    toggle.addEventListener('click', () => {
        const open = !isOpen();
        setOpen(open);
        if (open) {
            const firstLink = nav.querySelector('a');
            if (firstLink) firstLink.focus();
        }
    });

    nav.addEventListener('click', (event) => {
        if (event.target.closest('a') && !desktop.matches) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
        if (!isOpen()) return;

        if (event.key === 'Escape') {
            setOpen(false);
            toggle.focus();
        } else if (event.key === 'Tab') {
            trapFocus([toggle, ...nav.querySelectorAll('a[href], button:not([disabled])')], event);
        }
    });

    desktop.addEventListener('change', (event) => {
        if (event.matches) setOpen(false);
    });
}

/* Destaque do link do menu conforme a seção visível */
function initScrollSpy() {
    const links = document.querySelectorAll('.main-nav__link[href^="#"]');
    if (!links.length || !supportsObserver) return;

    const sectionToLink = new Map();
    links.forEach((link) => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) sectionToLink.set(section, link);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            links.forEach((link) => {
                link.classList.remove('is-active');
                link.removeAttribute('aria-current');
            });

            const active = sectionToLink.get(entry.target);
            if (active) {
                active.classList.add('is-active');
                active.setAttribute('aria-current', 'location');
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sectionToLink.forEach((_, section) => observer.observe(section));
}

/* Carrosséis com scroll-snap: botões, indicadores e estado das setas */
function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(setupCarousel);
}

function setupCarousel(root) {
    const track = root.querySelector('[data-carousel-track]');
    if (!track) return;

    const slides = Array.from(track.children);
    const prev = root.querySelector('[data-carousel-prev]');
    const next = root.querySelector('[data-carousel-next]');
    const dots = Array.from(root.querySelectorAll('[data-carousel-dot]'));
    const scrollBehavior = () => (prefersReducedMotion.matches ? 'auto' : 'smooth');

    const update = () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (prev) prev.disabled = track.scrollLeft <= 2;
        if (next) next.disabled = track.scrollLeft >= maxScroll - 2;

        if (dots.length && slides.length) {
            const slideWidth = slides[0].getBoundingClientRect().width;
            const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
            const index = Math.round(track.scrollLeft / (slideWidth + gap));
            dots.forEach((dot, i) => {
                if (i === index) dot.setAttribute('aria-current', 'true');
                else dot.removeAttribute('aria-current');
            });
        }
    };

    if (prev) {
        prev.addEventListener('click', () => {
            track.scrollBy({ left: -track.clientWidth, behavior: scrollBehavior() });
        });
    }

    if (next) {
        next.addEventListener('click', () => {
            track.scrollBy({ left: track.clientWidth, behavior: scrollBehavior() });
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if (slides[i]) track.scrollTo({ left: slides[i].offsetLeft, behavior: scrollBehavior() });
        });
    });

    let ticking = false;
    track.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            update();
            ticking = false;
        });
    }, { passive: true });

    window.addEventListener('resize', update);
    update();
    root.classList.add('is-ready');
}

/* Abas das linhas de atuação (padrão WAI-ARIA Tabs) */
function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach((root) => {
        const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
        if (!tabs.length) return;

        const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

        const select = (index, moveFocus) => {
            tabs.forEach((tab, i) => {
                const selected = i === index;
                tab.setAttribute('aria-selected', String(selected));
                tab.tabIndex = selected ? 0 : -1;
                if (panels[i]) panels[i].hidden = !selected;
            });
            if (moveFocus) tabs[index].focus();
        };

        const keyStep = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

        tabs.forEach((tab, i) => {
            tab.addEventListener('click', () => select(i, false));

            tab.addEventListener('keydown', (event) => {
                let target = null;
                if (event.key in keyStep) target = (i + keyStep[event.key] + tabs.length) % tabs.length;
                else if (event.key === 'Home') target = 0;
                else if (event.key === 'End') target = tabs.length - 1;

                if (target !== null) {
                    event.preventDefault();
                    select(target, true);
                }
            });
        });

        const initial = Math.max(0, tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true'));
        select(initial, false);
    });
}

/* Contadores: o número final já está no HTML; a animação é um reforço */
function initCounters() {
    const counters = document.querySelectorAll('.counter[data-target]');
    if (!counters.length || prefersReducedMotion.matches || !supportsObserver) return;

    const format = new Intl.NumberFormat('pt-BR');

    const animate = (el) => {
        const target = Number(el.dataset.target);
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = format.format(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animate(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.6 });

    counters.forEach((el) => {
        el.textContent = '0';
        observer.observe(el);
    });
}

/* Faixas de logos: duplica a lista para rolagem contínua e oferece pausa */
function initLogoMarquee() {
    const marquees = document.querySelectorAll('[data-marquee]');
    const toggle = document.querySelector('[data-marquee-toggle]');
    if (!marquees.length || prefersReducedMotion.matches) return;

    marquees.forEach((marquee) => {
        const list = marquee.querySelector('.logo-marquee__list');
        if (!list) return;

        Array.from(list.children).forEach((item) => {
            const clone = item.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            clone.querySelectorAll('img').forEach((img) => { img.alt = ''; });
            list.appendChild(clone);
        });

        marquee.classList.add('is-animated');
    });

    if (toggle) {
        toggle.hidden = false;
        toggle.addEventListener('click', () => {
            const paused = marquees[0].classList.contains('is-paused');
            marquees.forEach((marquee) => marquee.classList.toggle('is-paused', !paused));
            toggle.textContent = paused ? 'Pausar animação' : 'Retomar animação';
        });
    }
}

/* Revelação suave de blocos ao entrar na tela */
function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!supportsObserver || prefersReducedMotion.matches) {
        items.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    items.forEach((el) => observer.observe(el));
}

/* Botão "voltar ao topo": aparece depois do hero */
function initBackToTop() {
    const button = document.querySelector('.back-to-top');
    const hero = document.querySelector('.hero');
    if (!button || !hero || !supportsObserver) return;

    const observer = new IntersectionObserver(([entry]) => {
        button.classList.toggle('is-visible', !entry.isIntersecting);
    });
    observer.observe(hero);
}

/* Ano atual no rodapé */
function initYear() {
    const year = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = year; });
}

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMenu();
    initScrollSpy();
    initCarousels();
    initTabs();
    initCounters();
    initLogoMarquee();
    initReveal();
    initBackToTop();
    initYear();
});
