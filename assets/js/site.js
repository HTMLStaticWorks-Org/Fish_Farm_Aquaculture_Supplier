// AquaHarvest Site JavaScript
const header = document.getElementById('site-header');
const footer = document.getElementById('site-footer');
const current = location.pathname.split('/').pop() || 'index.html';

const nav = [
  ['Home1', 'index.html'],
  ['Home2', 'home2.html'],
  ['About', 'about.html'],
  ['Products', 'products.html'],
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
        <a href="https://instagram.com" aria-label="Instagram">◎</a>
        <a href="https://facebook.com" aria-label="Facebook">f</a>
        <a href="https://linkedin.com" aria-label="LinkedIn">in</a>
        <a href="https://youtube.com" aria-label="YouTube">▶</a>
      </div>
    </div>
    <div>
      <h4>Explore</h4>
      <a href="index.html">Home 1</a>
      <a href="home2.html">Home 2</a>
      <a href="about.html">Our Story & Labs</a>
      <a href="products.html">Aquaculture Supplies</a>
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
