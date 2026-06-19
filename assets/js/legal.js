'use strict';

/* =========================================================
   AQUALUME — LEGAL PAGES FUNCTIONALITY
   Privacy Policy / Terms of Service / Cookie Policy
   File: assets/js/legal.js

   Requires:
   - assets/js/global.js
   ========================================================= */

(function () {
    const SELECTORS = {
        toc: '.legal-toc',
        tocLinks: '.legal-toc nav a[href^="#"]',
        sections: '.legal-content__section[id]'
    };

    function getHeaderOffset() {
        const header = document.querySelector('[data-site-header]');

        return header ? header.offsetHeight + 22 : 100;
    }

    function updateActiveTocLink(activeId, links) {
        links.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${activeId}`;

            link.classList.toggle('is-active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function scrollToSection(target) {
        if (!target) {
            return;
        }

        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        const headerOffset = getHeaderOffset();
        const targetPosition =
            window.scrollY +
            target.getBoundingClientRect().top -
            headerOffset;

        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: reducedMotion ? 'auto' : 'smooth'
        });
    }

    function initLegalTableOfContents() {
        const toc = document.querySelector(SELECTORS.toc);
        const links = Array.from(document.querySelectorAll(SELECTORS.tocLinks));
        const sections = Array.from(
            document.querySelectorAll(SELECTORS.sections)
        );

        if (!toc || links.length === 0 || sections.length === 0) {
            return;
        }

        const sectionIds = new Set(sections.map((section) => section.id));

        links.forEach((link) => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');
                const targetId = href ? href.replace('#', '') : '';
                const target = document.getElementById(targetId);

                if (!target || !sectionIds.has(targetId)) {
                    return;
                }

                event.preventDefault();

                updateActiveTocLink(targetId, links);
                scrollToSection(target);

                window.history.replaceState(null, '', `#${targetId}`);
            });
        });

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (first, second) =>
                            first.boundingClientRect.top -
                            second.boundingClientRect.top
                    );

                if (visibleSections.length === 0) {
                    return;
                }

                const currentSection = visibleSections[0].target;

                updateActiveTocLink(currentSection.id, links);
            },
            {
                root: null,
                rootMargin: `-${getHeaderOffset()}px 0px -58% 0px`,
                threshold: 0.08
            }
        );

        sections.forEach((section) => observer.observe(section));

        const initialHash = window.location.hash.replace('#', '');

        if (initialHash && sectionIds.has(initialHash)) {
            const target = document.getElementById(initialHash);

            updateActiveTocLink(initialHash, links);

            window.setTimeout(() => {
                scrollToSection(target);
            }, 80);
        } else {
            updateActiveTocLink(sections[0].id, links);
        }
    }

    function initLegalPage() {
        initLegalTableOfContents();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLegalPage);
    } else {
        initLegalPage();
    }
})();