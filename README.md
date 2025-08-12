The Mattress All-Stars — Static Website (MAXXX Edition)
This repository contains the full source code for the official website of The Mattress All-Stars, a 70s funk tribute band broadcasting from the fictional radio station LoveJam FM 99.69.

The site is a fully static, vanilla HTML, CSS, and JavaScript project designed for performance, accessibility, and easy maintenance. It's built to be hosted on services like Netlify or Vercel.

Live Site: https://the-mattress-all-stars.netlify.app/

🎵 The Vibe
The aesthetic is a loving tribute to 70s LA adult-radio and funk culture: bold, cheeky, playful, and heavy on innuendo without being explicit. Think neon signs reflected in rain-slicked streets, polyester suits, pin-up silhouettes, velvet textures, and the warm glow of a retro radio UI.

✨ Core Features
Static Stack: Built with pure HTML, CSS, and vanilla JavaScript. No frameworks, no build steps, just fast, reliable code.

Five Pages + 404: A complete site structure including Home, About, Music & Video, Gallery, Contact, and a themed 404 "Dead Air" page.

Session-Based Age Gate: A cheeky, 18+ overlay that appears once per user session, blocking content until acknowledged.

Dynamic News Ticker: A scrolling marquee of 70s-flavoured "news" headlines, populated from a JavaScript array. Pauses on hover for readability.

JSON-Powered Gig Listings: Upcoming and past gigs are dynamically loaded from a simple gigs.json file.

Vanilla JS Lightbox: A lightweight, accessible image gallery lightbox with no external libraries.

SEO & Accessibility Ready: Includes JSON-LD schema for MusicGroup and Event, proper meta tags, semantic HTML, and ARIA attributes.

🛠️ How to Edit and Customize
This site was designed to be incredibly easy to update. Here’s how to manage the key content:

1. Adding or Changing Gigs
All gig information is stored in a single file. The script automatically sorts gigs into "Upcoming" and "Past" based on the current date.

File to Edit: assets/gigs.json

Instructions:

Open the file and add a new object {...} to the list for each new gig.

The date format is crucial for sorting. It must be in full ISO 8601 format: YYYY-MM-DDTHH:MM:SS+TZ.

The tickets field is optional. If there's no ticket link, you can omit that line entirely.

[
  {
    "date": "2025-11-15T21:00:00+00:00",
    "venue": "The Fuzzy Lamp",
    "city": "Liverpool",
    "tickets": "https://example.com/tickets"
  },
  {
    "date": "2025-10-18T20:00:00+01:00",
    "venue": "Oldham Soul & Funk Fest",
    "city": "Oldham"
  }
]

2. Updating the News Ticker
The cheeky headlines are stored in a simple array at the top of the main script file.

File to Edit: script.js

Instructions: Find the tickerHeadlines array and add, remove, or edit the text strings.

const config = {
    tickerHeadlines: [
        "🎙️ Now broadcasting live from the velvet-lined studio of your heart...",
        "Weather tonight: 100% chance of funk with scattered saxophone solos.",
        // Add your new headline here
    ],
    // ...
};

3. Configuring the Contact Form
The form uses Formspree to handle submissions without a backend.

File to Edit: contact.html

Instructions:

Create a new form on Formspree.io.

They will provide a unique URL endpoint.

Replace the placeholder action attribute in the <form> tag with your Formspree URL.

<!-- Find this line in contact.html -->
<form action="https://formspree.io/f/YOUR_FORM_ID_HERE" method="POST" class="contact-form">

4. Changing Embedded Media
File to Edit: music.html

YouTube Videos: Find the <iframe> tags and replace VIDEO_ID_1 and VIDEO_ID_2 with the IDs from your YouTube video URLs.

SoundCloud Playlist: Find the SoundCloud <iframe> and replace the placeholder URL in the src attribute with the embed code from your SoundCloud playlist's "Share" button.

5. Updating Social Media Links
Files to Edit: All .html files.

Instructions: In the <footer> of each page, find the <div class="socials"> section and replace the href="#" placeholders with your band's social media profile URLs.

📂 File Structure
.
├── assets/
│   ├── gigs.json         # Edit this for gig listings
│   ├── logo-lovejamfm.png  # Main logo
│   ├── favicon.svg         # Site icon
│   └── ... (all other images)
├── index.html            # Homepage
├── about.html
├── music.html
├── gallery.html
├── contact.html
├── 404.html
├── styles.css            # All primary styles
├── animations.css        # All CSS animations
└── script.js             # All website functionality
