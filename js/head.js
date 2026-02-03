
const spotCards = document.querySelectorAll('.spotlight-card');
const progressBar = document.querySelector('.progress-bar');
const totalEl = document.getElementById('total');
const currentEl = document.getElementById('current');
const spotNext = document.getElementById('spot-next'); // new spotlight next
const spotPrev = document.getElementById('spot-prev'); // new spotlight prev

let spotIndex = 0;
const spotMax = spotCards.length || 1;
if (totalEl) totalEl.textContent = spotMax < 10 ? `0${spotMax}` : `${spotMax}`;

function showSpotlightSlide(i) {
  if (!spotCards.length) return;
  spotCards.forEach(c => c.classList.remove('active'));
  spotCards[i].classList.add('active');
  if (currentEl) currentEl.textContent = (i+1) < 10 ? `0${i+1}` : `${i+1}`;
  if (progressBar) progressBar.style.width = `${((i+1)/spotMax)*100}%`;
}
if (spotNext) {
  spotNext.addEventListener('click', () => {
    spotIndex = (spotIndex + 1) % spotMax;
    showSpotlightSlide(spotIndex);
  });
}
if (spotPrev) {
  spotPrev.addEventListener('click', () => {
    spotIndex = (spotIndex - 1 + spotMax) % spotMax;
    showSpotlightSlide(spotIndex);
  });
}
setInterval(() => {
  spotIndex = (spotIndex + 1) % spotMax;
  showSpotlightSlide(spotIndex);
}, 6000);

showSpotlightSlide(0);

  
