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

  document.addEventListener('DOMContentLoaded', function () {
    var themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    var resumeBtn = document.getElementById('resume-toggle');
    if (resumeBtn) resumeBtn.addEventListener('click', openResume);

    var closeBtn = document.getElementById('resume-close');
    if (closeBtn) closeBtn.addEventListener('click', closeResume);

    var overlay = document.getElementById('resume-overlay');
    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeResume();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeResume();
    });
  });
})();
