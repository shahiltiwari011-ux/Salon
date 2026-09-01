export const icon = (name) => {
  const icons = {
    spark: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l1.75 5.25L19 9l-5.25 1.75L12 16l-1.75-5.25L5 9l5.25-1.75L12 2z"></path>
      </svg>
    `,
    pin: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
      </svg>
    `,
    phone: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.62 10.79a15.53 15.53 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.56 3.57.56a1 1 0 011 1V20a1 1 0 01-1 1C10.3 21 3 13.7 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.19 2.45.56 3.57a1 1 0 01-.24 1.02l-2.2 2.2z"></path>
      </svg>
    `,
    arrow: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 12h12m-5-5l5 5-5 5"></path>
      </svg>
    `,
    menu: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h16"></path>
      </svg>
    `,
    close: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18"></path>
      </svg>
    `,
    shield: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.97-2.98 8.94-7 10-4.02-1.06-7-5.03-7-10V6l7-3z"></path>
      </svg>
    `,
    star: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.5l2.63 5.33 5.87.85-4.25 4.14 1 5.84L12 16.9l-5.25 2.76 1-5.84-4.25-4.14 5.87-.85L12 3.5z"></path>
      </svg>
    `,
    calendar: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 2v3M17 2v3M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"></path>
      </svg>
    `
  };

  return icons[name] || "";
};
