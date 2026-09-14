(function () {
  var root = document.documentElement;

  // Load saved theme
  var savedTheme = localStorage.getItem('thinkinpark-theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  }

  function setResume(open) {
    var overlay = document.getElementById('resume-overlay');
    if (!overlay) return;

    overlay.classList.toggle('active', open);
    overlay.setAttribute('aria-hidden', String(!open));
  }

  function addResume() {
    if (
      document.getElementById('resume-overlay') ||
      !document.querySelector('[data-resume-trigger]')
    ) {
      return;
    }

    document.body.insertAdjacentHTML(
      'beforeend',
      `
      <div
        class="resume-overlay"
        id="resume-overlay"
        aria-hidden="true"
      >
        <section
          class="resume-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-title"
        >
          <button
            class="icon-button resume-close"
            id="resume-close"
            aria-label="Close résumé"
          >
            ×
          </button>

          <h2 id="resume-title">Aditya Singh</h2>

          <p class="resume-role">
            Marketing strategist · ex-software engineer · MBA candidate
          </p>

          <div class="resume-section">
            <h3>Summary</h3>
            <p>
              Interested in translating complex and technical products into
              clear positioning, useful experiences, and thoughtful growth
              strategy.
            </p>
          </div>

          <div class="resume-section">
            <h3>Experience</h3>

            <div class="resume-item">
              <strong>Marketing Analytics Intern — Fidelity Investments</strong>
              <p>
                Apr ’26 – Jun ’26 · Developed a marketing strategy using data
                insights for a complex Fidelity business problem.
              </p>
            </div>

            <div class="resume-item">
              <strong>Software Engineer — Dassault Systèmes</strong>
              <p>
                Jan ’22 – Jun ’24 · Built and integrated PLM technology for
                global manufacturing and defence clients.
              </p>
            </div>

            <div class="resume-item">
              <strong>Systems Engineer — TresVista</strong>
              <p>
                Jul ’21 – Dec ’21 · Automated routine work through scripting
                and configuration management.
              </p>
            </div>
          </div>

          <div class="resume-section">
            <h3>Education</h3>

            <div class="resume-item">
              <strong>MBA, Marketing — NMIMS Mumbai</strong>
              <p>Expected 2027</p>
            </div>

            <div class="resume-item">
              <strong>
                B.Tech, Computer Science — Symbiosis International University
              </strong>
              <p>2021</p>
            </div>
          </div>

        </section>
      </div>
      `
    );
  }

  document.addEventListener('DOMContentLoaded', function () {

    // Resume modal
    addResume();


    // Theme toggle
    var theme = document.getElementById('theme-toggle');

    if (theme) {
      theme.addEventListener('click', function () {

        var currentTheme =
          root.getAttribute('data-theme') || 'light';

        var nextTheme =
          currentTheme === 'dark'
            ? 'light'
            : 'dark';

        root.setAttribute('data-theme', nextTheme);

        localStorage.setItem(
          'thinkinpark-theme',
          nextTheme
        );

      });
    }


    // Resume open (any button/link marked data-resume-trigger — header, footer, or about)
    var openers = document.querySelectorAll('[data-resume-trigger]');

    openers.forEach(function (opener) {
      opener.addEventListener('click', function () {
        setResume(true);
      });
    });


    // Resume close
    var closer = document.getElementById('resume-close');

    if (closer) {
      closer.addEventListener('click', function () {
        setResume(false);
      });
    }


    // Close resume when clicking outside
    var overlay = document.getElementById('resume-overlay');

    if (overlay) {
      overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
          setResume(false);
        }
      });
    }


    // Random Walk
    var wander = document.getElementById('take-me-somewhere');

    if (wander) {
      wander.addEventListener('click', function () {

        var walks = [
          'post-1.html',
          'post-2.html',
          'post-3.html',
          'post-4.html'
        ];

        var randomWalk =
          walks[Math.floor(Math.random() * walks.length)];

        window.location.href = randomWalk;

      });
    }


    // Escape closes resume
    document.addEventListener('keydown', function (event) {

      if (event.key === 'Escape') {
        setResume(false);
      }

    });

  });

})();