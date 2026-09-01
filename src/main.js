import { renderPage } from "./components/sections.js";
import { salonData } from "./data/salonData.js";

const app = document.querySelector("#app");

const validRoutes = ["home", "about", "services", "gallery", "why-us", "reviews", "contact"];

const getRouteFromHash = () => {
  const hash = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  return validRoutes.includes(hash) ? hash : "home";
};

let currentRoute = getRouteFromHash();
let activeIndex = 0;
let lastFocusedElement = null;
let revealObserver = null;

const updateSeo = () => {
  if (salonData.canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = salonData.canonicalUrl;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: salonData.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: salonData.address,
      addressLocality: salonData.city,
      addressRegion: salonData.state,
      addressCountry: salonData.country
    },
    areaServed: `${salonData.city}, ${salonData.state}`,
    url: salonData.canonicalUrl || undefined,
    sameAs: [salonData.mapsUrl]
  };

  if (salonData.phone) {
    schema.telephone = salonData.phone;
  }

  const schemaNode = document.querySelector("#local-business-schema");
  if (schemaNode) {
    schemaNode.textContent = JSON.stringify(schema, null, 2);
  }
};

const syncNavbar = () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.classList.toggle("navbar--scrolled", window.scrollY > 24);
  }
};

const validateField = (field) => {
  const errorNode = field.parentElement.querySelector(".field-error");
  let message = "";
  const val = field.value ? field.value.trim() : "";

  if (field.hasAttribute("required") && !val) {
    message = "This field is required.";
  } else if (field.name === "phone" && val.replace(/[^\d+]/g, "").length < 10) {
    message = "Please enter a valid 10-digit phone number.";
  } else if (field.name === "name" && val.length < 2) {
    message = "Please enter your full name.";
  }

  field.setAttribute("aria-invalid", String(Boolean(message)));
  if (errorNode) {
    errorNode.textContent = message;
  }
  return !message;
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  const appointmentForm = event.currentTarget;
  const formStatus = appointmentForm.querySelector(".form-status");
  const fields = [...appointmentForm.querySelectorAll("input[required], select[required], textarea[required]")];
  const isValid = fields.every(validateField);

  if (!isValid) {
    if (formStatus) {
      formStatus.innerHTML = `
        <div class="form-alert form-alert--error">
          <strong>Validation Error:</strong> Please review the highlighted fields above and try again.
        </div>
      `;
    }
    return;
  }

  const submitButton = appointmentForm.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add("is-loading");
  }

  const payload = Object.fromEntries(new FormData(appointmentForm).entries());
  const refCode = `SBS-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  // Pure static client-side local storage booking
  try {
    const saved = JSON.parse(localStorage.getItem("salon_appointments") || "[]");
    saved.unshift({ reference: refCode, receivedAt: new Date().toLocaleString(), ...payload });
    localStorage.setItem("salon_appointments", JSON.stringify(saved));
  } catch (e) {}

  appointmentForm.reset();

  // Reset default min date and value
  const todayStr = new Date().toISOString().split("T")[0];
  const dateInput = appointmentForm.querySelector('input[type="date"]');
  if (dateInput) {
    dateInput.value = todayStr;
    dateInput.min = todayStr;
  }

  if (formStatus) {
    formStatus.innerHTML = `
      <div class="form-alert form-alert--success">
        <div class="form-alert__header">
          <span class="form-alert__badge">✓ Booking Received</span>
          <strong>Ref: ${refCode}</strong>
        </div>
        <p>Thank you, <strong>${payload.name || "valued client"}</strong>! Your request for <strong>${payload.service}</strong> on <strong>${payload.date}</strong> at <strong>${payload.time}</strong> has been successfully recorded.</p>
        <p class="form-alert__footer">Our salon team will contact you shortly at <strong>${payload.phone}</strong> to confirm your slot.</p>
      </div>
    `;
  }

  if (submitButton) {
    submitButton.disabled = false;
    submitButton.classList.remove("is-loading");
  }
};

const attachImageFallbacks = () => {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.closest(".hero-card--image, .editorial-image, .featured-card__image, .gallery-card, .lightbox__figure")?.classList.add("media-fallback");
      img.alt = `${img.alt}. Image unavailable.`;
    });
  });
};

const openAppointmentModal = () => {
  const modal = document.querySelector("#appointment-modal");
  if (!modal) return;
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  const firstInput = modal.querySelector("input");
  if (firstInput) firstInput.focus();
};

const closeAppointmentModal = () => {
  const modal = document.querySelector("#appointment-modal");
  if (!modal) return;
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

const bindEvents = () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuClose = document.querySelector(".menu-close");
  const galleryButtons = [...document.querySelectorAll("[data-gallery-index]")];
  const lightbox = document.querySelector(".lightbox");
  const revealItems = document.querySelectorAll(".reveal");

  // Set default & min date for appointment date inputs
  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach((input) => {
    input.setAttribute("min", today);
    if (!input.value) {
      input.value = today;
    }
  });

  const mobileMenuBackdrop = document.querySelector("#mobile-menu-backdrop");

  const openMenu = () => {
    if (!mobileMenu) return;
    if (mobileMenuBackdrop) mobileMenuBackdrop.hidden = false;
    mobileMenu.hidden = false;
    mobileMenu.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
    window.requestAnimationFrame(() => mobileMenu.classList.add("is-open"));
  };

  const closeMenu = () => {
    if (!mobileMenu || mobileMenu.hidden) {
      menuToggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
      if (mobileMenuBackdrop) mobileMenuBackdrop.hidden = true;
      return;
    }
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    mobileMenu.classList.remove("is-open");
    window.setTimeout(() => {
      if (menuToggle?.getAttribute("aria-expanded") === "false") {
        mobileMenu.hidden = true;
        if (mobileMenuBackdrop) mobileMenuBackdrop.hidden = true;
      }
    }, 220);
  };

  menuToggle?.addEventListener("click", () => {
    if (menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuClose?.addEventListener("click", closeMenu);
  mobileMenuBackdrop?.addEventListener("click", closeMenu);

  // Navbar CTA buttons & Book buttons open appointment modal
  document.querySelectorAll('.desktop-cta a, .hero__actions a[href="#contact"], .cta-actions a[href="#contact"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
      openAppointmentModal();
    });
  });

  // Modal close buttons
  document.querySelectorAll("[data-appointment-close]").forEach((btn) => {
    btn.addEventListener("click", closeAppointmentModal);
  });

  // Link navigation handling for internal route anchors
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || link.closest(".desktop-cta")) return;
      const targetRoute = href.replace(/^#\/?/, "").toLowerCase();
      if (validRoutes.includes(targetRoute)) {
        e.preventDefault();
        closeMenu();
        if (window.location.hash !== `#${targetRoute}`) {
          window.location.hash = `#${targetRoute}`;
        } else {
          renderApp(targetRoute);
        }
      }
    });
  });

  // IntersectionObserver for reveal animation
  if (revealObserver) {
    revealObserver.disconnect();
  }
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  // Lightbox
  if (lightbox) {
    const lightboxImage = lightbox.querySelector("img");
    const lightboxCaption = lightbox.querySelector("figcaption");
    const lightboxClose = lightbox.querySelector(".lightbox__close");
    const lightboxNav = [...lightbox.querySelectorAll(".lightbox__nav")];
    const lightboxBackdrop = lightbox.querySelector("[data-lightbox-close]");
    const galleryImages = salonData.galleryImages;

    const setLightboxImage = (index) => {
      const image = galleryImages[index];
      if (!image || !lightboxImage || !lightboxCaption) return;
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = `${image.category} • ${image.title}`;
      activeIndex = index;
    };

    const openLightbox = (index) => {
      lastFocusedElement = document.activeElement;
      lightbox.hidden = false;
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      setLightboxImage(index);
      lightboxClose?.focus();
    };

    const closeLightbox = () => {
      lightbox.hidden = true;
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      if (lightboxImage) lightboxImage.src = "";
      if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    };

    const moveLightbox = (direction) => {
      const nextIndex = (activeIndex + direction + galleryImages.length) % galleryImages.length;
      setLightboxImage(nextIndex);
    };

    galleryButtons.forEach((button) =>
      button.addEventListener("click", () => {
        openLightbox(Number(button.dataset.galleryIndex));
      })
    );

    lightboxClose?.addEventListener("click", closeLightbox);
    lightboxBackdrop?.addEventListener("click", closeLightbox);
    lightboxNav.forEach((button) =>
      button.addEventListener("click", () => moveLightbox(Number(button.dataset.direction)))
    );

    window.onkeydown = (event) => {
      if (!lightbox.hidden) {
        if (event.key === "Escape") {
          closeLightbox();
        }
        if (event.key === "ArrowLeft") {
          moveLightbox(-1);
        }
        if (event.key === "ArrowRight") {
          moveLightbox(1);
        }
      }

      const modal = document.querySelector("#appointment-modal");
      if (modal && !modal.hidden && event.key === "Escape") {
        closeAppointmentModal();
      }

      if (event.key === "Escape" && mobileMenu && !mobileMenu.hidden) {
        closeMenu();
      }
    };
  }

  // Appointment Forms (both page form & modal form)
  document.querySelectorAll(".appointment-form, .appointment-modal-form").forEach((form) => {
    form.addEventListener("submit", handleFormSubmit);
    form.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") {
          validateField(field);
        }
      });
    });
  });

  attachImageFallbacks();
  syncNavbar();
};

const renderApp = (route) => {
  currentRoute = route;
  app.innerHTML = renderPage(salonData, route);
  window.scrollTo({ top: 0, behavior: "instant" });
  bindEvents();
};

updateSeo();
renderApp(getRouteFromHash());

window.addEventListener("hashchange", () => {
  renderApp(getRouteFromHash());
});

window.addEventListener("scroll", syncNavbar, { passive: true });
window.addEventListener("resize", syncNavbar);
