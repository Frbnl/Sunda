// === GANTI TAB WARTA ===
const judulAkan = document.getElementById('judul-berlangsung');
const judulTelah = document.getElementById('judul-telah');
const beritaAkan = document.getElementById('berita-akan');
const beritaTelah = document.getElementById('berita-telah');

// Mun diklik, tab na ganti
judulAkan.addEventListener('click', () => {
  judulAkan.classList.add('aktip');
  judulTelah.classList.remove('aktip');
  beritaAkan.classList.add('aktif');
  beritaTelah.classList.remove('aktif');
});

judulTelah.addEventListener('click', () => {
  judulTelah.classList.add('aktip');
  judulAkan.classList.remove('aktip');
  beritaTelah.classList.add('aktif');
  beritaAkan.classList.remove('aktif');
});

// === SLIDER GAMBAR WARTA ===
document.querySelectorAll('.slider').forEach(slider => {
  const slides = slider.querySelector('.slides');
  const images = slides.querySelectorAll('img');
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  let index = 0;

  function updateSlide() {
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  next.addEventListener('click', () => {
    index = (index + 1) % images.length;
    updateSlide();
  });

  prev.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    updateSlide();
  });
});

function toggleTheme() {
    const link = document.getElementById("theme-style");
      if (link.getAttribute("href") === "style.css") {
        link.setAttribute("href", "dark.css");
      } else {
        link.setAttribute("href", "style.css");
      }
    };
// paste into sekrip.js (runs after DOM loaded because sekrip.js already deferred)
(function () {
  const banner = document.querySelector('.banner');
  if (!banner) return;

  // ieu nilaina bisa dioprek keur ngatur intensitas
  const START_SCALE = 1.15;   // skala pas masih di luhur
  const END_SCALE = 1.0;      // skala sanggeus discroll jauh
  const MAX_BLUR = 6;         // blur maksimum dina px
  const SCROLL_RANGE = window.innerHeight * 1.5; // jarak scroll keur efek pinuh

  // set initial CSS vars
  banner.style.setProperty('--banner-scale', START_SCALE);
  banner.style.setProperty('--banner-bg-size', Math.round(START_SCALE * 100) + '%');
  banner.style.setProperty('--banner-blur', '0px');

  let ticking = false;
  function update() {
    const fromTop = window.scrollY;
    const t = Math.min(1, fromTop / SCROLL_RANGE); // 0..1
    const scale = START_SCALE - (START_SCALE - END_SCALE) * t;
    const blur = MAX_BLUR * t;
    banner.style.setProperty('--banner-scale', scale.toFixed(4));
    banner.style.setProperty('--banner-bg-size', Math.round(scale * 100) + '%');
    banner.style.setProperty('--banner-blur', blur.toFixed(2) + 'px');
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    // update SCROLL_RANGE on resize (optional)
    // note: SCROLL_RANGE is const above; if you want it dynamic, compute here and use closure var instead
  });

  // run once to init
  update();
})();

function toggleMenu() {
    document.querySelector(".navbar").classList.toggle("active");
}

function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    
    navbar.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Optional: Close menu when a link is clicked
document.querySelectorAll('.navbar a').forEach(n => n.addEventListener('click', () => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    
    navbar.classList.remove('active');
    hamburger.classList.remove('active');
}));


    
