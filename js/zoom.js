// paste into sekrip.js (runs after DOM loaded because sekrip.js already deferred)
(function () {
  const banner = document.querySelector('.banner');
  if (!banner) return;

  // tweak these values untuk atur intensitas
  const START_SCALE = 1.15;   // skala ketika di top
  const END_SCALE = 1.0;      // skala setelah digulir jauh
  const MAX_BLUR = 6;         // px blur maksimum
  const SCROLL_RANGE = window.innerHeight * 1.5; // seberapa jauh scroll untuk efek penuh

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
