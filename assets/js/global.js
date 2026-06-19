'use strict';

/* =========================================================
   AQUALUME — GLOBAL FUNCTIONALITY
   File: assets/js/global.js

   Requires:
   - assets/js/config.js
   - Lucide CDN
   - AOS CDN
   ========================================================= */

(function () {
    const CONFIG = window.AQUALUME_CONFIG;

    if (!CONFIG) {
        console.error(
            'Aqualume config is missing. Make sure assets/js/config.js loads before assets/js/global.js.'
        );
        return;
    }

    const SELECTORS = {
        header: '[data-site-header]',
        desktopServicesDropdown: '[data-services-dropdown]',
        mobileMenu: '[data-mobile-menu]',
        mobileMenuOpen: '[data-mobile-menu-open]',
        mobileMenuClose: '[data-mobile-menu-close]',
        mobileServices: '[data-mobile-services]',
        mobileServicesTrigger: '[data-mobile-services-trigger]',
        mobileServicesList: '[data-mobile-services-list]',
        footerServices: '[data-footer-services]',
        footerCookieSettings: '[data-cookie-settings]',
        cookieBanner: '[data-cookie-banner]',
        cookieAcceptAll: '[data-cookie-accept-all]',
        cookieRejectOptional: '[data-cookie-reject-optional]',
        cookieManage: '[data-cookie-manage]',
        cookiePreferences: '[data-cookie-preferences]',
        cookiePreferencesClose: '[data-cookie-preferences-close]',
        cookiePreferencesSave: '[data-cookie-preferences-save]',
        accordion: '[data-accordion]',
        accordionItem: '[data-accordion-item]',
        accordionTrigger: '[data-accordion-trigger]',
        form: '[data-aqualume-form]',
        formStatus: '[data-form-status]',
        dynamicYear: '[data-current-year]'
    };

    /**
     * Finds a deeply nested value from AQUALUME_CONFIG.
     * Example: getConfigValue('contact.email')
     */
    function getConfigValue(path) {
        return path.split('.').reduce((value, key) => {
            if (value && Object.prototype.hasOwnProperty.call(value, key)) {
                return value[key];
            }

            return undefined;
        }, CONFIG);
    }

    /**
     * Inserts plain text from config into HTML elements.
     * HTML example:
     * <span data-config-text="contact.email"></span>
     */
    function hydrateTextValues() {
        const textElements = document.querySelectorAll('[data-config-text]');

        textElements.forEach((element) => {
            const path = element.dataset.configText;
            const value = getConfigValue(path);

            if (typeof value !== 'undefined') {
                element.textContent = value;
            }
        });
    }

    /**
     * Inserts attributes from config into HTML elements.
     *
     * HTML examples:
     * <a data-config-href="contact.emailHref"></a>
     * <a data-config-href="contact.phoneHref"></a>
     * <a data-config-href="urls.contact"></a>
     */
    function hydrateHrefValues() {
        const hrefElements = document.querySelectorAll('[data-config-href]');

        hrefElements.forEach((element) => {
            const path = element.dataset.configHref;
            const value = getConfigValue(path);

            if (typeof value !== 'undefined') {
                element.setAttribute('href', value);
            }
        });
    }

    /**
     * Inserts a current year into elements:
     * <span data-current-year></span>
     */
    function hydrateCurrentYear() {
        document.querySelectorAll(SELECTORS.dynamicYear).forEach((element) => {
            element.textContent = String(new Date().getFullYear());
        });
    }

    /**
     * Builds the desktop Services dropdown from config.
     *
     * HTML:
     * <div class="site-nav__dropdown" data-services-dropdown></div>
     */
    function renderDesktopServiceDropdown() {
        const dropdowns = document.querySelectorAll(SELECTORS.desktopServicesDropdown);

        dropdowns.forEach((dropdown) => {
            dropdown.innerHTML = '';

            CONFIG.services.forEach((service) => {
                const link = document.createElement('a');

                link.href = service.url;
                link.textContent = service.title;

                dropdown.appendChild(link);
            });
        });
    }

    /**
     * Builds services accordion inside mobile menu from config.
     *
     * HTML:
     * <div class="mobile-menu__services" data-mobile-services>
     *   <button data-mobile-services-trigger></button>
     *   <div data-mobile-services-list></div>
     * </div>
     */
    function renderMobileServiceLinks() {
        const serviceLists = document.querySelectorAll(SELECTORS.mobileServicesList);

        serviceLists.forEach((list) => {
            list.innerHTML = '';

            CONFIG.services.forEach((service) => {
                const link = document.createElement('a');

                link.href = service.url;
                link.textContent = service.title;

                list.appendChild(link);
            });
        });
    }

    /**
     * Builds footer service links from config.
     *
     * HTML:
     * <ul class="site-footer__links" data-footer-services></ul>
     */
    function renderFooterServiceLinks() {
        const footerLists = document.querySelectorAll(SELECTORS.footerServices);

        footerLists.forEach((list) => {
            list.innerHTML = '';

            CONFIG.services.forEach((service) => {
                const item = document.createElement('li');
                const link = document.createElement('a');

                link.href = service.url;
                link.textContent = service.shortTitle;

                item.appendChild(link);
                list.appendChild(item);
            });
        });
    }

    /**
     * Creates Lucide icons only after dynamic service links are inserted.
     */
    function initLucideIcons() {
        if (!window.lucide || typeof window.lucide.createIcons !== 'function') {
            console.warn('Lucide was not found. Add the Lucide CDN before global.js.');
            return;
        }

        window.lucide.createIcons({
            attrs: {
                'stroke-width': 1.9
            }
        });
    }

    /**
     * AOS only runs where library exists.
     */
    function initAOS() {
        if (!window.AOS || typeof window.AOS.init !== 'function') {
            console.warn('AOS was not found. Add the AOS CDN before global.js.');
            return;
        }

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        window.AOS.init({
            duration: reducedMotion ? 0 : 750,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            once: true,
            offset: 80,
            delay: 0,
            disable: reducedMotion
        });
    }

    /**
     * Keeps sticky header visually lighter until the user scrolls.
     */
    function initStickyHeader() {
        const header = document.querySelector(SELECTORS.header);

        if (!header) {
            return;
        }

        const updateHeader = () => {
            const isScrolled = window.scrollY > 16;
            header.classList.toggle('is-scrolled', isScrolled);
        };

        updateHeader();

        window.addEventListener('scroll', updateHeader, {
            passive: true
        });
    }

    /**
     * Mobile menu functionality:
     * - open / close
     * - body scroll lock
     * - Escape support
     * - close after navigation click
     */
    function initMobileMenu() {
        const menu = document.querySelector(SELECTORS.mobileMenu);
        const openButton = document.querySelector(SELECTORS.mobileMenuOpen);
        const closeButton = document.querySelector(SELECTORS.mobileMenuClose);

        if (!menu || !openButton || !closeButton) {
            return;
        }

        const focusableSelector =
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

        let lastFocusedElement = null;

        function openMenu() {
            lastFocusedElement = document.activeElement;

            menu.classList.add('is-open');
            menu.setAttribute('aria-hidden', 'false');
            openButton.setAttribute('aria-expanded', 'true');
            document.body.classList.add('is-menu-open');

            const firstFocusableElement = menu.querySelector(focusableSelector);

            if (firstFocusableElement) {
                window.setTimeout(() => firstFocusableElement.focus(), 50);
            }
        }

        function closeMenu() {
            menu.classList.remove('is-open');
            menu.setAttribute('aria-hidden', 'true');
            openButton.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('is-menu-open');

            if (lastFocusedElement instanceof HTMLElement) {
                lastFocusedElement.focus();
            }
        }

        openButton.addEventListener('click', openMenu);
        closeButton.addEventListener('click', closeMenu);

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('is-open')) {
                closeMenu();
            }
        });

        menu.addEventListener('keydown', (event) => {
            if (event.key !== 'Tab') {
                return;
            }

            const focusableElements = Array.from(
                menu.querySelectorAll(focusableSelector)
            ).filter((element) => !element.hasAttribute('hidden'));

            if (focusableElements.length === 0) {
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }

            if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        });
    }

    /**
     * Expanding service list inside mobile menu.
     */
    function initMobileServicesAccordion() {
        const serviceContainers = document.querySelectorAll(SELECTORS.mobileServices);

        serviceContainers.forEach((container) => {
            const trigger = container.querySelector(SELECTORS.mobileServicesTrigger);

            if (!trigger) {
                return;
            }

            trigger.addEventListener('click', () => {
                const isOpen = container.classList.toggle('is-open');

                trigger.setAttribute('aria-expanded', String(isOpen));
            });
        });
    }

    /**
     * Generic accordion for FAQ and service pages.
     *
     * Expected markup:
     * <div data-accordion>
     *   <article data-accordion-item class="accordion__item">
     *     <button data-accordion-trigger aria-expanded="false"></button>
     *   </article>
     * </div>
     */
    function initAccordions() {
        const accordions = document.querySelectorAll(SELECTORS.accordion);

        accordions.forEach((accordion) => {
            const items = Array.from(
                accordion.querySelectorAll(SELECTORS.accordionItem)
            );

            const closeItem = (item) => {
                const trigger = item.querySelector(SELECTORS.accordionTrigger);

                item.classList.remove('is-open');

                if (trigger) {
                    trigger.setAttribute('aria-expanded', 'false');
                }
            };

            const openItem = (item) => {
                const trigger = item.querySelector(SELECTORS.accordionTrigger);

                item.classList.add('is-open');

                if (trigger) {
                    trigger.setAttribute('aria-expanded', 'true');
                }
            };

            items.forEach((item) => {
                const trigger = item.querySelector(SELECTORS.accordionTrigger);

                if (!trigger) {
                    return;
                }

                trigger.addEventListener('click', () => {
                    const isOpen = item.classList.contains('is-open');

                    items.forEach(closeItem);

                    if (!isOpen) {
                        openItem(item);
                    }
                });
            });
        });
    }

    /**
     * Simple smooth scrolling for internal anchors.
     */
    function initSmoothScroll() {
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href^="#"]');

            if (!link) {
                return;
            }

            const targetId = link.getAttribute('href');

            if (!targetId || targetId === '#') {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'auto'
                    : 'smooth',
                block: 'start'
            });

            window.history.replaceState(null, '', targetId);
        });
    }

    /**
     * Cookie consent storage logic.
     */
    function getStoredCookiePreferences() {
        try {
            const storedValue = localStorage.getItem(CONFIG.cookies.storageKey);

            return storedValue ? JSON.parse(storedValue) : null;
        } catch (error) {
            console.warn('Could not read cookie settings from localStorage.', error);
            return null;
        }
    }

    function saveCookiePreferences(preferences) {
        try {
            localStorage.setItem(
                CONFIG.cookies.storageKey,
                JSON.stringify({
                    updatedAt: new Date().toISOString(),
                    preferences
                })
            );
        } catch (error) {
            console.warn('Could not save cookie settings to localStorage.', error);
        }
    }

    function getDefaultCookiePreferences() {
        return CONFIG.cookies.categories.reduce((preferences, category) => {
            preferences[category.id] = category.required ? true : category.enabled;
            return preferences;
        }, {});
    }

    function closeCookieBanner() {
        const banner = document.querySelector(SELECTORS.cookieBanner);

        if (!banner) {
            return;
        }

        banner.classList.remove('is-visible');
        banner.setAttribute('aria-hidden', 'true');
    }

    function openCookiePreferences() {
        const panel = document.querySelector(SELECTORS.cookiePreferences);

        if (!panel) {
            return;
        }

        panel.classList.add('is-open');
        panel.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-cookie-open');

        const firstFocusableElement = panel.querySelector(
            'button, input:not([disabled]), a[href]'
        );

        if (firstFocusableElement) {
            window.setTimeout(() => firstFocusableElement.focus(), 30);
        }
    }

    function closeCookiePreferences() {
        const panel = document.querySelector(SELECTORS.cookiePreferences);

        if (!panel) {
            return;
        }

        panel.classList.remove('is-open');
        panel.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-cookie-open');
    }

    function syncCookieInputs(preferences) {
        document.querySelectorAll('[data-cookie-category]').forEach((input) => {
            const categoryId = input.dataset.cookieCategory;

            if (!categoryId) {
                return;
            }

            input.checked = Boolean(preferences[categoryId]);
        });
    }

    function collectCookieInputs() {
        const preferences = getDefaultCookiePreferences();

        document.querySelectorAll('[data-cookie-category]').forEach((input) => {
            const categoryId = input.dataset.cookieCategory;

            if (!categoryId || input.disabled) {
                return;
            }

            preferences[categoryId] = input.checked;
        });

        preferences.essential = true;

        return preferences;
    }

    function initCookieConsent() {
        const banner = document.querySelector(SELECTORS.cookieBanner);
        const preferencesPanel = document.querySelector(SELECTORS.cookiePreferences);

        if (!banner || !preferencesPanel) {
            return;
        }

        const storedData = getStoredCookiePreferences();
        const initialPreferences = storedData?.preferences || getDefaultCookiePreferences();

        syncCookieInputs(initialPreferences);

        if (!storedData) {
            window.setTimeout(() => {
                banner.classList.add('is-visible');
                banner.setAttribute('aria-hidden', 'false');
            }, 500);
        }

        document.querySelectorAll(SELECTORS.cookieAcceptAll).forEach((button) => {
            button.addEventListener('click', () => {
                const acceptAll = CONFIG.cookies.categories.reduce(
                    (preferences, category) => {
                        preferences[category.id] = true;
                        return preferences;
                    },
                    {}
                );

                saveCookiePreferences(acceptAll);
                syncCookieInputs(acceptAll);
                closeCookieBanner();
                closeCookiePreferences();
            });
        });

        document.querySelectorAll(SELECTORS.cookieRejectOptional).forEach((button) => {
            button.addEventListener('click', () => {
                const requiredOnly = CONFIG.cookies.categories.reduce(
                    (preferences, category) => {
                        preferences[category.id] = category.required;
                        return preferences;
                    },
                    {}
                );

                saveCookiePreferences(requiredOnly);
                syncCookieInputs(requiredOnly);
                closeCookieBanner();
                closeCookiePreferences();
            });
        });

        document.querySelectorAll(SELECTORS.cookieManage).forEach((button) => {
            button.addEventListener('click', () => {
                closeCookieBanner();
                openCookiePreferences();
            });
        });

        document.querySelectorAll(SELECTORS.footerCookieSettings).forEach((button) => {
            button.addEventListener('click', () => {
                openCookiePreferences();
            });
        });

        document.querySelectorAll(SELECTORS.cookiePreferencesClose).forEach((button) => {
            button.addEventListener('click', closeCookiePreferences);
        });

        document.querySelectorAll(SELECTORS.cookiePreferencesSave).forEach((button) => {
            button.addEventListener('click', () => {
                const preferences = collectCookieInputs();

                saveCookiePreferences(preferences);
                syncCookieInputs(preferences);
                closeCookieBanner();
                closeCookiePreferences();
            });
        });

        preferencesPanel.addEventListener('click', (event) => {
            if (event.target === preferencesPanel) {
                closeCookiePreferences();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && preferencesPanel.classList.contains('is-open')) {
                closeCookiePreferences();
            }
        });
    }

    /**
     * Global form validation.
     *
     * Important:
     * This does not fake a successful submission.
     * A form is only submitted when it has a real action URL.
     *
     * HTML:
     * <form data-aqualume-form action="https://your-real-endpoint.com" method="post">
     */
    function initForms() {
        const forms = document.querySelectorAll(SELECTORS.form);

        forms.forEach((form) => {
            const statusElement = form.querySelector(SELECTORS.formStatus);

            const setStatus = (message, type) => {
                if (!statusElement) {
                    return;
                }

                statusElement.textContent = message;
                statusElement.className = `form-status is-visible form-status--${type}`;
            };

            const clearStatus = () => {
                if (!statusElement) {
                    return;
                }

                statusElement.textContent = '';
                statusElement.className = 'form-status';
            };

            const validateField = (field) => {
                const wrapper = field.closest('.form-field');

                if (!wrapper) {
                    return field.checkValidity();
                }

                const isValid = field.checkValidity();

                wrapper.classList.toggle('has-error', !isValid);
                field.setAttribute('aria-invalid', String(!isValid));

                return isValid;
            };

            form.querySelectorAll('input, select, textarea').forEach((field) => {
                field.addEventListener('blur', () => validateField(field));

                field.addEventListener('input', () => {
                    if (field.getAttribute('aria-invalid') === 'true') {
                        validateField(field);
                    }
                });
            });

            form.addEventListener('submit', (event) => {
                clearStatus();

                const fields = Array.from(
                    form.querySelectorAll('input[required], select[required], textarea[required]')
                );

                const isFormValid = fields.every(validateField);

                if (!isFormValid) {
                    event.preventDefault();

                    setStatus(CONFIG.form.errorMessage, 'error');

                    const invalidField = form.querySelector('[aria-invalid="true"]');

                    if (invalidField instanceof HTMLElement) {
                        invalidField.focus();
                    }

                    return;
                }

                const action = form.getAttribute('action');

                if (!action || action === '#' || action.trim() === '') {
                    event.preventDefault();

                    setStatus(
                        'Form submission is not configured yet. Add a real form endpoint before publishing.',
                        'error'
                    );
                }
            });
        });
    }

    /**
     * Convenience methods for service data.
     * Other page-specific scripts can use these methods safely.
     */
    window.Aqualume = {
        config: CONFIG,

        getServiceById(serviceId) {
            return CONFIG.services.find((service) => service.id === serviceId) || null;
        },

        getServiceByUrl(url) {
            return CONFIG.services.find((service) => service.url === url) || null;
        },

        getRelatedServices(serviceIds) {
            if (!Array.isArray(serviceIds)) {
                return [];
            }

            return serviceIds
                .map((serviceId) => this.getServiceById(serviceId))
                .filter(Boolean);
        },

        refreshIcons() {
            initLucideIcons();
        },

        refreshAOS() {
            if (window.AOS && typeof window.AOS.refreshHard === 'function') {
                window.AOS.refreshHard();
            }
        }
    };

    /**
     * Global initialization order.
     */
    function init() {
        hydrateTextValues();
        hydrateHrefValues();
        hydrateCurrentYear();

        renderDesktopServiceDropdown();
        renderMobileServiceLinks();
        renderFooterServiceLinks();

        initStickyHeader();
        initMobileMenu();
        initMobileServicesAccordion();
        initAccordions();
        initSmoothScroll();
        initCookieConsent();
        initForms();

        initLucideIcons();
        initAOS();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();