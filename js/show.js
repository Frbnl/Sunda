document.addEventListener('DOMContentLoaded', () => {
  const observers = document.querySelectorAll('.fade-in');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  observers.forEach(el => io.observe(el));
});