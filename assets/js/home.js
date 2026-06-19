'use strict';

/* =========================================================
   AQUALUME — HOME PAGE FUNCTIONALITY
   File: assets/js/home.js

   Requires:
   - assets/js/config.js
   - assets/js/global.js
   ========================================================= */

(function () {
    const CONFIG = window.AQUALUME_CONFIG;
    const Aqualume = window.Aqualume;

    if (!CONFIG || !Aqualume) {
        console.error(
            'Aqualume home.js requires config.js and global.js to load first.'
        );
        return;
    }

    const situationIcons = {
        'active-leak': 'siren',
        'standing-water': 'waves',
        'flooded-room': 'cloud-rain',
        'burst-pipe': 'wrench',
        'basement-moisture': 'layers',
        'mold-concerns': 'scan-search'
    };

    /**
     * Converts icon names such as "ShieldCheck" into "shield-check".
     * This keeps dynamic Lucide icon rendering safe with config values.
     */
    function toKebabCase(value) {
        return String(value)
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    }

    /**
     * Replaces the dynamic situation icon and then asks global.js
     * to render it through Lucide.
     */
    function updateSituationIcon(iconName) {
        const currentIcon = document.querySelector('[data-home-situation-icon]');

        if (!currentIcon) {
            return;
        }

        const nextIcon = document.createElement('i');

        nextIcon.className = 'situation-panel__icon';
        nextIcon.dataset.homeSituationIcon = '';
        nextIcon.dataset.lucide = toKebabCase(iconName);
        nextIcon.setAttribute('aria-hidden', 'true');

        currentIcon.replaceWith(nextIcon);

        if (typeof Aqualume.refreshIcons === 'function') {
            Aqualume.refreshIcons();
        }
    }

    /**
     * Updates the left-side information panel in the
     * "What are you dealing with?" section.
     */
    function initSituationSelector() {
        const buttons = Array.from(
            document.querySelectorAll('[data-home-situation]')
        );

        const panel = document.querySelector('[data-home-situation-panel]');
        const tag = document.querySelector('[data-home-situation-tag]');
        const title = document.querySelector('[data-home-situation-title]');
        const text = document.querySelector('[data-home-situation-text]');
        const link = document.querySelector('[data-home-situation-link]');
        const linkLabel = document.querySelector(
            '[data-home-situation-link-label]'
        );

        if (
            buttons.length === 0 ||
            !panel ||
            !tag ||
            !title ||
            !text ||
            !link ||
            !linkLabel
        ) {
            return;
        }

        let animationTimer = null;

        function setActiveSituation(situationId) {
            const situation = CONFIG.homeSituations.find(
                (item) => item.id === situationId
            );

            if (!situation) {
                return;
            }

            const relatedService = Aqualume.getServiceById(situation.serviceId);

            if (!relatedService) {
                return;
            }

            buttons.forEach((button) => {
                const isActive = button.dataset.situationId === situationId;

                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });

            panel.classList.remove('is-changing');

            window.requestAnimationFrame(() => {
                panel.classList.add('is-changing');
            });

            window.clearTimeout(animationTimer);

            animationTimer = window.setTimeout(() => {
                panel.classList.remove('is-changing');
            }, 440);

            tag.textContent = situation.tag;
            title.textContent = situation.title;
            text.textContent = situation.text;
            link.href = relatedService.url;
            linkLabel.textContent = situation.linkLabel;

            updateSituationIcon(
                situationIcons[situation.id] || toKebabCase(relatedService.icon)
            );
        }

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                setActiveSituation(button.dataset.situationId);
            });
        });
    }

    /**
     * Counts a single number from zero to its target value.
     * It intentionally does not animate non-numeric labels such as "24/7".
     */
    function animateCounter(element, duration = 1100) {
        const target = Number(element.dataset.counterValue);

        if (!Number.isFinite(target)) {
            return;
        }

        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (reducedMotion) {
            element.textContent = String(target);
            return;
        }

        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            /* Ease out quart: fast start, calm premium finish */
            const easedProgress = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(target * easedProgress);

            element.textContent = String(currentValue);

            if (progress < 1) {
                window.requestAnimationFrame(updateCounter);
                return;
            }

            element.textContent = String(target);
            element.closest('.stat-item')?.classList.add('is-counted');
        }

        window.requestAnimationFrame(updateCounter);
    }

    /**
     * Starts counters only once when the stats strip becomes visible.
     */
    function initCounters() {
        const counterElements = Array.from(
            document.querySelectorAll('[data-counter-value]')
        );

        if (counterElements.length === 0) {
            return;
        }

        const statsStrip = counterElements[0].closest('.stats-strip');

        if (!statsStrip || !('IntersectionObserver' in window)) {
            counterElements.forEach((counter) => {
                counter.textContent = counter.dataset.counterValue;
            });

            return;
        }

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    counterElements.forEach((counter, index) => {
                        const delay = index * 120;

                        window.setTimeout(() => {
                            animateCounter(counter);
                        }, delay);
                    });

                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.35
            }
        );

        observer.observe(statsStrip);
    }

    /**
     * Keeps the requested option selected when a user clicks a situation
     * and then continues to the home request form on the same page.
     */
    function initSituationToFormSync() {
        const situationButtons = document.querySelectorAll(
            '[data-home-situation]'
        );

        const select = document.querySelector('#home-situation');

        if (!select || situationButtons.length === 0) {
            return;
        }

        situationButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const situation = CONFIG.homeSituations.find(
                    (item) => item.id === button.dataset.situationId
                );

                if (!situation) {
                    return;
                }

                const matchingOption = Array.from(select.options).find(
                    (option) =>
                        option.textContent.trim().toLowerCase() ===
                        situation.label.toLowerCase()
                );

                if (matchingOption) {
                    select.value = matchingOption.value;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        });
    }

    function init() {
        initSituationSelector();
        initCounters();
        initSituationToFormSync();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();