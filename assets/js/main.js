// Sport View Hotel — Phase 3: public frontend only.
// No backend calls yet. This file handles pure UI behavior:
// mobile nav toggle + basic client-side validation on the
// availability search widget (real availability logic comes
// in Phase 8 once PHP/MySQL are wired up).

document.addEventListener('DOMContentLoaded', function () {
  var navLinks = document.querySelectorAll('.nav-links a');
  var sections = document.querySelectorAll('section[id]');

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', isActive);
    });
  }

  function onScroll() {
    var scrollPosition = window.scrollY + 120;
    var currentId = 'home';

    sections.forEach(function (section) {
      if (scrollPosition >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    setActiveLink(currentId);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var id = link.getAttribute('href').substring(1);
      setActiveLink(id);
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var searchForm = document.querySelector('.search-widget');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var checkIn = searchForm.querySelector('#check-in');
      var checkOut = searchForm.querySelector('#check-out');

      if (!checkIn.value || !checkOut.value) {
        alert('Please select both a check-in and check-out date.');
        return;
      }

      if (new Date(checkOut.value) <= new Date(checkIn.value)) {
        alert('Check-out date must be after check-in date.');
        return;
      }

      alert('Search widget works. Real availability checking is wired up in Phase 8/9.');
    });
  }

  var galleryFilters = document.getElementById('gallery-filters');
  if (galleryFilters) {
    galleryFilters.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;

      this.querySelectorAll('button').forEach(function (button) {
        button.classList.remove('active');
      });

      btn.classList.add('active');
      var filter = btn.dataset.filter;
      document.querySelectorAll('#gallery-grid figure').forEach(function (fig) {
        fig.style.display = (filter === 'all' || fig.dataset.category === filter) ? '' : 'none';
      });
    });
  }

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('contact-form-status');
      if (status) {
        status.classList.add('success');
      }
    });
  }
});
