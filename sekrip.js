// === GANTI TAB WARTA ===
const judulAkan = document.getElementById('judul-berlangsung');
const judulTelah = document.getElementById('judul-telah');
const beritaAkan = document.getElementById('berita-akan');
const beritaTelah = document.getElementById('berita-telah');

// Mun diklik, tab na ganti
if (judulAkan && judulTelah) {
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
}

// === SLIDER GAMBAR WARTA ===
document.querySelectorAll('.slider').forEach(slider => {
  const slides = slider.querySelector('.slides');
  const images = slides.querySelectorAll('img');
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  let index = 0;

  if (slides && images.length && prev && next) {
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
  }
});

// === BANNER SCROLL EFFECT ===
(function () {
  const banner = document.querySelector('.banner');
  if (!banner) return;

  const START_SCALE = 1.15;
  const END_SCALE = 1.0;
  const MAX_BLUR = 6;
  const SCROLL_RANGE = window.innerHeight * 1.5;

  banner.style.setProperty('--banner-scale', START_SCALE);
  banner.style.setProperty('--banner-bg-size', Math.round(START_SCALE * 100) + '%');
  banner.style.setProperty('--banner-blur', '0px');

  let ticking = false;
  function update() {
    const fromTop = window.scrollY;
    const t = Math.min(1, fromTop / SCROLL_RANGE);
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
  update();
})();

// === MENU & HAMBURGER ===
function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    
    if (navbar) navbar.classList.toggle('active');
    if (hamburger) hamburger.classList.toggle('active');
}

document.querySelectorAll('.navbar a').forEach(n => n.addEventListener('click', () => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    
    if (navbar) navbar.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
}));
