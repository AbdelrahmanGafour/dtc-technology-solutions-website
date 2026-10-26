/* Shared footer markup — injected into <footer id="site-footer-include"> on every page */
document.addEventListener('DOMContentLoaded', function () {
  const mount = document.getElementById('site-footer-include');
  if (!mount) return;
  mount.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="assets/images/dtc-logo-white.webp" alt="DTC Technology Solutions">
          <p>Your trusted partner for end-to-end technology infrastructure — networking, cloud, data centers, security, fire &amp; life safety and audio-visual systems.</p>
          <div class="social-row">
            <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="X / Twitter"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="partners.html">Partners</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Our Services</h4>
          <ul>
            <li><a href="services.html#network">Network Infrastructure</a></li>
            <li><a href="services.html#cloud">Multi-Cloud &amp; Hybrid Cloud</a></li>
            <li><a href="services.html#datacenter">Data Center Solutions</a></li>
            <li><a href="services.html#security">Physical Security</a></li>
            <li><a href="services.html#fire">Fire &amp; Life Safety</a></li>
            <li><a href="services.html#av">Audio Visual</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Get In Touch</h4>
          <div class="contact-info-item">
            <div class="ico"><i class="fa-solid fa-location-dot"></i></div>
            <div><strong>Visit</strong><span>Building 265, 22 Lasilki Street, New Maadi, Cairo, Egypt</span></div>
          </div>
          <div class="contact-info-item">
            <div class="ico"><i class="fa-solid fa-envelope"></i></div>
            <div><strong>Email</strong><a href="mailto:info@dtc-eg.net">info@dtc-eg.net</a></div>
          </div>
          <div class="contact-info-item">
            <div class="ico"><i class="fa-solid fa-phone"></i></div>
            <div><strong>Phone</strong><a href="tel:+201060162992">+20 106 016 2992</a></div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} DTC Technology Solutions. Part of El Eyad Construction Group, KSA. All rights reserved.</span>
        <span>Designed &amp; Developed with <i class="fa-solid fa-heart" style="color:var(--gold-500);"></i> by Ammar Marketing.</span>
      </div>
    </div>
  `;
});
