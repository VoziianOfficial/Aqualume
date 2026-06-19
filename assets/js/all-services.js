'use strict';



(function () {
    const CONFIG = window.AQUALUME_CONFIG;
    const Aqualume = window.Aqualume;

    if (!CONFIG || !Aqualume) {
        console.error(
            'Aqualume all-services.js requires config.js and global.js to load first.'
        );
        return;
    }

    
    const FALLBACK_SERVICE_DETAILS = {
        'emergency-water-damage': {
            title: 'Emergency Water Damage Help',
            tag: 'Urgent situation',
            tagClass: 'tag--urgent',
            icon: 'siren',
            image: 'assets/images/services/emergency-water-damage-explorer.jpg',
            alt: 'Localized water spreading near a clean residential floor',
            summary:
                'Explore support paths for active leaks, sudden water intrusion, and situations where fast local support may be needed.'
        },

        'water-extraction-drying': {
            title: 'Water Extraction & Drying',
            tag: 'Water removal path',
            tagClass: 'tag--dark',
            icon: 'wind',
            image: 'assets/images/services/water-extraction-drying-explorer.jpg',
            alt: 'Drying equipment positioned in a clean residential room after a water concern',
            summary:
                'Explore support paths connected to standing water, damp materials, and drying-related concerns.'
        },

        'flood-damage-restoration': {
            title: 'Flood Damage Restoration',
            tag: 'Post-flood concerns',
            tagClass: 'tag--dark',
            icon: 'cloud-rain',
            image: 'assets/images/services/flood-damage-restoration-explorer.jpg',
            alt: 'Residential interior after an indoor flooding or water intrusion situation',
            summary:
                'Explore service directions for broader water intrusion concerns after flooding or a significant indoor water event.'
        },

        'burst-pipe-leak-damage': {
            title: 'Burst Pipe & Leak Damage',
            tag: 'Leak-related concerns',
            tagClass: 'tag--dark',
            icon: 'wrench',
            image: 'assets/images/services/burst-pipe-leak-explorer.jpg',
            alt: 'Water concern around a pipe connection in a residential space',
            summary:
                'Explore support paths that may fit a burst pipe, ongoing leak, or water concern around plumbing-connected areas.'
        },

        'basement-water-damage': {
            title: 'Basement Water Damage',
            tag: 'Lower-level moisture',
            tagClass: 'tag--dark',
            icon: 'layers',
            image: 'assets/images/services/basement-water-damage-explorer.jpg',
            alt: 'Clean lower-level home space with a basement water concern',
            summary:
                'Explore local support options for visible water, ongoing dampness, or moisture concerns in lower-level spaces.'
        },

        'mold-remediation-options': {
            title: 'Mold Risk & Remediation Options',
            tag: 'Moisture-related questions',
            tagClass: 'tag--dark',
            icon: 'scan-search',
            image: 'assets/images/services/mold-remediation-options-explorer.jpg',
            alt: 'Homeowner reviewing moisture-related support options after a water concern',
            summary:
                'Explore relevant support directions when lingering moisture, damp materials, or visible changes raise mold-related questions.'
        }
    };

    function toKebabCase(value) {
        return String(value || '')
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    }

    function getFirstString(...values) {
        return values.find(
            (value) => typeof value === 'string' && value.trim().length > 0
        );
    }

    function getServiceFromConfig(serviceId) {
        if (!Array.isArray(CONFIG.services)) {
            return null;
        }

        return (
            CONFIG.services.find((service) => service.id === serviceId) ||
            CONFIG.services.find((service) =>
                String(service.url || '').includes(`${serviceId}.html`)
            ) ||
            null
        );
    }

    function getServiceTag(service, fallback) {
        if (typeof service?.tag === 'string') {
            return service.tag;
        }

        if (typeof service?.category === 'string') {
            return service.category;
        }

        if (Array.isArray(service?.tags) && typeof service.tags[0] === 'string') {
            return service.tags[0];
        }

        return fallback.tag;
    }

    function getExplorerImage(service, fallback) {
        return getFirstString(
            service?.explorerImage,
            service?.imageExplorer,
            service?.images?.explorer,
            service?.images?.explorerImage,
            fallback.image
        );
    }

    function getExplorerAlt(service, fallback) {
        return getFirstString(
            service?.explorerAlt,
            service?.imageAlt,
            service?.images?.explorerAlt,
            fallback.alt
        );
    }

    function resolveServiceDetails(serviceId) {
        const fallback = FALLBACK_SERVICE_DETAILS[serviceId];

        if (!fallback) {
            return null;
        }

        const service = getServiceFromConfig(serviceId);

        return {
            id: serviceId,
            title: getFirstString(service?.title, fallback.title),
            tag: getServiceTag(service, fallback),
            tagClass:
                serviceId === 'emergency-water-damage'
                    ? 'tag--urgent'
                    : 'tag--dark',
            icon: toKebabCase(
                getFirstString(service?.icon, fallback.icon)
            ),
            image: getExplorerImage(service, fallback),
            alt: getExplorerAlt(service, fallback),
            summary: getFirstString(
                service?.summary,
                service?.cardCopy,
                service?.description,
                fallback.summary
            )
        };
    }

    function replaceExplorerIcon(iconName) {
        const currentIcon = document.querySelector(
            '[data-service-explorer-icon]'
        );

        if (!currentIcon) {
            return;
        }

        const nextIcon = document.createElement('i');

        nextIcon.dataset.serviceExplorerIcon = '';
        nextIcon.dataset.lucide = iconName;
        nextIcon.setAttribute('aria-hidden', 'true');

        currentIcon.replaceWith(nextIcon);

        if (typeof Aqualume.refreshIcons === 'function') {
            Aqualume.refreshIcons();
        }
    }

    function initServiceExplorer() {
        const explorer = document.querySelector('[data-service-explorer]');
        const rows = Array.from(
            document.querySelectorAll('[data-service-explorer-row]')
        );

        const media = document.querySelector('[data-service-explorer-media]');
        const image = document.querySelector('[data-service-explorer-image]');
        const tag = document.querySelector('[data-service-explorer-tag]');
        const title = document.querySelector('[data-service-explorer-title]');
        const summary = document.querySelector(
            '[data-service-explorer-summary]'
        );

        if (
            !explorer ||
            rows.length === 0 ||
            !media ||
            !image ||
            !tag ||
            !title ||
            !summary
        ) {
            return;
        }

        let activeImageRequest = 0;

        function updateMedia(details) {
            activeImageRequest += 1;

            const currentRequest = activeImageRequest;
            const preloadedImage = new Image();

            media.classList.add('is-changing');

            tag.className = `tag ${details.tagClass}`;
            tag.textContent = details.tag;
            title.textContent = details.title;
            summary.textContent = details.summary;

            replaceExplorerIcon(details.icon);

            preloadedImage.onload = () => {
                if (currentRequest !== activeImageRequest) {
                    return;
                }

                image.src = details.image;
                image.alt = details.alt;

                window.requestAnimationFrame(() => {
                    media.classList.remove('is-changing');
                });
            };

            preloadedImage.onerror = () => {
                if (currentRequest !== activeImageRequest) {
                    return;
                }

                console.warn(
                    `Aqualume: explorer image could not load: ${details.image}`
                );

                media.classList.remove('is-changing');
            };

            preloadedImage.src = details.image;
        }

        function setActiveService(serviceId) {
            const closeAllRows = !serviceId;
            const details = closeAllRows
                ? null
                : resolveServiceDetails(serviceId);

            if (!closeAllRows && !details) {
                return;
            }

            rows.forEach((row) => {
                const isActive =
                    !closeAllRows && row.dataset.serviceId === serviceId;

                const trigger = row.querySelector(
                    '[data-service-explorer-trigger]'
                );

                const content = row.querySelector(
                    '.service-explorer-row__content'
                );

                row.classList.toggle('is-active', isActive);

                if (trigger) {
                    trigger.setAttribute('aria-expanded', String(isActive));
                }

                if (content) {
                    content.setAttribute('aria-hidden', String(!isActive));
                }
            });

            
            if (!closeAllRows) {
                updateMedia(details);
            }
        }

        rows.forEach((row) => {
            const trigger = row.querySelector('[data-service-explorer-trigger]');

            if (!trigger) {
                return;
            }

            trigger.addEventListener('click', () => {
                const isAlreadyOpen = row.classList.contains('is-active');

                setActiveService(
                    isAlreadyOpen ? null : row.dataset.serviceId
                );
            });
        });

        
        const requestedService = new URLSearchParams(
            window.location.search
        ).get('service');

        if (
            requestedService &&
            rows.some((row) => row.dataset.serviceId === requestedService)
        ) {
            setActiveService(requestedService);
        }
    }

    function init() {
        initServiceExplorer();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();