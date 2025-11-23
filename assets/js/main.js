(function() {
  "use strict";

  /**
   * Helper function to select elements
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Helper function to add event listeners
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Helper function for scroll events
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * 1. Scrollspy: Highlights the sidebar link as you scroll
   */
  let navbarlinks = select('#navbar .nav-link', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * 2. Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * 3. Back to top button visibility
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * 4. Universal Sidebar Toggle (Updated)
   * Handles Desktop Collapse and Mobile Open/Close
   */
  on('click', '.header-toggle', function(e) {
    const body = select('body');
    const icon = this.querySelector('i');

    // Check screen size
    if (window.innerWidth >= 1200) {
      // Desktop: Collapse Sidebar
      body.classList.toggle('header-collapsed');
    } else {
      // Mobile: Open/Close Sidebar
      body.classList.toggle('mobile-nav-active');
    }

    // Toggle the icon (List <-> X)
    icon.classList.toggle('bi-list');
    icon.classList.toggle('bi-x');
  })

  /**
   * 5. Scroll with offset on links with a class name .scrollto
   * Closes mobile menu when a link is clicked
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      
      // Only modify classes if we are in Mobile Mode
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let toggleBtn = select('.header-toggle')
        let icon = toggleBtn.querySelector('i')
        icon.classList.toggle('bi-list')
        icon.classList.toggle('bi-x')
      }
      
      scrollto(this.hash)
    }
  }, true)

  /**
   * 6. Scroll with offset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * 7. Initialize AOS (Animate On Scroll)
   */
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
      });
    }
  });

})()
