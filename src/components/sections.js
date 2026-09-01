import { icon } from "./icons.js";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "why-us", label: "Why Us" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" }
];

const renderNavbar = (data, currentRoute) => `
  <nav class="navbar" aria-label="Primary">
    <a class="brand" href="#home" aria-label="${data.name} home">
      <span class="brand__eyebrow">Family Salon</span>
      <span class="brand__name">${data.shortName}</span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
      ${icon("menu")}
    </button>
    <div class="nav-links desktop-nav">
      ${navItems
        .map(
          (item) => `
            <a href="#${item.id}" class="${item.id === currentRoute ? "is-active" : ""}" ${
            item.id === currentRoute ? 'aria-current="page"' : ""
          }>${item.label}</a>
          `
        )
        .join("")}
    </div>
    <div class="desktop-cta">
      <a class="button button--primary" href="#contact">Book Appointment</a>
    </div>
    <div class="mobile-menu" id="mobile-menu" hidden>
      <div class="mobile-menu__header">
        <div>
          <p class="eyebrow">${data.shortName}</p>
          <p class="mobile-menu__title">Navigate the salon website</p>
        </div>
        <button class="menu-close" type="button" aria-label="Close menu">
          ${icon("close")}
        </button>
      </div>
      <div class="mobile-menu__links">
        ${navItems
          .map(
            (item) => `
              <a href="#${item.id}" class="${item.id === currentRoute ? "is-active" : ""}" ${
              item.id === currentRoute ? 'aria-current="page"' : ""
            }>${item.label}</a>
            `
          )
          .join("")}
      </div>
      <a class="button button--primary button--block" href="#contact">Book Appointment</a>
    </div>
  </nav>
`;

const renderSubpageHeader = (eyebrow, title, description, data, currentRoute) => `
  <header class="site-header site-header--subpage">
    ${renderNavbar(data, currentRoute)}
    <div class="page-banner section-shell reveal">
      <p class="eyebrow">${eyebrow}</p>
      <h1>${title}</h1>
      <p class="page-banner__copy">${description}</p>
    </div>
  </header>
`;

const renderServiceItem = (item) => `
  <article class="service-card reveal">
    <div class="service-card__icon">${icon("spark")}</div>
    <div class="service-card__content">
      <div class="service-card__meta">
        <span class="pill">Verified Care</span>
      </div>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <a class="text-link" href="#contact">Enquire <span aria-hidden="true">→</span></a>
    </div>
  </article>
`;

const renderGalleryTile = (image, index) => `
  <button
    class="gallery-card reveal"
    type="button"
    data-gallery-index="${index}"
    aria-label="Open gallery image: ${image.title}"
  >
    <img src="${image.src}" alt="${image.alt}" loading="lazy" />
    <span class="gallery-card__overlay">
      <span class="pill">${image.category}</span>
      <strong>${image.title}</strong>
    </span>
  </button>
`;

const renderFooter = (data) => `
  <footer class="site-footer">
    <div class="section-shell footer-grid">
      <div>
        <p class="eyebrow">${data.shortName}</p>
        <h2>${data.category}</h2>
        <p>${data.locationSummary}</p>
      </div>
      <div>
        <h3>Navigation</h3>
        <div class="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <div>
        <h3>Services</h3>
        <div class="footer-links">
          <a href="#services">Hair Care</a>
          <a href="#services">Beauty Essentials</a>
          <a href="#services">Grooming</a>
        </div>
      </div>
      <div>
        <h3>Location</h3>
        <p>${data.address}</p>
        <a class="text-link" href="${data.mapsUrl}" target="_blank" rel="noreferrer">Open Google Maps</a>
      </div>
    </div>
    <div class="section-shell footer-bottom">
      <p>© 2026 Shine By Sparsh. All rights reserved.</p>
    </div>
  </footer>
`;

const renderMobileActionBar = (data) => `
  <div class="mobile-action-bar" aria-label="Quick actions">
    <a class="mobile-action-bar__item" href="${data.phone ? `tel:${data.phone}` : "#contact"}">
      ${icon("phone")}
      <span>Call</span>
    </a>
    <a class="mobile-action-bar__item" href="${data.mapsUrl}" target="_blank" rel="noreferrer">
      ${icon("pin")}
      <span>Directions</span>
    </a>
    <a class="mobile-action-bar__item mobile-action-bar__item--primary" href="#contact">
      ${icon("calendar")}
      <span>Book</span>
    </a>
  </div>
`;

const renderLightbox = () => `
  <div class="lightbox" hidden aria-hidden="true">
    <div class="lightbox__backdrop" data-lightbox-close></div>
    <div class="lightbox__dialog" role="dialog" aria-modal="true" aria-label="Gallery image viewer">
      <button class="lightbox__close" type="button" aria-label="Close gallery image">
        ${icon("close")}
      </button>
      <button class="lightbox__nav" type="button" data-direction="-1" aria-label="Previous image">
        ${icon("arrow")}
      </button>
      <figure class="lightbox__figure">
        <img src="" alt="" />
        <figcaption></figcaption>
      </figure>
      <button class="lightbox__nav lightbox__nav--next" type="button" data-direction="1" aria-label="Next image">
        ${icon("arrow")}
      </button>
    </div>
  </div>
`;

const renderAppointmentModal = (data) => `
  <div class="appointment-modal" id="appointment-modal" hidden aria-hidden="true">
    <div class="appointment-modal__backdrop" data-appointment-close></div>
    <div class="appointment-modal__dialog" role="dialog" aria-modal="true" aria-label="Book an Appointment">
      <button class="appointment-modal__close" type="button" aria-label="Close modal" data-appointment-close>
        ${icon("close")}
      </button>
      <div class="appointment-modal__header">
        <p class="eyebrow">Quick Booking</p>
        <h2>Book Your Appointment</h2>
        <p>Reserve your preferred time at Shine By Sparsh, Satna.</p>
      </div>
      <form class="appointment-modal-form" novalidate>
        <div class="form-grid">
          <label>
            Full Name
            <input type="text" name="name" placeholder="Enter your name" autocomplete="name" required />
            <span class="field-error" aria-live="polite"></span>
          </label>
          <label>
            Phone Number
            <input type="tel" name="phone" placeholder="e.g. 96446 64466" inputmode="tel" required />
            <span class="field-error" aria-live="polite"></span>
          </label>
          <label>
            Select Service
            <select name="service" required>
              <option value="">Choose a service</option>
              ${data.formServices.map((service) => `<option value="${service}">${service}</option>`).join("")}
            </select>
            <span class="field-error" aria-live="polite"></span>
          </label>
          <label>
            Preferred Date
            <input type="date" name="date" required />
            <span class="field-error" aria-live="polite"></span>
          </label>
          <label>
            Preferred Time
            <input type="time" name="time" required />
            <span class="field-error" aria-live="polite"></span>
          </label>
          <label class="form-grid__full">
            Additional Notes (Optional)
            <textarea name="message" rows="3" placeholder="Any special requests or styling instructions..."></textarea>
            <span class="field-error" aria-live="polite"></span>
          </label>
        </div>
        <div class="form-actions" style="margin-top: 1rem;">
          <button class="button button--primary button--block" type="submit">
            <span class="button__label">Confirm Appointment Request</span>
          </button>
          <p class="form-note" style="text-align: center;">
            Need instant confirmation? Call <a class="text-link" href="tel:${data.phone}">${data.contactCtaLabel}</a>
          </p>
        </div>
        <p class="form-status" role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
`;

// Page 1: HOME
const renderHomePage = (data) => `
  <header class="site-header" id="home">
    ${renderNavbar(data, "home")}
    <section class="hero section-shell">
      <div class="hero__content reveal reveal--fast">
        <p class="eyebrow">SHINE BY SPARSH • FAMILY SALON</p>
        <h1>${data.tagline}</h1>
        <p class="hero__copy">${data.subheading}</p>
        <div class="hero__actions">
          <a class="button button--primary" href="#contact">Book an Appointment</a>
          <a class="button button--secondary" href="#services">Explore Services</a>
          <a class="text-link text-link--bold" href="${data.mapsUrl}" target="_blank" rel="noreferrer">Get Directions</a>
        </div>
        <div class="hero__meta">
          <div>
            <span class="hero__meta-label">Location</span>
            <strong>${data.locationSummary}</strong>
          </div>
          <div>
            <span class="hero__meta-label">Address</span>
            <strong>${data.address}</strong>
          </div>
        </div>
      </div>
      <div class="hero__visual reveal">
        <div class="hero-card hero-card--image">
          <img
            src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1400&q=80"
            alt="Premium family salon interior and styling space in Satna"
            fetchpriority="high"
          />
          <div class="hero-card__badge">
            <span class="pill">Satna's Premier Family Salon</span>
            <strong>Welcoming Men, Women & Kids</strong>
          </div>
        </div>
      </div>
    </section>
  </header>

  <main id="main-content" class="page-content">
    <section class="trust-bar section-shell reveal">
      ${data.trustPoints
        .map(
          (point) => `
            <article class="trust-item">
              <div class="trust-item__icon">${icon("star")}</div>
              <div>
                <h2>${point.title}</h2>
                <p>${point.detail}</p>
              </div>
            </article>
          `
        )
        .join("")}
    </section>

    <section class="section-shell section-grid" style="padding-top: 5rem;">
      <div class="section-copy reveal">
        <p class="eyebrow">Welcome to Shine By Sparsh</p>
        <h2>Beauty Care With a Personal Touch</h2>
        <p>
          Located at Sumit Bazar in Satna, Shine By Sparsh provides a refined, hygienic, and welcoming family salon environment for precision haircuts, skin facials, and daily grooming.
        </p>
        <p>
          Our team focuses on personalized consultations, top-tier products, and high standards of cleanliness to ensure every visit leaves you looking your best and feeling confident.
        </p>
        <div style="margin-top: 1.5rem;">
          <a class="button button--secondary" href="#about">Learn More About Us</a>
        </div>
      </div>
      <div class="about-visual reveal">
        <div class="editorial-image">
          <img
            src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=80"
            alt="Modern family salon ambience"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <section class="section-shell featured-services" style="padding-top: 5rem;">
      <div class="section-head reveal" style="padding-top: 0;">
        <p class="eyebrow">Services & Care</p>
        <h2>Popular Salon Highlights</h2>
        <p>
          Explore our signature treatments for hair, skin, and daily family grooming.
        </p>
      </div>
      <div class="featured-grid">
        ${data.featuredServices
          .map(
            (item) => `
              <article class="featured-card reveal">
                <div class="featured-card__image">
                  <img src="${item.image}" alt="${item.alt}" loading="lazy" />
                </div>
                <div class="featured-card__body">
                  <span class="pill">Popular Service</span>
                  <h3>${item.title}</h3>
                  <p>${item.description}</p>
                  <a class="text-link text-link--bold" href="#contact">${item.cta}</a>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
      <div style="text-align: center; margin-top: 2.5rem;" class="reveal">
        <a class="button button--primary" href="#services">View Full Service Menu</a>
      </div>
    </section>

    <section class="section-shell why-us" style="padding-top: 5rem;">
      <div class="section-head reveal" style="padding-top: 0;">
        <p class="eyebrow">Why Choose Us</p>
        <h2>The Shine By Sparsh Standard</h2>
      </div>
      <div class="benefits-grid">
        ${data.whyChooseUs
          .slice(0, 3)
          .map(
            (item) => `
              <article class="benefit-card reveal">
                <div class="benefit-card__icon">${icon("shield")}</div>
                <p>${item}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section-shell cta-section" style="padding-bottom: 5rem;">
      <article class="cta-card reveal">
        <div>
          <p class="eyebrow">Appointment</p>
          <h2>Ready to Shine?</h2>
          <p>Book your next salon visit and give yourself the care you deserve.</p>
        </div>
        <div class="cta-actions">
          <a class="button button--primary" href="#contact">Book Appointment</a>
          <a class="button button--secondary" href="tel:${data.phone}" aria-label="Call Shine By Sparsh at ${data.contactCtaLabel}">
            Call Now
          </a>
        </div>
      </article>
    </section>
  </main>
`;

// Page 2: ABOUT
const renderAboutPage = (data) => `
  ${renderSubpageHeader(
    "About Us",
    "Beauty Care With a Personal Touch",
    "Discover Shine By Sparsh, a family salon experience created for clean, comfortable, and professional beauty care in Satna.",
    data,
    "about"
  )}
  <main id="main-content" class="page-content">
    <section class="section-shell section-grid" style="padding-top: 1rem;">
      <div class="section-copy reveal">
        <p class="eyebrow">Our Story & Approach</p>
        <h2>A Trustworthy Family Salon</h2>
        <p>
          ${data.name} is a premier family salon destination in
          ${data.city}, ${data.state}. Our salon is built around professional care, expert styling, and customer satisfaction.
        </p>
        <p>
          Our goal is to offer a welcoming experience that makes it effortless to discover services, locate our salon, and submit appointment requests with confidence.
        </p>
      </div>
      <div class="about-visual reveal">
        <div class="editorial-image">
          <img
            src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=80"
            alt="Modern salon environment"
            loading="lazy"
          />
        </div>
        <div class="highlight-grid">
          ${data.aboutHighlights
            .map(
              (item) => `
                <article class="highlight-card">
                  <h3>${item.title}</h3>
                  <p>${item.detail}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="section-shell why-us" style="padding-top: 4rem;">
      <div class="section-head reveal" style="padding-top: 0;">
        <p class="eyebrow">Our Standards</p>
        <h2>Why Clients Trust Shine By Sparsh</h2>
      </div>
      <div class="benefits-grid">
        ${data.whyChooseUs
          .map(
            (item) => `
              <article class="benefit-card reveal">
                <div class="benefit-card__icon">${icon("shield")}</div>
                <p>${item}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section-shell cta-section">
      <article class="cta-card reveal">
        <div>
          <p class="eyebrow">Visit Us</p>
          <h2>Experience Salon Excellence</h2>
          <p>Book an appointment or stop by our location in Satna.</p>
        </div>
        <div class="cta-actions">
          <a class="button button--primary" href="#contact">Book Appointment</a>
          <a class="button button--secondary" href="${data.mapsUrl}" target="_blank" rel="noreferrer">Get Directions</a>
        </div>
      </article>
    </section>
  </main>
`;

// Page 3: SERVICES
const renderServicesPage = (data) => `
  ${renderSubpageHeader(
    "Service Menu",
    "Our Salon Services",
    "Explore our professional hair, beauty, and grooming offerings designed for all members of the family.",
    data,
    "services"
  )}
  <main id="main-content" class="page-content">
    <section class="section-shell" style="padding-top: 1rem;">
      <div class="service-groups">
        ${data.serviceCategories
          .map(
            (category) => `
              <section class="service-group">
                <div class="service-group__header reveal">
                  <div>
                    <p class="eyebrow">Service Category</p>
                    <h3>${category.title}</h3>
                  </div>
                  <p>${category.note}</p>
                </div>
                <div class="service-grid">
                  ${category.items.map(renderServiceItem).join("")}
                </div>
              </section>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section-shell featured-services" style="padding-top: 4rem;">
      <div class="section-head reveal" style="padding-top: 0;">
        <p class="eyebrow">Featured Highlights</p>
        <h2>Specialty Service Moments</h2>
      </div>
      <div class="featured-grid">
        ${data.featuredServices
          .map(
            (item) => `
              <article class="featured-card reveal">
                <div class="featured-card__image">
                  <img src="${item.image}" alt="${item.alt}" loading="lazy" />
                </div>
                <div class="featured-card__body">
                  <span class="pill">Featured Service</span>
                  <h3>${item.title}</h3>
                  <p>${item.description}</p>
                  <a class="text-link text-link--bold" href="#contact">${item.cta}</a>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section-shell cta-section">
      <article class="cta-card reveal">
        <div>
          <p class="eyebrow">Ready for a Transformation?</p>
          <h2>Schedule Your Service Appointment</h2>
          <p>Select your desired treatment and submit a quick request online.</p>
        </div>
        <div class="cta-actions">
          <a class="button button--primary" href="#contact">Book Appointment</a>
        </div>
      </article>
    </section>
  </main>
`;

// Page 4: GALLERY
const renderGalleryPage = (data) => `
  ${renderSubpageHeader(
    "Gallery Portfolio",
    "Salon Mood & Beauty Details",
    "Browse high-quality visual highlights of our salon space, hair styling, and beauty atmosphere.",
    data,
    "gallery"
  )}
  <main id="main-content" class="page-content">
    <section class="section-shell" style="padding-top: 1rem;">
      <div class="gallery-grid">
        ${data.galleryImages.map(renderGalleryTile).join("")}
      </div>
    </section>

    <section class="section-shell cta-section">
      <article class="cta-card reveal">
        <div>
          <p class="eyebrow">Love the Ambience?</p>
          <h2>Visit Shine By Sparsh</h2>
          <p>Book your visit today and experience top-tier family salon care.</p>
        </div>
        <div class="cta-actions">
          <a class="button button--primary" href="#contact">Book Appointment</a>
        </div>
      </article>
    </section>
  </main>
`;

// Page 5: WHY US
const renderWhyUsPage = (data) => `
  ${renderSubpageHeader(
    "Why Choose Us",
    "The Shine By Sparsh Advantage",
    "Discover why clients in Satna prefer our salon for everyday care and special grooming sessions.",
    data,
    "why-us"
  )}
  <main id="main-content" class="page-content">
    <section class="section-shell why-us" style="padding-top: 1rem;">
      <div class="benefits-grid">
        ${data.whyChooseUs
          .map(
            (item) => `
              <article class="benefit-card reveal">
                <div class="benefit-card__icon">${icon("shield")}</div>
                <p>${item}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="trust-bar section-shell reveal" style="margin-top: 4rem;">
      ${data.trustPoints
        .map(
          (point) => `
            <article class="trust-item">
              <div class="trust-item__icon">${icon("star")}</div>
              <div>
                <h2>${point.title}</h2>
                <p>${point.detail}</p>
              </div>
            </article>
          `
        )
        .join("")}
    </section>

    <section class="section-shell cta-section">
      <article class="cta-card reveal">
        <div>
          <p class="eyebrow">Experience Quality</p>
          <h2>Ready to Book Your Visit?</h2>
          <p>Reserve your spot online or call our friendly salon desk.</p>
        </div>
        <div class="cta-actions">
          <a class="button button--primary" href="#contact">Book Appointment</a>
          <a class="button button--secondary" href="tel:${data.phone}">Call Salon</a>
        </div>
      </article>
    </section>
  </main>
`;

// Page 6: REVIEWS
const renderReviewsPage = (data) => `
  ${renderSubpageHeader(
    "Reviews & Feedback",
    "Real Feedback Belongs to Real Customers",
    "Read genuine customer updates and visit our live Google listing for up-to-date reviews.",
    data,
    "reviews"
  )}
  <main id="main-content" class="page-content">
    <section class="section-shell testimonials" style="padding-top: 1rem;">
      <div class="testimonial-layout">
        <article class="testimonial-feature reveal">
          <span class="stars" aria-label="Five star visual indicator">★★★★★</span>
          <h3>View live Google reviews</h3>
          <p>
            Use the salon’s Google Maps listing to see the most current customer feedback.
          </p>
          <a class="button button--primary" href="${data.mapsUrl}" target="_blank" rel="noreferrer">
            View Google Reviews
          </a>
        </article>
        <div class="testimonial-stack">
          ${data.reviewCards
            .map(
              (item) => `
                <article class="testimonial-card reveal">
                  <span class="stars" aria-hidden="true">★★★★★</span>
                  <h3>${item.title}</h3>
                  <p>${item.text}</p>
                  <a class="text-link" href="${item.cta === "View Google Reviews" ? data.mapsUrl : "#contact"}" ${
                item.cta === "View Google Reviews" ? 'target="_blank" rel="noreferrer"' : ""
              }>
                    ${item.cta}
                  </a>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="section-shell location-section" style="padding-top: 4rem;">
      <div class="location-card reveal" style="margin-top: 0;">
        <div class="location-card__copy">
          <p class="eyebrow">Visit the salon</p>
          <h2>Visit Shine By Sparsh</h2>
          <p>
            <strong>${data.name}</strong><br />
            ${data.address}<br />
            ${data.locationSummary}
          </p>
          <div class="location-actions">
            <a class="button button--primary" href="${data.mapsUrl}" target="_blank" rel="noreferrer">
              Get Directions
            </a>
            <a class="button button--secondary" href="#contact">Request Appointment</a>
          </div>
        </div>
        <div class="map-fallback">
          <div class="map-fallback__visual">${icon("pin")}</div>
          <p>Google Maps opens directly from the verified listing link.</p>
        </div>
      </div>
    </section>
  </main>
`;

// Page 7: CONTACT
const renderContactPage = (data) => `
  ${renderSubpageHeader(
    "Contact & Booking",
    "Request an Appointment",
    "Send your preferred appointment details directly to the salon's booking queue or contact us directly.",
    data,
    "contact"
  )}
  <main id="main-content" class="page-content">
    <section class="section-shell contact-section" style="padding-top: 1rem; padding-bottom: 4rem;">
      <div class="contact-layout">
        <aside class="contact-panel reveal">
          <article class="contact-card">
            <div class="contact-card__icon">${icon("spark")}</div>
            <div class="contact-card__body">
              <h3>Business</h3>
              <p>${data.name}</p>
            </div>
          </article>
          <article class="contact-card">
            <div class="contact-card__icon">${icon("pin")}</div>
            <div class="contact-card__body">
              <h3>Location</h3>
              <p>${data.address}</p>
              <a class="text-link" href="${data.mapsUrl}" target="_blank" rel="noreferrer">Get Directions</a>
            </div>
          </article>
          <article class="contact-card">
            <div class="contact-card__icon">${icon("phone")}</div>
            <div class="contact-card__body">
              <h3>Contact</h3>
              <a class="text-link text-link--bold" href="tel:${data.phone}" aria-label="Call Shine By Sparsh at ${data.contactCtaLabel}">${data.contactCtaLabel}</a>
            </div>
          </article>
        </aside>
        <form class="appointment-form reveal" novalidate>
          <div class="form-grid">
            <label>
              Name
              <input type="text" name="name" autocomplete="name" required />
              <span class="field-error" aria-live="polite"></span>
            </label>
            <label>
              Phone
              <input type="tel" name="phone" inputmode="tel" required />
              <span class="field-error" aria-live="polite"></span>
            </label>
            <label>
              Service
              <select name="service" required>
                <option value="">Select a service</option>
                ${data.formServices.map((service) => `<option value="${service}">${service}</option>`).join("")}
              </select>
              <span class="field-error" aria-live="polite"></span>
            </label>
            <label>
              Preferred Date
              <input type="date" name="date" required />
              <span class="field-error" aria-live="polite"></span>
            </label>
            <label>
              Preferred Time
              <input type="time" name="time" required />
              <span class="field-error" aria-live="polite"></span>
            </label>
            <label class="form-grid__full">
              Message
              <textarea name="message" rows="5" placeholder="Tell us what kind of appointment you want to request."></textarea>
              <span class="field-error" aria-live="polite"></span>
            </label>
          </div>
          <div class="form-actions">
            <button class="button button--primary" type="submit">
              <span class="button__label">Request Appointment</span>
            </button>
            <p class="form-note">
              Your request is recorded for the salon team. Need a faster response? Call
              <a class="text-link" href="tel:${data.phone}">${data.contactCtaLabel}</a>.
            </p>
          </div>
          <p class="form-status" role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>

    <section class="section-shell location-section" style="padding-bottom: 4rem;">
      <div class="location-card reveal" style="margin-top: 0;">
        <div class="location-card__copy">
          <p class="eyebrow">Visit the salon</p>
          <h2>Visit Shine By Sparsh</h2>
          <p>
            <strong>${data.name}</strong><br />
            ${data.address}<br />
            ${data.locationSummary}
          </p>
          <div class="location-actions">
            <a class="button button--primary" href="${data.mapsUrl}" target="_blank" rel="noreferrer">
              Get Directions
            </a>
          </div>
        </div>
        <div class="map-fallback">
          <div class="map-fallback__visual">${icon("pin")}</div>
          <p>Google Maps opens directly from the verified listing link.</p>
        </div>
      </div>
    </section>
  </main>
`;

export const renderPage = (data, route = "home") => {
  let mainContent = "";

  switch (route) {
    case "about":
      mainContent = renderAboutPage(data);
      break;
    case "services":
      mainContent = renderServicesPage(data);
      break;
    case "gallery":
      mainContent = renderGalleryPage(data);
      break;
    case "why-us":
      mainContent = renderWhyUsPage(data);
      break;
    case "reviews":
      mainContent = renderReviewsPage(data);
      break;
    case "contact":
      mainContent = renderContactPage(data);
      break;
    case "home":
    default:
      mainContent = renderHomePage(data);
      break;
  }

  return `
    ${mainContent}
    ${renderFooter(data)}
    ${renderMobileActionBar(data)}
    ${renderLightbox()}
    ${renderAppointmentModal(data)}
  `;
};
