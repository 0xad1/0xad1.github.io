(function () {
  var root = document.documentElement;
  var stored = localStorage.getItem('ledger-theme');
  if (stored === 'dark') root.setAttribute('data-theme', 'dark');

  function toggleTheme() {
    var isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('ledger-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('ledger-theme', 'dark');
    }
  }

  function openResume() {
    var overlay = document.getElementById('resume-overlay');
    if (overlay) overlay.classList.add('active');
  }

  function closeResume() {
    var overlay = document.getElementById('resume-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  // ---- Lightbox gallery ----
  var galleryItems = [];
  var currentIndex = 0;

  function openLightbox(index) {
    var overlay = document.getElementById('lightbox-overlay');
    if (!overlay || !galleryItems.length) return;
    currentIndex = index;
    updateLightbox();
    overlay.classList.add('active');
  }

  function closeLightbox() {
    var overlay = document.getElementById('lightbox-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  function updateLightbox() {
    var img = document.getElementById('lightbox-img');
    var titleEl = document.getElementById('lightbox-title');
    var metaEl = document.getElementById('lightbox-meta');
    var item = galleryItems[currentIndex];
    if (!item || !img) return;
    img.src = item.getAttribute('data-full') || item.querySelector('img') && item.querySelector('img').src || '';
    if (titleEl) titleEl.textContent = item.getAttribute('data-title') || '';
    if (metaEl) metaEl.textContent = item.getAttribute('data-meta') || '';
  }

  function nextImage() {
    if (!galleryItems.length) return;
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightbox();
  }

  function prevImage() {
    if (!galleryItems.length) return;
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    var resumeBtn = document.getElementById('resume-toggle');
    if (resumeBtn) resumeBtn.addEventListener('click', openResume);

    var closeBtn = document.getElementById('resume-close');
    if (closeBtn) closeBtn.addEventListener('click', closeResume);

    var resumeOverlay = document.getElementById('resume-overlay');
    if (resumeOverlay) {
      resumeOverlay.addEventListener('click', function (e) {
        if (e.target === resumeOverlay) closeResume();
      });
    }

    galleryItems = Array.prototype.slice.call(document.querySelectorAll('.masonry-item'));
    galleryItems.forEach(function (item, i) {
      item.addEventListener('click', function () { openLightbox(i); });
    });

    var lightboxOverlay = document.getElementById('lightbox-overlay');
    if (lightboxOverlay) {
      lightboxOverlay.addEventListener('click', function (e) {
        if (e.target === lightboxOverlay) closeLightbox();
      });
    }

    var lbClose = document.getElementById('lightbox-close');
    if (lbClose) lbClose.addEventListener('click', closeLightbox);

    var lbNext = document.getElementById('lightbox-next');
    if (lbNext) lbNext.addEventListener('click', nextImage);

    var lbPrev = document.getElementById('lightbox-prev');
    if (lbPrev) lbPrev.addEventListener('click', prevImage);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeResume(); closeLightbox(); }
      if (lightboxOverlay && lightboxOverlay.classList.contains('active')) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    });
  });
})();
