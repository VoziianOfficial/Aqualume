'use strict';



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

    
    function getConfigValue(path) {
        return path.split('.').reduce((value, key) => {
            if (value && Object.prototype.hasOwnProperty.call(value, key)) {
                return value[key];
            }

            return undefined;
        }, CONFIG);
    }

    
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

    
    function hydrateConfigAttributes() {
        const attributeElements = document.querySelectorAll('[data-config-attr]');

        attributeElements.forEach((element) => {
            const configAttr = element.dataset.configAttr;

            if (!configAttr) {
                return;
            }

            configAttr.split('|').forEach((pair) => {
                const separatorIndex = pair.indexOf(':');

                if (separatorIndex === -1) {
                    return;
                }

                const attributeName = pair.slice(0, separatorIndex).trim();
                const configPath = pair.slice(separatorIndex + 1).trim();

                if (!attributeName || !configPath) {
                    return;
                }

                const value = getConfigValue(configPath);

                if (typeof value !== 'undefined') {
                    element.setAttribute(attributeName, String(value));
                }
            });
        });
    }

    
    function hydrateCompanyAttributePlaceholders() {
        document.querySelectorAll('*').forEach((element) => {
            Array.from(element.attributes).forEach((attribute) => {
                if (!attribute.value.includes('{{company.name}}')) {
                    return;
                }

                element.setAttribute(
                    attribute.name,
                    attribute.value.replaceAll('{{company.name}}', CONFIG.company.name)
                );
            });
        });
    }

    
    function hydrateCompanyLabels() {
        const labelElements = document.querySelectorAll('[data-config-company-label]');

        labelElements.forEach((element) => {
            const rawTemplate = element.dataset.configCompanyLabel;

            if (!rawTemplate) {
                return;
            }

            const label = rawTemplate.includes('{company}')
                ? rawTemplate.replaceAll('{company}', CONFIG.company.name)
                : `${rawTemplate} ${CONFIG.company.name}`;

            element.setAttribute('aria-label', label.trim());
        });
    }

    
    function hydrateMapLinks() {
        document.querySelectorAll('[data-config-map-link]').forEach((element) => {
            element.setAttribute('href', CONFIG.company.mapHref);
            element.setAttribute('target', '_blank');
            element.setAttribute('rel', 'noopener noreferrer');
        });
    }

    
    function hydrateCurrentYear() {
        document.querySelectorAll(SELECTORS.dynamicYear).forEach((element) => {
            element.textContent = String(new Date().getFullYear());
        });
    }

    
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

    
    function init() {
        hydrateTextValues();
        hydrateHrefValues();
        hydrateConfigAttributes();
        hydrateCompanyAttributePlaceholders();
        hydrateCompanyLabels();
        hydrateMapLinks();
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
