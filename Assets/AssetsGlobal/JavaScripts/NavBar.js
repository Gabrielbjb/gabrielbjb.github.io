const navbar = document.getElementById('navbar');
const navbarIdentity = document.getElementById('identity');
let isSmall = false;
document.addEventListener('DOMContentLoaded', function () {
  //check which url user is on
  let currentUrl = window.location.pathname;
  if (currentUrl === '/') {
    document.getElementById('Home').classList.add('active');
  } else if (currentUrl === '/Donation/') {
    document.getElementById('DonationNav').classList.add('active');
  }
});
function handleResize() {
  if (window.innerWidth < 960) {
    navbar.classList.add('sticky');
    navbarIdentity.classList.add("invisibleIdentity");
    isSmall = true;
  } else {
    navbar.classList.remove('sticky');
    navbarIdentity.classList.remove("invisibleIdentity");
    isSmall = false;
  }
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    if (isSmall) return;
    navbar.classList.add('sticky');
    navbarIdentity.classList.add("invisibleIdentity");
  } else {
    if (isSmall) return;
    navbar.classList.remove('sticky');
    navbarIdentity.classList.remove("invisibleIdentity");
  }
});

window.addEventListener('resize', handleResize);
window.addEventListener('DOMContentLoaded', handleResize);