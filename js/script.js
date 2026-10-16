// =========================
// Mobile Navigation
// =========================

// =========================
// Color Theme
// =========================

const themeButton = document.querySelector('.theme-toggle');
const themeLabel = themeButton.querySelector('.theme-label');
const themeIcon = themeButton.querySelector('.theme-icon');
let savedTheme = null;

try {
  savedTheme = localStorage.getItem('portfolio-theme');
} catch {
  // Keep the portfolio usable when browser storage is unavailable.
}

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.setAttribute(
    'aria-label',
    isDark ? 'Switch to light mode' : 'Switch to dark mode'
  );
  themeLabel.textContent = isDark ? 'Dark mode' : 'Light mode';
  themeIcon.textContent = isDark ? '☀' : '☾';
}

setTheme(savedTheme === 'dark' ? 'dark' : 'light');

themeButton.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark'
    ? 'light'
    : 'dark';

  setTheme(nextTheme);
  try {
    localStorage.setItem('portfolio-theme', nextTheme);
  } catch {
    // The selected theme still applies for the current page view.
  }
});

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navLinks.classList.toggle('is-open', !isOpen);
});

navLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navLinks.classList.remove('is-open');
  }
});

// =========================
// Certificate & Badge Image Preview
// =========================

const modal = document.querySelector('.image-modal');
const modalImage = modal.querySelector('img');
const modalCaption = modal.querySelector('p');
document.querySelectorAll('.cert-image').forEach((button) => {
  button.addEventListener('click', () => {
    modalImage.src = button.dataset.preview;
    modalImage.alt = button.querySelector('img').alt;
    modalCaption.textContent = button.dataset.title;
    modal.showModal();
  });
});
modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});
