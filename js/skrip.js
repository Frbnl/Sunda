const header = document.querySelector('header');
const logo = document.getElementById('logo');
const navLinks = document.querySelectorAll('nav ul li a');

const root = document.documentElement;

function setTextColor(colorVar) {
  navLinks.forEach(link => {
    link.style.color = getComputedStyle(root).getPropertyValue(colorVar);
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
    logo.src = "Medias/GoNusa_logo.png";
    setTextColor('--textrev');
  } else {
    header.classList.remove('scrolled');
    logo.src = "Medias/GoNusa_logo_white.png";
    setTextColor('--textrev');
  }
});

header.addEventListener('mouseenter', () => {
  logo.src = "Medias/GoNusa_logo.png";
  setTextColor('--textrev');
});

header.addEventListener('mouseleave', () => {
  if (window.scrollY === 0) {
    logo.src = "Medias/GoNusa_logo_white.png";
  } else {
    logo.src = "Medias/GoNusa_logo.png";
    setTextColor('--textrev');
  }
});



