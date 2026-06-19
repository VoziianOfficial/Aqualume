'use strict';

/* =========================================================
   AQUALUME — ABOUT PAGE FUNCTIONALITY
   File: assets/js/about.js

   Requires:
   - assets/js/config.js
   - assets/js/global.js
   ========================================================= */

(function () {
    const CONFIG = window.AQUALUME_CONFIG;
    const Aqualume = window.Aqualume;

    if (!CONFIG || !Aqualume) {
        console.error(
            'Aqualume about.js requires config.js and global.js to load first.'
        );
        return;
    }

    const HELP_CONTENT = {
        describe: {
            image: 'assets/images/about/describe-situation.jpg',
            alt: 'Homeowner describing a water damage concern on a laptop',
            label: 'START WITH CONTEXT'
        },
        paths: {
            image: 'assets/images/about/support-paths.jpg',
            alt: 'Homeowner reviewing relevant water damage support paths',
            label: 'EXPLORE THE RIGHT DIRECTION'
        },
        options: {
            image: 'assets/images/about/provider-options.jpg',
            alt: 'Homeowner comparing local provider options with more clarity',
            label: 'COMPARE WITH MORE CLARITY'
        },
        choose: {
            image: 'assets/images/about/homeowner-choice.jpg',
            alt: 'Homeowner confidently choosing a next step for their home',
            label: 'YOUR HOME. YOUR DECISION.'
        }
    };

    /**
     * Makes the “What Aqualume Helps You Do” rows interactive.
     * Each row changes the visual, photo label, and active content state.
     */
    function initHelpRows() {
        const rows = Array.from(
            document.querySelectorAll('[data-about-help-row]')
        );

        const image = document.querySelector('[data-helps-image]');
        const label = document.querySelector('[data-helps-label]');
        const photoFrame = document.querySelector('.about-helps__photo');

        if (rows.length === 0 || !image || !label || !photoFrame) {
            return;
        }

        let changeTimer = null;

        function setActiveRow(helpId) {
            const content = HELP_CONTENT[helpId];

            if (!content) {
                return;
            }

            rows.forEach((row) => {
                const isActive = row.dataset.helpId === helpId;

                row.classList.toggle('is-active', isActive);
                row.setAttribute('aria-pressed', String(isActive));
            });

            photoFrame.classList.remove('is-changing');

            window.requestAnimationFrame(() => {
                photoFrame.classList.add('is-changing');
            });

            window.clearTimeout(changeTimer);

            const nextImage = new Image();
            nextImage.src = content.image;

            const applyNewMedia = () => {
                image.src = content.image;
                image.alt = content.alt;
                label.textContent = content.label;

                window.setTimeout(() => {
                    photoFrame.classList.remove('is-changing');
                }, 120);
            };

            nextImage.addEventListener('load', applyNewMedia, { once: true });

            nextImage.addEventListener(
                'error',
                () => {
                    console.warn(
                        `Aqualume: could not load About media image: ${content.image}`
                    );

                    applyNewMedia();
                },
                { once: true }
            );

            changeTimer = window.setTimeout(() => {
                photoFrame.classList.remove('is-changing');
            }, 800);
        }

        rows.forEach((row) => {
            row.addEventListener('click', () => {
                setActiveRow(row.dataset.helpId);
            });
        });
    }

    /**
     * Creates one testimonial card from the central config data.
     */
    function createTestimonialCard(testimonial) {
        const card = document.createElement('article');
        const top = document.createElement('div');
        const quoteIcon = document.createElement('i');
        const stars = document.createElement('div');
        const quote = document.createElement('p');
        const footer = document.createElement('div');
        const person = document.createElement('div');
        const name = document.createElement('p');
        const role = document.createElement('p');
        const tag = document.createElement('span');

        card.className = 'testimonial-card';

        top.className = 'testimonial-card__top';

        quoteIcon.className = 'testimonial-card__quote-icon';
        quoteIcon.dataset.lucide = 'quote';
        quoteIcon.setAttribute('aria-hidden', 'true');

        stars.className = 'testimonial-card__stars';
        stars.setAttribute(
            'aria-label',
            `${testimonial.rating || 5} out of 5 stars`
        );

        const rating = Number(testimonial.rating) || 5;

        for (let index = 0; index < rating; index += 1) {
            const star = document.createElement('i');

            star.dataset.lucide = 'star';
            star.setAttribute('aria-hidden', 'true');

            stars.appendChild(star);
        }

        quote.className = 'testimonial-card__quote';
        quote.textContent = `“${testimonial.text}”`;

        footer.className = 'testimonial-card__footer';

        name.className = 'testimonial-card__name';
        name.textContent = testimonial.name;

        role.className = 'testimonial-card__role';
        role.textContent = testimonial.role;

        tag.className = 'tag testimonial-card__tag';
        tag.textContent = testimonial.service;

        person.append(name, role);
        top.append(quoteIcon, stars, quote);
        footer.append(person, tag);
        card.append(top, footer);

        return card;
    }

    /**
     * Renders a manual testimonial slider.
     * No autoplay is used.
     */
    function initTestimonialsSlider() {
        const slider = document.querySelector('[data-testimonial-slider]');
        const track = document.querySelector('[data-testimonial-track]');
        const previousButton = document.querySelector('[data-testimonial-prev]');
        const nextButton = document.querySelector('[data-testimonial-next]');
        const currentElement = document.querySelector(
            '[data-testimonial-current]'
        );
        const totalElement = document.querySelector(
            '[data-testimonial-total]'
        );

        if (
            !slider ||
            !track ||
            !previousButton ||
            !nextButton ||
            !currentElement ||
            !totalElement ||
            !Array.isArray(CONFIG.testimonials) ||
            CONFIG.testimonials.length === 0
        ) {
            return;
        }

        const testimonials = CONFIG.testimonials;
        let activeIndex = 0;

        track.innerHTML = '';

        testimonials.forEach((testimonial) => {
            track.appendChild(createTestimonialCard(testimonial));
        });

        totalElement.textContent = String(testimonials.length).padStart(2, '0');

        slider.setAttribute('tabindex', '0');
        slider.setAttribute('aria-label', 'Homeowner feedback slider');

        function updateSlider() {
            track.style.transform = `translateX(-${activeIndex * 100}%)`;

            currentElement.textContent = String(activeIndex + 1).padStart(2, '0');

            previousButton.setAttribute(
                'aria-label',
                'Show previous testimonial'
            );

            nextButton.setAttribute('aria-label', 'Show next testimonial');
        }

        function goToPrevious() {
            activeIndex =
                activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;

            updateSlider();
        }

        function goToNext() {
            activeIndex =
                activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1;

            updateSlider();
        }

        previousButton.addEventListener('click', goToPrevious);
        nextButton.addEventListener('click', goToNext);

        slider.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                goToPrevious();
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                goToNext();
            }
        });

        updateSlider();

        if (typeof Aqualume.refreshIcons === 'function') {
            Aqualume.refreshIcons();
        }
    }

    function init() {
        initHelpRows();
        initTestimonialsSlider();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();