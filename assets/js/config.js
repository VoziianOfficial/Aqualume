'use strict';

/**
 * Aqualume — central website configuration.
 *
 * Update brand, contact details, legal date, service URLs,
 * footer text and service content only here.
 */
window.AQUALUME_CONFIG = {
    company: {
        name: 'Aqualume',
        namePrimary: 'Aqua',
        nameAccent: 'lume',
        tagline: 'Water damage can feel chaotic. Finding the next step should feel clearer.',
        platformType: 'Independent water damage provider-matching platform',
        serviceArea: 'Selected service areas across the United States',
        address: 'Selected service areas across the United States',
        mapQuery: 'United States'
    },

    contact: {
        email: 'hello@aqualume.com',
        phoneRaw: '+18885550148',
        phoneDisplay: '(888) 555-0148',
        supportHours: '24/7 request access',
        emailHref: 'mailto:hello@aqualume.com',
        phoneHref: 'tel:+18885550148'
    },

    legal: {
        lastUpdated: 'June 19, 2026',
        privacyUrl: 'privacy-policy.html',
        termsUrl: 'terms-of-service.html',
        cookieUrl: 'cookie-policy.html'
    },

    urls: {
        home: 'index.html',
        about: 'about.html',
        services: 'services.html',
        contact: 'contact.html',
        howItWorks: 'index.html#how-it-works',
        faq: 'index.html#faq',
        request: 'contact.html#contact-form'
    },

    footer: {
        description:
            'Aqualume is an independent platform that helps homeowners explore water damage provider options. Aqualume does not directly provide restoration, drying, plumbing, mold remediation, inspection, repair, or construction services.',
        copyright: 'All rights reserved.',
        cookieSettingsLabel: 'Cookie Settings'
    },

    disclaimer: {
        short:
            'Independent platform. Local options. Homeowner choice.',
        full:
            'Aqualume is an independent platform designed to help homeowners organize water damage requests and explore local provider options. Aqualume does not directly provide restoration, drying, plumbing, mold remediation, inspection, repair, construction, or reconstruction services.'
    },

    form: {
        requestTitle: 'Start Your Request',
        requestButton: 'Start Your Request',
        contactButton: 'Send Message',
        successMessage:
            'Thank you. Your request has been received and will be reviewed shortly.',
        errorMessage:
            'Please review the highlighted fields and try again.',
        fields: {
            fullName: 'Full Name',
            email: 'Email Address',
            zipCode: 'ZIP Code',
            situation: 'What are you dealing with?',
            message: 'Short Message'
        },
        situations: [
            'Active leak',
            'Standing water',
            'Flooded room',
            'Burst pipe',
            'Basement moisture',
            'Mold concerns',
            'Something else',
            'General question'
        ]
    },

    navigation: {
        main: [
            {
                label: 'Home',
                url: 'index.html'
            },
            {
                label: 'About',
                url: 'about.html'
            },
            {
                label: 'Services',
                url: 'services.html',
                hasDropdown: true
            },
            {
                label: 'How It Works',
                url: 'index.html#how-it-works'
            },
            {
                label: 'FAQ',
                url: 'index.html#faq'
            },
            {
                label: 'Contact',
                url: 'contact.html'
            }
        ]
    },

    services: [
        {
            id: 'emergency-water-damage',
            number: '01',
            title: 'Emergency Water Damage Help',
            shortTitle: 'Emergency Help',
            url: 'emergency-water-damage.html',
            icon: 'Siren',
            image: 'assets/images/service-pages/emergency-water-damage-hero.jpg',
            cardImage: 'assets/images/services/emergency-water-damage-card.jpg',
            tag: 'Urgent situation',
            category: 'Urgent concerns',
            summary:
                'For active leaks, sudden water intrusion, standing water, and situations where the next step may feel time-sensitive.',
            cardCopy:
                'Explore support paths for active water concerns and urgent next-step questions.',
            hero: {
                kicker: 'URGENT WATER DAMAGE SUPPORT',
                title: 'Explore urgent water damage support with more clarity.',
                text:
                    'For active leaks, spreading water, sudden indoor water intrusion, and other situations where the next step may feel time-sensitive.'
            },
            editorial: {
                kicker: 'UNDERSTANDING THE SITUATION',
                title: 'When water is active, a clearer starting point matters.',
                text:
                    'An active leak or sudden water intrusion can make it difficult to know what to focus on first. Aqualume helps you organize the situation and explore relevant local support options based on what is happening in your home.',
                points: [
                    'Active water concerns can vary by location and source.',
                    'A structured request can make the situation easier to explain.',
                    'You remain in control of which option to explore next.'
                ]
            },
            path: [
                {
                    label: 'SHARE',
                    icon: 'Droplets',
                    title: 'Describe what is happening now',
                    text:
                        'Start with the source of water, visible spread, and the areas of your home that may be affected.',
                    tag: 'Active water concern'
                },
                {
                    label: 'EXPLORE',
                    icon: 'Search',
                    title: 'Review urgent support paths',
                    text:
                        'Explore relevant local provider options based on the type of water issue and the urgency you are experiencing.',
                    tag: 'Local options'
                },
                {
                    label: 'CHOOSE',
                    icon: 'ShieldCheck',
                    title: 'Move forward with clarity',
                    text:
                        'Choose the option that feels right for your home, timing, and level of urgency.',
                    tag: 'Your decision'
                }
            ],
            questions: [
                {
                    question: 'What can make a water damage concern feel urgent?',
                    answer:
                        'A concern may feel urgent when water is actively spreading, affecting ceilings, floors, walls, or lower areas of a home. The right next step can vary by the details of the situation and local availability.'
                },
                {
                    question: 'What details are helpful to include in a request?',
                    answer:
                        'It can help to describe where the water started, which areas appear affected, whether water is still active, and what you have noticed so far.'
                },
                {
                    question: 'Can water spread beyond the most visible area?',
                    answer:
                        'Water can move through nearby materials and connected areas. Sharing what you can see and where the issue began can help create a clearer request.'
                },
                {
                    question: 'What should I compare before choosing a provider option?',
                    answer:
                        'You may want to compare the support path offered, location coverage, availability, communication, and any provider-specific terms before deciding what feels right for your home.'
                }
            ],
            related: [
                'water-extraction-drying',
                'burst-pipe-leak-damage',
                'flood-damage-restoration'
            ],
            marqueeIcons: [
                'Siren',
                'Droplets',
                'TriangleAlert',
                'Pipe',
                'House',
                'ShieldCheck'
            ],
            cta: {
                title: 'Need a clearer next step for an active water concern?',
                text:
                    'Start one structured request and explore relevant local provider options for your situation.',
                button: 'Start Your Request'
            }
        },

        {
            id: 'water-extraction-drying',
            number: '02',
            title: 'Water Extraction & Drying',
            shortTitle: 'Extraction & Drying',
            url: 'water-extraction-drying.html',
            icon: 'Wind',
            image: 'assets/images/service-pages/water-extraction-drying-hero.jpg',
            cardImage: 'assets/images/services/water-extraction-drying-card.jpg',
            tag: 'Water removal path',
            category: 'Water removal & moisture control',
            summary:
                'For standing water, soaked materials, damp surfaces, and moisture concerns after a leak, appliance issue, or indoor flooding.',
            cardCopy:
                'Explore water removal and drying-related support paths with more clarity.',
            hero: {
                kicker: 'WATER EXTRACTION & DRYING',
                title: 'Explore water extraction and drying options with more clarity.',
                text:
                    'For standing water, soaked materials, damp surfaces, and moisture concerns after a leak, appliance issue, or indoor flooding.'
            },
            editorial: {
                kicker: 'UNDERSTANDING THE SITUATION',
                title: 'Standing water and damp materials can create more questions than answers.',
                text:
                    'After water reaches floors, furnishings, or lower areas of a home, the next step may depend on how much water is present, what has been affected, and how long moisture has remained. Aqualume helps you explore relevant support paths with more clarity.',
                points: [
                    'Standing water and damp materials may require different next steps.',
                    'Moisture concerns can affect more than one area.',
                    'Local provider options can be explored through one request.'
                ]
            },
            path: [
                {
                    label: 'SHARE',
                    icon: 'Droplet',
                    title: 'Tell us where water remains',
                    text:
                        'Describe standing water, soaked materials, damp areas, or the parts of your home that feel affected.',
                    tag: 'Water and moisture'
                },
                {
                    label: 'EXPLORE',
                    icon: 'Wind',
                    title: 'Review drying-related paths',
                    text:
                        'Explore relevant local options for water removal and moisture-related support.',
                    tag: 'Support options'
                },
                {
                    label: 'CHOOSE',
                    icon: 'ShieldCheck',
                    title: 'Decide what fits your situation',
                    text:
                        'Compare the paths available to you and choose what feels appropriate for your home.',
                    tag: 'Homeowner control'
                }
            ],
            questions: [
                {
                    question: 'When can standing water or damp materials become a concern?',
                    answer:
                        'The level of concern can vary depending on the affected materials, the amount of water, and how long moisture remains. A structured request can help you explore relevant support directions.'
                },
                {
                    question: 'What areas are useful to mention in a request?',
                    answer:
                        'You can describe the rooms, floors, furnishings, lower areas, or materials that appear wet, damp, or affected by water.'
                },
                {
                    question: 'Why can moisture-related situations vary from home to home?',
                    answer:
                        'Homes differ in layout, materials, source of water, and the time between the water event and the request. Those details can shape the options you may want to explore.'
                },
                {
                    question: 'How can I explore water removal and drying-related options?',
                    answer:
                        'Start with what you know about the water or moisture concern, then review the local provider options and support paths that feel most relevant to your situation.'
                }
            ],
            related: [
                'emergency-water-damage',
                'basement-water-damage',
                'mold-remediation-options'
            ],
            marqueeIcons: [
                'Droplet',
                'Wind',
                'Fan',
                'Waves',
                'House'
            ],
            cta: {
                title: 'Ready to explore water removal and drying-related options?',
                text:
                    'Describe what is affected and begin reviewing support paths with more clarity.',
                button: 'Explore Your Options'
            }
        },

        {
            id: 'flood-damage-restoration',
            number: '03',
            title: 'Flood Damage Restoration',
            shortTitle: 'Flood Recovery',
            url: 'flood-damage-restoration.html',
            icon: 'CloudRain',
            image: 'assets/images/service-pages/flood-damage-restoration-hero.jpg',
            cardImage: 'assets/images/services/flood-damage-restoration-card.jpg',
            tag: 'Post-flood concerns',
            category: 'Recovery & follow-up concerns',
            summary:
                'For rooms, surfaces, and materials affected by indoor flooding, storm-related water intrusion, or broader post-flood concerns.',
            cardCopy:
                'Explore support paths after an indoor flooding or water intrusion situation.',
            hero: {
                kicker: 'FLOOD RECOVERY OPTIONS',
                title: 'Explore support paths after a flooding situation.',
                text:
                    'For rooms, surfaces, and materials affected by indoor flooding, storm-related water intrusion, or broader post-flood concerns.'
            },
            editorial: {
                kicker: 'UNDERSTANDING THE SITUATION',
                title: 'After flooding, the full picture can take time to understand.',
                text:
                    'Flood-related water concerns may involve multiple rooms, surfaces, and materials. Aqualume helps you start with what you know now, then explore local provider options connected to broader recovery support paths.',
                points: [
                    'Flooding can affect more than the most visible area.',
                    'One structured request can help organize the situation.',
                    'You choose which provider path fits your home and timing.'
                ]
            },
            path: [
                {
                    label: 'SHARE',
                    icon: 'House',
                    title: 'Describe the affected areas',
                    text:
                        'Start with the rooms, surfaces, or materials impacted by flooding or water intrusion.',
                    tag: 'Post-flood context'
                },
                {
                    label: 'EXPLORE',
                    icon: 'ClipboardCheck',
                    title: 'Understand recovery paths',
                    text:
                        'Explore local provider options connected to broader water damage and recovery concerns.',
                    tag: 'Relevant options'
                },
                {
                    label: 'CHOOSE',
                    icon: 'ShieldCheck',
                    title: 'Take the next step your way',
                    text:
                        'Review available paths and move forward with the option that fits your home and timeline.',
                    tag: 'Your next step'
                }
            ],
            questions: [
                {
                    question: 'What can be affected after indoor flooding?',
                    answer:
                        'Flooding may affect floors, walls, lower areas, furnishings, and other surfaces. The full scope can depend on the source of water and how far it travelled.'
                },
                {
                    question: 'Why may post-flood concerns involve more than one support path?',
                    answer:
                        'A flood-related situation can include water removal, moisture, materials, and follow-up questions. You can explore service directions that match the parts of the situation you know about.'
                },
                {
                    question: 'What information helps describe a flood-related situation?',
                    answer:
                        'It can help to share where water entered, which rooms are affected, how long water was present, and what surfaces or materials you noticed.'
                },
                {
                    question: 'How can I compare recovery-related provider options?',
                    answer:
                        'Aqualume helps you begin with one structured request so you can review relevant local provider options and decide which path feels right for your home.'
                }
            ],
            related: [
                'emergency-water-damage',
                'basement-water-damage',
                'water-extraction-drying'
            ],
            marqueeIcons: [
                'CloudRain',
                'Waves',
                'House',
                'Umbrella',
                'ClipboardCheck'
            ],
            cta: {
                title: 'Start with what you know about the flood-related situation.',
                text:
                    'A structured request can help you explore relevant local recovery support options.',
                button: 'Start Your Request'
            }
        },

        {
            id: 'burst-pipe-leak-damage',
            number: '04',
            title: 'Burst Pipe & Leak Damage',
            shortTitle: 'Pipe & Leak Damage',
            url: 'burst-pipe-leak-damage.html',
            icon: 'Wrench',
            image: 'assets/images/service-pages/burst-pipe-leak-damage-hero.jpg',
            cardImage: 'assets/images/services/burst-pipe-leak-damage-card.jpg',
            tag: 'Sudden water issue',
            category: 'Urgent concerns',
            summary:
                'For sudden pipe issues, active leaks, water spread, damp walls, ceilings, floors, and moisture-related follow-up concerns.',
            cardCopy:
                'Explore options for pipe issues, leaks, water spread, and damp materials.',
            hero: {
                kicker: 'PIPE & LEAK DAMAGE SUPPORT',
                title: 'Explore options for burst pipe and leak damage concerns.',
                text:
                    'For sudden pipe issues, active leaks, water spread, damp walls, ceilings, floors, and other moisture-related follow-up concerns.'
            },
            editorial: {
                kicker: 'UNDERSTANDING THE SITUATION',
                title: 'A pipe issue can create visible and hidden water concerns.',
                text:
                    'A burst pipe or ongoing leak may involve active water, damp materials, affected surfaces, and follow-up questions about the areas around the source. Aqualume helps you explore a clearer path without needing to define every detail before you begin.',
                points: [
                    'Pipe and leak situations can change quickly.',
                    'Visible water may not tell the whole story.',
                    'A clear request can help you explore relevant options.'
                ]
            },
            path: [
                {
                    label: 'SHARE',
                    icon: 'Pipe',
                    title: 'Explain the pipe or leak concern',
                    text:
                        'Describe where the issue began, where water has traveled, and what parts of the home may be affected.',
                    tag: 'Leak-related issue'
                },
                {
                    label: 'EXPLORE',
                    icon: 'Search',
                    title: 'Review related support paths',
                    text:
                        'Explore local options connected to active leaks, water spread, and moisture follow-up concerns.',
                    tag: 'Relevant directions'
                },
                {
                    label: 'CHOOSE',
                    icon: 'ShieldCheck',
                    title: 'Choose with more context',
                    text:
                        'Compare options and select the provider path that feels right for your situation.',
                    tag: 'Homeowner choice'
                }
            ],
            questions: [
                {
                    question: 'What information is useful when a pipe or leak issue happens?',
                    answer:
                        'You can describe where the issue began, whether water is still active, where it travelled, and which parts of the home appear affected.'
                },
                {
                    question: 'Can a leak lead to moisture concerns beyond the immediate source?',
                    answer:
                        'Water can reach nearby materials, walls, ceilings, floors, and connected areas. The visible source may be only one part of the overall situation.'
                },
                {
                    question: 'What kinds of support paths may be relevant after water spreads?',
                    answer:
                        'Depending on what happened, you may want to explore options related to active water, water removal, moisture concerns, and other follow-up directions.'
                },
                {
                    question: 'How can I compare options without rushing a decision?',
                    answer:
                        'Aqualume is designed to make the starting point clearer. You can review local provider options and choose the path that fits your home, timing, and comfort level.'
                }
            ],
            related: [
                'emergency-water-damage',
                'water-extraction-drying',
                'mold-remediation-options'
            ],
            marqueeIcons: [
                'Pipe',
                'Wrench',
                'Droplet',
                'Search',
                'Waves'
            ],
            cta: {
                title: 'A pipe or leak issue does not have to lead to a rushed decision.',
                text:
                    'Describe the situation and explore relevant local provider options at your pace.',
                button: 'Explore Support Options'
            }
        },

        {
            id: 'basement-water-damage',
            number: '05',
            title: 'Basement Water Damage',
            shortTitle: 'Basement Damage',
            url: 'basement-water-damage.html',
            icon: 'Layers',
            image: 'assets/images/service-pages/basement-water-damage-hero.jpg',
            cardImage: 'assets/images/services/basement-water-damage-card.jpg',
            tag: 'Lower-level concern',
            category: 'Water removal & moisture control',
            summary:
                'For lower-level water intrusion, basement moisture, standing water, damp materials, and concerns that may affect below-grade spaces.',
            cardCopy:
                'Explore support paths for lower-level water intrusion and basement moisture concerns.',
            hero: {
                kicker: 'BASEMENT WATER CONCERNS',
                title: 'Explore basement water damage options with more clarity.',
                text:
                    'For lower-level water intrusion, basement moisture, standing water, damp materials, and concerns that may affect below-grade spaces.'
            },
            editorial: {
                kicker: 'UNDERSTANDING THE SITUATION',
                title: 'Basement water concerns deserve more than a rushed search.',
                text:
                    'Water in lower-level areas can range from occasional moisture to standing water or recurring damp conditions. Aqualume helps homeowners organize what they are seeing and explore support options related to their particular space.',
                points: [
                    'Basement issues can look different from home to home.',
                    'Lower-level moisture may involve more than one concern.',
                    'Exploring options can start with a simple request.'
                ]
            },
            path: [
                {
                    label: 'SHARE',
                    icon: 'House',
                    title: 'Describe your lower-level concern',
                    text:
                        'Start with standing water, dampness, recurring moisture, or the area of the basement that needs attention.',
                    tag: 'Basement context'
                },
                {
                    label: 'EXPLORE',
                    icon: 'MapPin',
                    title: 'Explore support directions',
                    text:
                        'Review options connected to lower-level water, moisture, and related recovery concerns.',
                    tag: 'Local options'
                },
                {
                    label: 'CHOOSE',
                    icon: 'ShieldCheck',
                    title: 'Move forward at your pace',
                    text:
                        'Choose the support path that fits the condition of your space and your timeline.',
                    tag: 'Your home'
                }
            ],
            questions: [
                {
                    question: 'What types of basement water concerns can homeowners describe?',
                    answer:
                        'You can describe standing water, dampness, recurring moisture, wet materials, affected utility areas, or the specific part of the basement that concerns you.'
                },
                {
                    question: 'Why can recurring basement moisture feel different from standing water?',
                    answer:
                        'The source, amount of water, timing, and affected materials can be different. A request can focus on what you are seeing now without requiring you to define every detail.'
                },
                {
                    question: 'What details are useful when starting a request?',
                    answer:
                        'It may help to include the basement area involved, whether water is visible, how often the concern appears, and any materials that seem damp or affected.'
                },
                {
                    question: 'How can I explore lower-level water damage options?',
                    answer:
                        'Aqualume helps you organize the concern and explore local provider options connected to basement water and moisture-related support paths.'
                }
            ],
            related: [
                'flood-damage-restoration',
                'water-extraction-drying',
                'mold-remediation-options'
            ],
            marqueeIcons: [
                'House',
                'Layers',
                'Waves',
                'Droplets',
                'MapPin'
            ],
            cta: {
                title: 'Get a clearer view of your basement water damage options.',
                text:
                    'Start with the condition of your lower-level space and explore relevant next steps.',
                button: 'Start Your Request'
            }
        },

        {
            id: 'mold-remediation-options',
            number: '06',
            title: 'Mold Risk & Remediation Options',
            shortTitle: 'Mold-Risk Options',
            url: 'mold-remediation-options.html',
            icon: 'ScanSearch',
            image: 'assets/images/service-pages/mold-remediation-options-hero.jpg',
            cardImage: 'assets/images/services/mold-remediation-options-card.jpg',
            tag: 'Moisture-related concern',
            category: 'Recovery & follow-up concerns',
            summary:
                'For lingering dampness, moisture-related changes, musty conditions, or questions that may arise after a leak, flood, or ongoing water concern.',
            cardCopy:
                'Explore moisture and mold-risk support paths with a clearer starting point.',
            hero: {
                kicker: 'MOISTURE & MOLD-RISK OPTIONS',
                title: 'Explore moisture and mold-risk support options with more clarity.',
                text:
                    'For lingering dampness, moisture-related changes, musty conditions, or questions that may arise after a leak, flood, or ongoing water concern.'
            },
            editorial: {
                kicker: 'UNDERSTANDING THE SITUATION',
                title: 'Lingering moisture can raise important follow-up questions.',
                text:
                    'When dampness remains after a water issue, homeowners may want a clearer understanding of which support paths to explore. Aqualume helps organize those concerns and present relevant local provider options without pressure.',
                points: [
                    'Moisture-related concerns can develop after different water events.',
                    'It helps to describe what you are noticing clearly.',
                    'You stay in control of the options you consider.'
                ]
            },
            path: [
                {
                    label: 'SHARE',
                    icon: 'Droplets',
                    title: 'Describe what you are noticing',
                    text:
                        'Start with lingering moisture, musty conditions, damp materials, or visible changes that concern you.',
                    tag: 'Moisture concern'
                },
                {
                    label: 'EXPLORE',
                    icon: 'ScanSearch',
                    title: 'Review relevant paths',
                    text:
                        'Explore local support directions related to moisture and mold-risk questions after water damage.',
                    tag: 'Relevant options'
                },
                {
                    label: 'CHOOSE',
                    icon: 'ShieldCheck',
                    title: 'Decide with more clarity',
                    text:
                        'Compare the options available and choose the next step that feels right for your home.',
                    tag: 'Your decision'
                }
            ],
            questions: [
                {
                    question: 'What types of moisture-related changes may raise questions?',
                    answer:
                        'Lingering dampness, musty conditions, damp materials, or visible changes after a water event can lead homeowners to explore relevant support paths.'
                },
                {
                    question: 'Why is it useful to include the earlier water event in a request?',
                    answer:
                        'The earlier context can help explain the situation more clearly, whether it followed a leak, flooding, standing water, or ongoing moisture.'
                },
                {
                    question: 'What information can help describe a moisture concern clearly?',
                    answer:
                        'You can share where you notice the concern, what changed, whether moisture remains, and what water event or condition may have happened before it.'
                },
                {
                    question: 'How can I explore relevant local provider options without pressure?',
                    answer:
                        'Aqualume is an independent platform. You can explore local provider options and decide which service path, timing, and next step feel right for your home.'
                }
            ],
            related: [
                'water-extraction-drying',
                'basement-water-damage',
                'burst-pipe-leak-damage'
            ],
            marqueeIcons: [
                'ScanSearch',
                'Wind',
                'ShieldCheck',
                'Search',
                'Droplets'
            ],
            cta: {
                title: 'Start with the moisture concerns you are noticing now.',
                text:
                    'Explore relevant local support paths with more context and homeowner control.',
                button: 'Explore Your Options'
            }
        }
    ],

    homeSituations: [
        {
            id: 'active-leak',
            label: 'Active leak',
            tag: 'Urgency may vary',
            serviceId: 'emergency-water-damage',
            title: 'ACTIVE LEAK',
            text:
                'A leak can spread through flooring, walls, or ceilings. Explore water damage support options based on the type and urgency of the situation.',
            linkLabel: 'Explore emergency support'
        },
        {
            id: 'standing-water',
            label: 'Standing water',
            tag: 'Water removal path',
            serviceId: 'water-extraction-drying',
            title: 'STANDING WATER',
            text:
                'Water that remains on floors or in lower areas can affect materials and create moisture concerns. Explore relevant extraction and drying options.',
            linkLabel: 'Explore extraction options'
        },
        {
            id: 'flooded-room',
            label: 'Flooded room',
            tag: 'Post-flood concerns',
            serviceId: 'flood-damage-restoration',
            title: 'FLOODED ROOM',
            text:
                'Flooding inside a room may involve multiple affected materials and surfaces. Explore support paths designed for post-flood concerns.',
            linkLabel: 'Explore flood recovery'
        },
        {
            id: 'burst-pipe',
            label: 'Burst pipe',
            tag: 'Sudden water issue',
            serviceId: 'burst-pipe-leak-damage',
            title: 'BURST PIPE',
            text:
                'A sudden pipe issue can lead to active water spread and hidden moisture. Explore options related to leaks, water removal, and follow-up support.',
            linkLabel: 'Explore pipe damage options'
        },
        {
            id: 'basement-moisture',
            label: 'Basement moisture',
            tag: 'Lower-level concern',
            serviceId: 'basement-water-damage',
            title: 'BASEMENT MOISTURE',
            text:
                'Basement water concerns may range from visible water to ongoing dampness. Explore local support options based on the condition of the space.',
            linkLabel: 'Explore basement options'
        },
        {
            id: 'mold-concerns',
            label: 'Mold concerns',
            tag: 'Moisture-related concern',
            serviceId: 'mold-remediation-options',
            title: 'MOLD CONCERNS',
            text:
                'Lingering moisture, damp materials, or visible changes can raise mold-related questions. Explore relevant support directions before deciding what comes next.',
            linkLabel: 'Explore mold-risk options'
        }
    ],

    stats: [
        {
            value: '6+',
            label: 'Water damage support categories'
        },
        {
            value: '24/7',
            label: 'Request access'
        },
        {
            value: '3',
            suffix: ' Steps',
            label: 'To compare options'
        },
        {
            value: '1',
            suffix: ' Platform',
            label: 'For clearer next steps'
        }
    ],

    testimonials: [
        {
            name: 'Emily R.',
            role: 'Homeowner',
            service: 'Emergency Help',
            rating: 5,
            text:
                'We noticed water spreading across the floor late in the evening and needed a clearer next step fast. Aqualume made it easier to submit one request and compare local options without wasting time.'
        },
        {
            name: 'Daniel M.',
            role: 'Property Owner',
            service: 'Water Extraction',
            rating: 5,
            text:
                'After a leak, we were trying to figure out what kind of drying help made the most sense. The platform helped us explore options in a way that felt organized and much less stressful.'
        },
        {
            name: 'Lauren T.',
            role: 'Homeowner',
            service: 'Flood Recovery',
            rating: 5,
            text:
                'The flood damage situation felt overwhelming at first. Aqualume helped us understand the type of support we might need and made comparing local provider options feel more manageable.'
        },
        {
            name: 'Michael S.',
            role: 'Homeowner',
            service: 'Leak Damage',
            rating: 5,
            text:
                'We were dealing with a burst pipe issue and wanted a simple way to look at possible next steps. I liked that the process felt clear and focused instead of chaotic.'
        },
        {
            name: 'Jessica W.',
            role: 'Homeowner',
            service: 'Basement Damage',
            rating: 5,
            text:
                'Our basement had ongoing moisture and water concerns, and we wanted to compare different local options before moving forward. The request process felt easy and surprisingly straightforward.'
        },
        {
            name: 'Kevin L.',
            role: 'Property Owner',
            service: 'Mold Risk',
            rating: 5,
            text:
                'After noticing damp areas and signs of lingering moisture, we wanted better clarity around mold-related concerns. Aqualume helped us explore the right direction without making the process feel confusing.'
        }
    ],

    cookies: {
        storageKey: 'aqualume_cookie_preferences',
        categories: [
            {
                id: 'essential',
                title: 'Essential',
                description: 'Required for core platform functionality and security.',
                required: true,
                enabled: true
            },
            {
                id: 'preferences',
                title: 'Preferences',
                description: 'Helps remember your choices and improve the browsing experience.',
                required: false,
                enabled: false
            },
            {
                id: 'analytics',
                title: 'Analytics',
                description: 'Helps us understand how visitors use the platform.',
                required: false,
                enabled: false
            },
            {
                id: 'marketing',
                title: 'Marketing',
                description: 'Supports relevant platform communications where enabled.',
                required: false,
                enabled: false
            }
        ]
    }
};