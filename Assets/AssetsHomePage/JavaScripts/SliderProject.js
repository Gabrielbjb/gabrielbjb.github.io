let dataGlobal = [];
function CreateProjectCard(language) {
  document.querySelectorAll('.slide').forEach(function(pilihan) {
    pilihan.remove();
  });
  const mainContainer = document.querySelector('.slider-container');
  let combinedHTML = '';
  for (let i = 0; i < 3; i++) {
    let tileHTMLSkill = '';
    for (let j = 0; j < dataGlobal[i].SoftwareUses.length; j++) {
      tileHTMLSkill += `<img style="margin: 4px; width: 25px; " src="/Assets/AssetsIcon/${dataGlobal[i].SoftwareUses[j]}.svg" alt="${dataGlobal[i].SoftwareUses[j]}">`;
    }
    let tileHTML = `
    <div class="slide">
      <a href="https://gabrielbjb.my.id?language=1" style=" text-decoration: none; ">
        <div class="box" style="background-image: url(/Assets/AssetsProject/${dataGlobal[i][language].ThumbnailImage});">
          <div>
              ${tileHTMLSkill}
          </div>
          <div>
              <p style="color:white; font-size: 13px; margin: 0;">${dataGlobal[i][language].Description.length > 70 ? dataGlobal[i][language].Description.slice(0, 70) +"..." : dataGlobal[i][language].Description}</p>
          </div>
        </div>
      </a>
    </div>
    `;
    combinedHTML += tileHTML;
  }
  mainContainer.innerHTML += combinedHTML;
  const slider = document.getElementById("slider");
  const slides = slider.querySelectorAll(".slide");
  const dotsContainer = document.getElementById("dots");
  
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      const slideWidth = slides[0].offsetWidth;
      slider.scrollTo({
        left: i * slideWidth,
        behavior: "smooth"
      });
    });
    dotsContainer.appendChild(dot);
  }
  let currentIndex = 0;

  function updateDots(index) {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  function getCurrentIndex() {
    const slideWidth = slides[0].offsetWidth;
    return Math.round(slider.scrollLeft / slideWidth);
  }

  slider.addEventListener("scroll", () => {
    currentIndex = getCurrentIndex();
    updateDots(currentIndex);
  });
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => isDown = false);
  slider.addEventListener("mouseup", () => isDown = false);

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });
}
function StartProject(language){
  fetch('/Assets/AssetsHomePage/JSON/ProjectList.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Jaringan bermasalah atau file tidak ditemukan');
      }
      return response.json();
    })
    .then(data => {
      dataGlobal = data;
      console.log(dataGlobal);
      CreateProjectCard(language)
    })
    .catch(error => {
      console.error('Terjadi kesalahan saat fetch:', error);
    });
}
