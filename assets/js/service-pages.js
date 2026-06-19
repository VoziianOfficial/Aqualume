'use strict';



(function () {
    const CONFIG = window.AQUALUME_CONFIG;
    const Aqualume = window.Aqualume;

    if (!CONFIG || !Aqualume) {
        console.error(
            'Aqualume service-pages.js requires config.js and global.js to load first.'
        );
        return;
    }

    function toKebabCase(value) {
        return String(value || '')
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    }

    function replaceClarityIcon(iconName) {
        const currentIcon = document.querySelector(
            '[data-service-clarity-icon]'
        );

        if (!currentIcon) {
            return;
        }

        const nextIcon = document.createElement('i');

        nextIcon.className = 'service-clarity__icon';
        nextIcon.dataset.serviceClarityIcon = '';
        nextIcon.dataset.lucide = toKebabCase(iconName);
        nextIcon.setAttribute('aria-hidden', 'true');

        currentIcon.replaceWith(nextIcon);

        if (typeof Aqualume.refreshIcons === 'function') {
            Aqualume.refreshIcons();
        }
    }

    function initServiceClarityAccordion() {
        const panel = document.querySelector('[data-service-clarity-panel]');
        const title = document.querySelector('[data-service-clarity-title]');
        const statement = document.querySelector(
            '[data-service-clarity-statement]'
        );
        const rows = Array.from(
            document.querySelectorAll('[data-service-clarity-row]')
        );

        if (!panel || !title || !statement || rows.length === 0) {
            return;
        }

        let animationTimer = null;

        function updatePanel(row) {
            const nextTitle = row.dataset.clarityTitle;
            const nextStatement = row.dataset.clarityStatement;
            const nextIcon = row.dataset.clarityIcon;

            panel.classList.remove('is-changing');

            window.requestAnimationFrame(() => {
                panel.classList.add('is-changing');
            });

            window.clearTimeout(animationTimer);

            animationTimer = window.setTimeout(() => {
                if (nextTitle) {
                    title.textContent = nextTitle;
                }

                if (nextStatement) {
                    statement.textContent = nextStatement;
                }

                if (nextIcon) {
                    replaceClarityIcon(nextIcon);
                }

                panel.classList.remove('is-changing');
            }, 180);
        }

        function setActiveRow(nextRow) {
            rows.forEach((row) => {
                const trigger = row.querySelector(
                    '[data-service-clarity-trigger]'
                );
                const isActive = row === nextRow;

                row.classList.toggle('is-open', isActive);

                if (trigger) {
                    trigger.setAttribute('aria-expanded', String(isActive));
                }
            });

            updatePanel(nextRow);
        }

        rows.forEach((row) => {
            const trigger = row.querySelector('[data-service-clarity-trigger]');

            if (!trigger) {
                return;
            }

            trigger.addEventListener('click', () => {
                
                if (row.classList.contains('is-open')) {
                    return;
                }

                setActiveRow(row);
            });
        });

        const initiallyOpenRow =
            rows.find((row) => row.classList.contains('is-open')) || rows[0];

        setActiveRow(initiallyOpenRow);
    }

    function init() {
        initServiceClarityAccordion();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();