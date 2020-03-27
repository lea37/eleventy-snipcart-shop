function onClick(e) {
   e.preventDefault();
   var newLocation = e.currentTarget.href;
   document.querySelector(".main").classList.remove("active");
   setTimeout(function(){
      window.location = newLocation;
   },400);
}

function activeOnVisible() {
  const elements = [...document.querySelectorAll('.js-active-on-visible')]

  const options = {
    rootMargin: '-100px',
    threshold: 0.25
  }

  const callback = (entries) => {
    entries.forEach((entry) => {
      const delay = entry.target.getAttribute('data-delay');

      if (entry.intersectionRatio >= 0.25) {
          setTimeout(() => {
              entry.target.classList.add("is-visible");
          }, delay)
      }
    })
  }

  const observer = new IntersectionObserver(callback, options)

  elements.forEach((element, index) => {
    observer.observe(element)
  })
}


document.addEventListener("DOMContentLoaded", function() {
  document.body.classList.add('loaded');
  
  // PAGE TRANSITION
  setTimeout(function(){ 
      document.querySelector(".main").classList.add("active");
  }, 1);

  // Play transition before changing page
  var links = document.querySelectorAll('.menu__item a');
  for (var i = links.length - 1; i >= 0; i--) {
    links[i].addEventListener('click', onClick);
  }

  // ACTIVE IN VIEW
  if (window.matchMedia("(min-width: 54rem)").matches) {
    activeOnVisible();
  }
});

