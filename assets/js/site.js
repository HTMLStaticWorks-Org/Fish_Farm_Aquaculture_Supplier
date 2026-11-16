// AquaHarvest Site JavaScript
const header = document.getElementById('site-header');
const footer = document.getElementById('site-footer');
const current = location.pathname.split('/').pop() || 'index.html';

const nav = [
  ['Home1', 'index.html'],
  ['Home2', 'home2.html'],
  ['About', 'about.html'],
  ['Products', 'products.html'],
  ['Farming Guide', 'farming-guide.html'],
  ['Gallery', 'gallery.html'],
  ['Contact', 'contact.html']
];

// Theme & RTL State Management
// Theme Management
function getSavedTheme() {
  const saved = localStorage.getItem('ah-theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('ah-theme', theme);

  // Update all theme toggle buttons across the DOM
  document.querySelectorAll('#themeToggle, .theme-toggle').forEach(btn => {
    btn.innerHTML = theme === 'dark' ? '☀️' : '◐';
    btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  });
}

// Direction (RTL/LTR) Management
function getSavedDir() {
  return localStorage.getItem('ah-dir') === 'rtl' ? 'rtl' : 'ltr';
}

function applyDir(dir) {
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.dir = dir;
  localStorage.setItem('ah-dir', dir);

  // Update all RTL toggle buttons across the DOM
  document.querySelectorAll('#rtlToggle, .rtl-toggle').forEach(btn => {
    btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    btn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
  });
}

// Initial theme & direction application
applyTheme(getSavedTheme());
applyDir(getSavedDir());

// Render Site Header
if (header) {
  header.innerHTML = `
<header class="site-header">
  <div class="container nav-wrap">
    <a class="brand" href="index.html">
      <span class="brand-mark">≈</span>
      <span>Aqua<span>Harvest</span></span>
    </a>

    <!-- Center Navigation for Desktop -->
    <nav class="main-nav" id="mainNav">
      ${nav.map(([n, u]) => `<a class="${current === u ? 'active' : ''}" href="${u}">${n}</a>`).join('')}
      <div class="mobile-nav-actions">
        <div class="mobile-nav-tools">
          <button class="tool-btn rtl-toggle" id="rtlToggleMobile" title="Toggle RTL/LTR" aria-label="Toggle RTL">RTL</button>
          <button class="tool-btn theme-toggle" id="themeToggleMobile" title="Toggle Dark/Light Mode" aria-label="Toggle Theme">◐</button>
        </div>
        <a class="btn btn-signup" href="signup.html">Sign up</a>
      </div>
    </nav>

    <!-- Right Nav Tools & Hamburger Menu Button -->
    <div class="nav-tools">
      <button class="tool-btn rtl-toggle desktop-only" id="rtlToggle" title="Toggle RTL/LTR" aria-label="Toggle RTL">RTL</button>
      <button class="tool-btn theme-toggle desktop-only" id="themeToggle" title="Toggle Dark/Light Mode" aria-label="Toggle Theme">◐</button>
      <a class="btn btn-signup desktop-only" href="signup.html">Sign up</a>
      <button class="mobile-menu" id="mobileMenuBtn" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    </div>
  </div>
</header>`;

  // Refresh button labels after rendering header
  applyTheme(getSavedTheme());
  applyDir(getSavedDir());
}

// Render Site Footer
if (footer) {
  footer.innerHTML = `
<footer class="site-footer">
  <div class="container footer-main">
    <div>
      <a class="brand footer-brand" href="index.html">
        <span class="brand-mark">≈</span>
        <span>Aqua<span>Harvest</span></span>
      </a>
      <p>Thoughtful supplies, biological water intelligence and practical support for healthier aquaculture.</p>
      <div class="social-row">
        <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/></svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
      </div>
    </div>
    <div>
      <h4>Explore</h4>
      <a href="index.html">Home 1</a>
      <a href="home2.html">Home 2</a>
      <a href="about.html">Our Story & Labs</a>
      <a href="products.html">Aquaculture Supplies</a>
      <a href="farming-guide.html">Farming Guide</a>
      <a href="gallery.html">Farm Gallery</a>
    </div>
    <div>
      <h4>Support & Accounts</h4>
      <a href="contact.html">Contact Us</a>
      <a href="login.html">Sign In</a>
      <a href="signup.html">Create Account</a>
      <a href="forgot-password.html">Reset Password</a>
    </div>
    <div>
      <h4>Stay in the loop</h4>
      <p>Fresh insights, seasonal water care tips and aquaculture innovations.</p>
      <form class="newsletter" onsubmit="event.preventDefault();alert('Thank you for subscribing to AquaHarvest updates!');">
        <input type="email" required placeholder="Your email address" aria-label="Email Address">
        <button type="submit" aria-label="Subscribe">→</button>
      </form>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>© 2026 AquaHarvest Aquaculture Supplier. All rights reserved.</span>
    <span>Engineered for Thriving Aquatic Harvests.</span>
  </div>
</footer>`;
}

// Universal Event Delegation for Theme, RTL, and Mobile Menu
// Ensure Back to Top Button exists on all pages
function initScrollTopButton() {
  if (!document.getElementById('scrollTopBtn')) {
    const btn = document.createElement('button');
    btn.id = 'scrollTopBtn';
    btn.className = 'scroll-top-btn';
    btn.setAttribute('title', 'Back to top');
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '↑';
    document.body.appendChild(btn);
  }

  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 280) {
      scrollBtn?.classList.add('visible');
    } else {
      scrollBtn?.classList.remove('visible');
    }
  });

  scrollBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollTopButton);
} else {
  initScrollTopButton();
}

// Universal Event Delegation for Theme, RTL, Mobile Menu, and Scroll to Top
document.addEventListener('click', (e) => {
  // Theme Toggle Button clicked
  const themeBtn = e.target.closest('#themeToggle, .theme-toggle');
  if (themeBtn) {
    e.preventDefault();
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    return;
  }

  // RTL Toggle Button clicked
  const rtlBtn = e.target.closest('#rtlToggle, .rtl-toggle');
  if (rtlBtn) {
    e.preventDefault();
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    applyDir(nextDir);
    return;
  }

  // Scroll to Top Button clicked
  const topBtn = e.target.closest('#scrollTopBtn, .scroll-top-btn');
  if (topBtn) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Hamburger Menu Button clicked
  const menuBtn = e.target.closest('.mobile-menu, #mobileMenuBtn');
  if (menuBtn) {
    e.preventDefault();
    const mainNav = document.getElementById('mainNav') || document.querySelector('.main-nav');
    if (mainNav) {
      const isOpen = mainNav.classList.toggle('open');
      menuBtn.innerHTML = isOpen ? '✕' : '☰';
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
    return;
  }

  // Close mobile nav when clicking a nav link inside it
  const navLink = e.target.closest('.main-nav.open a');
  if (navLink) {
    const mainNav = document.querySelector('.main-nav.open');
    if (mainNav) mainNav.classList.remove('open');
    const menuBtn = document.querySelector('.mobile-menu');
    if (menuBtn) {
      menuBtn.innerHTML = '☰';
      menuBtn.setAttribute('aria-expanded', 'false');
    }
    return;
  }

  // Close mobile nav when clicking outside of it
  const openNav = document.querySelector('.main-nav.open');
  if (openNav && !e.target.closest('.main-nav') && !e.target.closest('.mobile-menu')) {
    openNav.classList.remove('open');
    const menuBtn = document.querySelector('.mobile-menu');
    if (menuBtn) {
      menuBtn.innerHTML = '☰';
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  }
});

// Password Visibility Toggle Helper
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  btn.setAttribute('aria-label', isPass ? 'Hide password' : 'Show password');
  btn.innerHTML = isPass
    ? `<svg class="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
    : `<svg class="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
}
