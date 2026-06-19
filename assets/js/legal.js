'use strict';



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

    function setActiveLegalState(activeId, links, sections) {
        links.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${activeId}`;

            link.classList.toggle('is-active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        sections.forEach((section) => {
            section.classList.toggle(
                'is-active-section',
                section.id === activeId
            );
        });
    }

    function scrollToSection(target) {
        if (!target) {
            return;
        }

        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        const targetPosition =
            window.scrollY +
            target.getBoundingClientRect().top -
            getHeaderOffset();

        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: reducedMotion ? 'auto' : 'smooth'
        });
    }

    function initLegalScrollProgress() {
        if (document.querySelector('.legal-scroll-progress')) {
            return;
        }

        const progress = document.createElement('div');

        progress.className = 'legal-scroll-progress';
        progress.setAttribute('aria-hidden', 'true');

        document.body.append(progress);

        let ticking = false;

        function updateProgress() {
            const documentHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            const progressValue =
                documentHeight > 0
                    ? Math.min(window.scrollY / documentHeight, 1)
                    : 0;

            progress.style.transform = `scaleX(${progressValue})`;

            ticking = false;
        }

        function requestUpdate() {
            if (ticking) {
                return;
            }

            ticking = true;

            window.requestAnimationFrame(updateProgress);
        }

        window.addEventListener('scroll', requestUpdate, {
            passive: true
        });

        window.addEventListener('resize', requestUpdate);

        requestUpdate();
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

        const sectionIds = new Set(
            sections.map((section) => section.id)
        );

        links.forEach((link) => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');
                const targetId = href ? href.replace('#', '') : '';
                const target = document.getElementById(targetId);

                if (!target || !sectionIds.has(targetId)) {
                    return;
                }

                event.preventDefault();

                setActiveLegalState(targetId, links, sections);
                scrollToSection(target);

                window.history.replaceState(
                    null,
                    '',
                    `#${targetId}`
                );
            });
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-in-view');
                    }
                });

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

                setActiveLegalState(
                    currentSection.id,
                    links,
                    sections
                );
            },
            {
                root: null,
                rootMargin: `-${getHeaderOffset()}px 0px -56% 0px`,
                threshold: 0.1
            }
        );

        sections.forEach((section) => observer.observe(section));

        const initialHash = window.location.hash.replace('#', '');

        if (initialHash && sectionIds.has(initialHash)) {
            const target = document.getElementById(initialHash);

            setActiveLegalState(initialHash, links, sections);

            window.setTimeout(() => {
                scrollToSection(target);
            }, 90);

            return;
        }

        setActiveLegalState(sections[0].id, links, sections);
        sections[0].classList.add('is-in-view');
    }

    function initLegalPage() {
        initLegalScrollProgress();
        initLegalTableOfContents();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLegalPage);
    } else {
        initLegalPage();
    }
})();