window.addEventListener('load', function () {
  const section = document.getElementById('star-section');
  const numberOfStars = 200;
  const sectionWidth = section.offsetWidth;
  const sectionHeight = section.offsetHeight;
  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const x = Math.random() * sectionWidth;
    const y = Math.random() * sectionHeight;
    star.style.left = `${x}px`; 
    star.style.top = `${y}px`;
    const duration = (Math.random() * 2 + 1).toFixed(2);
    const delay = (Math.random() * 3).toFixed(2);
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;
    section.appendChild(star);
  }
});