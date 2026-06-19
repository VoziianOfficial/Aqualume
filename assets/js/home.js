'use strict';



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

    
    function toKebabCase(value) {
        return String(value)
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    }

    
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

    

    (function () {
        const pulseSection = document.querySelector('.home-platform-pulse');

        if (!pulseSection) {
            return;
        }

        const counterElements = Array.from(
            pulseSection.querySelectorAll('[data-counter-value]')
        );

        if (counterElements.length === 0) {
            return;
        }

        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        function animateCounter(element) {
            const target = Number(element.dataset.counterValue);

            if (!Number.isFinite(target)) {
                return;
            }

            if (reducedMotion) {
                element.textContent = String(target);
                return;
            }

            const duration = 1150;
            const startTime = performance.now();

            element.textContent = '0';

            function updateCounter(currentTime) {
                const progress = Math.min((currentTime - startTime) / duration, 1);

                
                const easedProgress = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.round(target * easedProgress);

                element.textContent = String(currentValue);

                if (progress < 1) {
                    window.requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = String(target);
                }
            }

            window.requestAnimationFrame(updateCounter);
        }

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    counterElements.forEach((counter) => {
                        if (counter.dataset.counterPlayed === 'true') {
                            return;
                        }

                        counter.dataset.counterPlayed = 'true';
                        animateCounter(counter);
                    });

                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.36
            }
        );

        observer.observe(pulseSection);
    })();

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