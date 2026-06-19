'use strict';



(function () {
    const CONFIG = window.AQUALUME_CONFIG;
    const Aqualume = window.Aqualume;

    if (!CONFIG || !Aqualume) {
        console.error(
            'Aqualume contact.js requires config.js and global.js to load first.'
        );
        return;
    }

    const VALID_SERVICE_IDS = [
        'emergency-water-damage',
        'water-extraction-drying',
        'flood-damage-restoration',
        'burst-pipe-leak-damage',
        'basement-water-damage',
        'mold-remediation-options',
        'not-sure'
    ];

    function normalizeServiceId(value) {
        return String(value || '')
            .trim()
            .toLowerCase()
            .replace(/\.html$/i, '')
            .replace(/[\s_]+/g, '-');
    }

    function getServiceIdFromUrl() {
        const params = new URLSearchParams(window.location.search);

        const possibleValues = [
            params.get('service'),
            params.get('selectedService'),
            params.get('requestService')
        ];

        const requestedService = possibleValues
            .map(normalizeServiceId)
            .find((serviceId) => VALID_SERVICE_IDS.includes(serviceId));

        return requestedService || '';
    }

    function getErrorElement(fieldId) {
        return document.querySelector(
            `[data-error-for="${fieldId}"]`
        );
    }

    function showFieldError(field, message) {
        if (!field) {
            return;
        }

        const errorElement = getErrorElement(field.id);

        field.setAttribute('aria-invalid', 'true');

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('is-visible');
            errorElement.id = `${field.id}-error`;

            field.setAttribute('aria-describedby', errorElement.id);
        }
    }

    function clearFieldError(field) {
        if (!field) {
            return;
        }

        const errorElement = getErrorElement(field.id);

        field.removeAttribute('aria-invalid');

        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('is-visible');
        }

        field.removeAttribute('aria-describedby');
    }

    function getValue(field) {
        return String(field?.value || '').trim();
    }

    function validateService(field) {
        const value = getValue(field);

        if (!value) {
            return 'Choose the support path that feels closest to your situation.';
        }

        return '';
    }

    function validateSummary(field) {
        const value = getValue(field);

        if (!value) {
            return 'Describe what is happening before continuing.';
        }

        if (value.length < 20) {
            return 'Add a little more detail so the request has useful context.';
        }

        return '';
    }

    function validateName(field, label) {
        const value = getValue(field);

        if (!value) {
            return `Enter your ${label.toLowerCase()}.`;
        }

        if (value.length < 2) {
            return `${label} should contain at least two characters.`;
        }

        return '';
    }

    function validateEmail(field) {
        const value = getValue(field);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value) {
            return 'Enter an email address.';
        }

        if (!emailPattern.test(value)) {
            return 'Enter a valid email address.';
        }

        return '';
    }

    function validatePhone(field) {
        const value = getValue(field);

        if (!value) {
            return '';
        }

        const digits = value.replace(/\D/g, '');

        if (digits.length < 7) {
            return 'Enter a valid phone number or leave this field blank.';
        }

        return '';
    }

    function validatePostalCode(field) {
        const value = getValue(field);

        if (!value) {
            return 'Enter your ZIP or postal code.';
        }

        if (value.length < 3) {
            return 'Enter a valid ZIP or postal code.';
        }

        return '';
    }

    function validateConsent(field) {
        if (!field.checked) {
            return 'Confirm that you understand Aqualume’s platform role before continuing.';
        }

        return '';
    }

    function validateField(field) {
        if (!field) {
            return true;
        }

        let message = '';

        switch (field.id) {
            case 'request-service':
                message = validateService(field);
                break;

            case 'request-summary':
                message = validateSummary(field);
                break;

            case 'request-first-name':
                message = validateName(field, 'First name');
                break;

            case 'request-last-name':
                message = validateName(field, 'Last name');
                break;

            case 'request-email':
                message = validateEmail(field);
                break;

            case 'request-phone':
                message = validatePhone(field);
                break;

            case 'request-postal-code':
                message = validatePostalCode(field);
                break;

            case 'request-consent':
                message = validateConsent(field);
                break;

            default:
                return true;
        }

        if (message) {
            showFieldError(field, message);
            return false;
        }

        clearFieldError(field);
        return true;
    }

    function setFormStatus(statusElement, message, type) {
        if (!statusElement) {
            return;
        }

        statusElement.textContent = message;
        statusElement.className = `request-form__status is-visible request-form__status--${type}`;
    }

    function clearFormStatus(statusElement) {
        if (!statusElement) {
            return;
        }

        statusElement.textContent = '';
        statusElement.className = 'request-form__status';
    }

    function setSelectedService(serviceId, select, hiddenInput) {
        const normalizedServiceId = normalizeServiceId(serviceId);

        if (!VALID_SERVICE_IDS.includes(normalizedServiceId)) {
            return;
        }

        if (select) {
            select.value = normalizedServiceId;
        }

        if (hiddenInput) {
            hiddenInput.value = normalizedServiceId;
        }
    }

    function initSelectedService() {
        const select = document.querySelector('[data-request-service]');
        const hiddenInput = document.querySelector('[data-selected-service]');

        if (!select) {
            return;
        }

        const serviceFromUrl = getServiceIdFromUrl();

        if (serviceFromUrl) {
            setSelectedService(serviceFromUrl, select, hiddenInput);
        }

        select.addEventListener('change', () => {
            if (hiddenInput) {
                hiddenInput.value = select.value;
            }

            validateField(select);
        });
    }

    function initContactForm() {
        const form = document.querySelector('[data-contact-form]');

        if (!form) {
            return;
        }

        const statusElement = form.querySelector('[data-contact-form-status]');

        const fields = {
            service: form.querySelector('#request-service'),
            summary: form.querySelector('#request-summary'),
            firstName: form.querySelector('#request-first-name'),
            lastName: form.querySelector('#request-last-name'),
            email: form.querySelector('#request-email'),
            phone: form.querySelector('#request-phone'),
            postalCode: form.querySelector('#request-postal-code'),
            consent: form.querySelector('#request-consent')
        };

        const interactiveFields = Object.values(fields).filter(Boolean);

        interactiveFields.forEach((field) => {
            const eventName =
                field.type === 'checkbox' || field.tagName === 'SELECT'
                    ? 'change'
                    : 'input';

            field.addEventListener(eventName, () => {
                validateField(field);
                clearFormStatus(statusElement);
            });

            field.addEventListener('blur', () => {
                if (
                    field.type !== 'checkbox' &&
                    field.tagName !== 'SELECT' &&
                    getValue(field)
                ) {
                    validateField(field);
                }
            });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            clearFormStatus(statusElement);

            const fieldsToValidate = [
                fields.service,
                fields.summary,
                fields.firstName,
                fields.lastName,
                fields.email,
                fields.phone,
                fields.postalCode,
                fields.consent
            ];

            const firstInvalidField = fieldsToValidate.find(
                (field) => !validateField(field)
            );

            if (firstInvalidField) {
                setFormStatus(
                    statusElement,
                    'Please review the highlighted fields before continuing.',
                    'error'
                );

                window.setTimeout(() => {
                    firstInvalidField.focus({ preventScroll: true });

                    firstInvalidField.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 50);

                return;
            }

            
            setFormStatus(
                statusElement,
                'Your request details are complete and ready for review. This project does not yet have a connected submission endpoint, so no information has been sent.',
                'info'
            );
        });
    }

    function initContactFaq() {
        const items = Array.from(
            document.querySelectorAll('.contact-faq__item')
        );

        if (items.length === 0) {
            return;
        }

        function setOpenItem(nextItem) {
            items.forEach((item) => {
                const trigger = item.querySelector(
                    '[data-contact-faq-trigger]'
                );

                const isOpen = item === nextItem;

                item.classList.toggle('is-open', isOpen);

                if (trigger) {
                    trigger.setAttribute('aria-expanded', String(isOpen));
                }
            });
        }

        items.forEach((item) => {
            const trigger = item.querySelector('[data-contact-faq-trigger]');

            if (!trigger) {
                return;
            }

            trigger.addEventListener('click', () => {
                if (item.classList.contains('is-open')) {
                    return;
                }

                setOpenItem(item);
            });
        });

        const initiallyOpen =
            items.find((item) => item.classList.contains('is-open')) ||
            items[0];

        setOpenItem(initiallyOpen);
    }

    function init() {
        initSelectedService();
        initContactForm();
        initContactFaq();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();