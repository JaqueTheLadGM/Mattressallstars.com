// --- CONFIGURATION ---
const config = {
    tickerHeadlines: [
        "🎙️ Now broadcasting live from the velvet-lined studio of your heart...",
        "Weather tonight: 100% chance of funk with scattered saxophone solos.",
        "Traffic update: Gridlock on the road to Funkytown. Detour through Soul City advised.",
        "BREAKING: 1978 called, it wants its polyester back. We said no.",
        "Local man arrested for 'public displays of funk'. Eyewitnesses say he was 'too groovy'.",
        "Polyester prices soar after another sell-out show. Flared trousers now a luxury item.",
        "Police warn of a flasher in the park... turns out it's just Iain's new sequin jacket.",
        "Disco ball shortage causes crisis in Northern Quarter. Stay strong.",
        "Scientists confirm: The Mattress All-Stars' basslines are a Class A substance.",
        "8-track tapes make a comeback, says man who never left 1976.",
        "Is your shag carpet a fire hazard? Our trombonist says 'absolutely'.",
        "New study finds listening to funk increases your chances of growing a mustache by 300%.",
        "This broadcast is brought to you by 'Velvet Touch' moisturizer. For hands that know how to groove."
    ],
    boringSearchQueries: [
        'elevator jazz playlist',
        'the history of beige paint',
        'ikea billy bookcase assembly instructions pdf',
        'how to fold a fitted sheet tutorial',
        'the quietest room in the world anechoic chamber',
        'tax regulations for amateur accountants',
        'the riveting history of the paperclip',
        'watching paint dry live stream'
    ]
};

// --- MAIN INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    handleAgeGate();
    initMobileNav();
    initTicker(config.tickerHeadlines);
    initLightbox();
    updateFooterYear();
    loadGigs();
    initLogoAnimation(); // Initialize the new logo animation
});


// ==========================================================================
// AGE GATE LOGIC
// ==========================================================================
function handleAgeGate() {
    const ageGate = document.getElementById('age-gate');
    const body = document.body;

    if (!ageGate) return;

    if (sessionStorage.getItem('ageVerified') === 'true') {
        ageGate.style.display = 'none';
        return;
    }

    ageGate.style.display = 'flex';
    body.classList.add('no-scroll');

    const enterBtn = document.getElementById('enter-site');
    const leaveBtn = document.getElementById('leave-site');

    enterBtn.addEventListener('click', () => {
        sessionStorage.setItem('ageVerified', 'true');
        ageGate.classList.add('hidden');
        body.classList.remove('no-scroll');
        
        setTimeout(() => {
            ageGate.style.display = 'none';
        }, 500);
    });

    leaveBtn.addEventListener('click', () => {
        const randomQuery = config.boringSearchQueries[Math.floor(Math.random() * config.boringSearchQueries.length)];
        window.open(`https://www.google.com/search?q=${encodeURIComponent(randomQuery)}`, '_blank');
    });
}

// ==========================================================================
// LOGO REVEAL ANIMATION
// ==========================================================================
function initLogoAnimation() {
    const logo = document.querySelector('.logo-reveal');
    if (!logo) return;

    // Trigger the animation shortly after the page loads
    setTimeout(() => {
        logo.classList.add('animate');
    }, 500); // 500ms delay
}


// ==========================================================================
// MOBILE NAVIGATION
// ==========================================================================
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (!navToggle || !navList) return;

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navToggle.classList.toggle('active');
        navList.classList.toggle('active');
        
        if (navList.classList.contains('active')) {
            document.body.classList.add('no-scroll');
        } else {
            // Only remove no-scroll if the age gate isn't also active
            if (document.getElementById('age-gate').style.display === 'none') {
                document.body.classList.remove('no-scroll');
            }
        }
    });
}

// ==========================================================================
// NEWS TICKER
// ==========================================================================
function initTicker(headlines) {
    const tickerMove = document.querySelector('.ticker-move');
    if (!tickerMove || !headlines || headlines.length === 0) return;

    const content = headlines.map(headline => `<span>${headline}</span>`).join('');
    tickerMove.innerHTML = content + content;
}

// ==========================================================================
// GIG LOADER
// ==========================================================================
async function loadGigs() {
    const previewContainer = document.getElementById('gigs-list-preview');
    const fullContainer = document.getElementById('gigs-list-full');
    
    if (!previewContainer && !fullContainer) return;
    
    try {
        const response = await fetch('assets/gigs.json');
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        const gigs = await response.json();

        const now = new Date();
        
        const allGigs = gigs.map(gig => ({...gig, dateObj: new Date(gig.date)}));
        
        const upcomingGigs = allGigs.filter(gig => gig.dateObj >= now).sort((a,b) => a.dateObj - b.dateObj);
        const pastGigs = allGigs.filter(gig => gig.dateObj < now).sort((a,b) => b.dateObj - a.dateObj);

        if (previewContainer) {
            renderGigs(upcomingGigs.slice(0, 3), previewContainer, 'No upcoming gigs scheduled. Book us!');
        }
        if (fullContainer) {
            renderGigs(upcomingGigs, fullContainer, 'No upcoming gigs scheduled. Stay tuned!');
            if (pastGigs.length > 0) {
                const pastGigsContainer = document.createElement('div');
                pastGigsContainer.className = 'past-gigs';
                pastGigsContainer.innerHTML = '<h3>Past Gigs</h3>';
                renderGigs(pastGigs, pastGigsContainer);
                fullContainer.appendChild(pastGigsContainer);
            }
        }
    } catch (error) {
        console.error('Failed to load gigs:', error);
        const errorMessage = '<p class="gigs-fallback">Could not load the gig schedule. Please check back later.</p>';
        if (previewContainer) previewContainer.innerHTML = errorMessage;
        if (fullContainer) fullContainer.innerHTML = errorMessage;
    }
}

function renderGigs(gigs, container, fallbackMessage) {
    const fallbackEl = container.querySelector('.gigs-fallback');
    if (fallbackEl) fallbackEl.remove();
    
    if (!gigs || gigs.length === 0) {
        if (fallbackMessage) {
            container.innerHTML = `<p class="gigs-fallback">${fallbackMessage}</p>`;
        }
        return;
    }

    let list = container.querySelector('ul');
    if (!list) {
        list = document.createElement('ul');
        container.appendChild(list);
    }
    
    gigs.forEach(gig => {
        const date = gig.dateObj;
        const day = date.toLocaleDateString('en-GB', { day: '2-digit' });
        const month = date.toLocaleDateString('en-GB', { month: 'short' });

        const item = document.createElement('li');
        item.className = 'gig-item';
        item.innerHTML = `
            <div class="gig-date">
                <div class="gig-day">${day}</div>
                <div class="gig-month">${month}</div>
            </div>
            <div class="gig-info">
                <div class="gig-venue">${gig.venue}</div>
                <div class="gig-city">${gig.city}</div>
            </div>
            ${gig.tickets ? `<div class="gig-tickets"><a href="${gig.tickets}" class="btn btn-small btn-outline" target="_blank" rel="noopener noreferrer">Tickets</a></div>` : ''}
        `;
        list.appendChild(item);
    });
}

// ==========================================================================
// GALLERY LIGHTBOX
// ==========================================================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    let lastFocusedElement;

    const openLightbox = (e) => {
        e.preventDefault();
        const item = e.currentTarget;
        lastFocusedElement = document.activeElement;
        
        lightboxImg.src = item.href;
        lightboxImg.alt = item.querySelector('img').alt;
        lightboxCaption.textContent = item.dataset.caption || '';
        lightbox.classList.add('active');
        document.body.classList.add('no-scroll');
        closeBtn.focus();
    };
    
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
        if(lastFocusedElement) lastFocusedElement.focus();
    };

    galleryItems.forEach(item => item.addEventListener('click', openLightbox));
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// ==========================================================================
// FOOTER YEAR
// ==========================================================================
function updateFooterYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
