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

// Initialize theme and direction from localStorage
if (localStorage.getItem('ah-theme') === 'dark') {
  document.documentElement.dataset.theme = 'dark';
}
if (localStorage.getItem('ah-dir') === 'rtl') {
  document.documentElement.dir = 'rtl';
}

if (header) {
  header.innerHTML = `
<header class="site-header">
  <div class="container nav-wrap">
    <a class="brand" href="index.html">
      <span class="brand-mark">≈</span>
      <span>Aqua<span>Harvest</span></span>
    </a>
    <button class="mobile-menu" aria-label="Toggle navigation">☰</button>
    <nav class="main-nav">
      ${nav.map(([n, u]) => `<a class="${current === u ? 'active' : ''}" href="${u}">${n}</a>`).join('')}
      <div class="mobile-nav-actions">
        <a class="nav-login" href="login.html">Sign in</a>
        <a class="btn btn-signup" href="signup.html">Sign up</a>
      </div>
    </nav>
    <div class="nav-tools">
      <a class="nav-login desktop-only" href="login.html">Sign in</a>
      <button class="tool-btn" id="rtlToggle" title="Toggle RTL/LTR" aria-label="Toggle RTL">RTL</button>
      <button class="tool-btn" id="themeToggle" title="Toggle Dark/Light Mode" aria-label="Toggle Theme">◐</button>
      <a class="btn btn-signup desktop-only" href="signup.html">Sign up</a>
    </div>
  </div>
</header>`;
}

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

// Bind Theme Toggle
document.getElementById('themeToggle')?.addEventListener('click', () => {
  const newTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = newTheme;
  localStorage.setItem('ah-theme', newTheme);
});

// Bind RTL Toggle
document.getElementById('rtlToggle')?.addEventListener('click', () => {
  const newDir = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl';
  document.documentElement.dir = newDir;
  localStorage.setItem('ah-dir', newDir);
});

// Mobile menu toggle
document.querySelector('.mobile-menu')?.addEventListener('click', () => {
  document.querySelector('.main-nav')?.classList.toggle('open');
});
