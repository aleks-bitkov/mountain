<<<<<<< HEAD
=======
SmoothScroll({

  animationTime: 800,

  stepSize: 75,




  accelerationDelta: 30,

  accelerationMax: 2,

  keyboardSupport: true,
  arrowScroll: 50,

  pulseAlgorithm: true,
  pulseScale: 4,
  pulseNormalize: 1,


  touchpadSupport: true
});



>>>>>>> e5e16bb (optimaze all project)
function asidesToFixed(){
  const asideContact = document.querySelector(".contact")
  const asideMainNavigation = document.querySelector(".main-navigation")
  const startPosition = asideContact.offsetTop;
  
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
  
  
    if (scrollPosition > startPosition) {
      asideContact.style.position = "fixed";
      asideMainNavigation.style.position = "fixed";
      asideContact.style.top = "20px";
      asideMainNavigation.style.top = "20px";
    } else {
      asideContact.style.position = "absolute";
      asideContact.style.top = startPosition + 35 + "px";
      asideMainNavigation.style.position = "absolute";
      asideMainNavigation.style.top = startPosition + "px";
    }
  });
  
}

<<<<<<< HEAD
=======

>>>>>>> e5e16bb (optimaze all project)
function ScrollMainNavigation(){
  let sectionLevel = document.querySelector("#level").offsetTop;
  let sectionEssentials = document.querySelector("#essentials").offsetTop;
  let sectionUnderstand = document.querySelector("#understand").offsetTop;
  const sectionItems = document.querySelectorAll(".main-navigation__box-item")
  sectionItems[0].classList.add("main-navigation__box-item--active")
  
  window.addEventListener('scroll', ()=>{
    const scrollPosition = window.scrollY;

    if((scrollPosition + 10) <= sectionLevel){
      sectionItems[0].classList.add("main-navigation__box-item--active")
    }
  
    if((sectionLevel)<= (scrollPosition + 10)){
      sectionItems.forEach(item => {
        item.classList.remove("main-navigation__box-item--active")
      });
      sectionItems[1].classList.add("main-navigation__box-item--active")
    }else{
      sectionItems[1].classList.remove("main-navigation__box-item--active")
    }
  
    if((sectionEssentials) <= (scrollPosition + 10)){
      sectionItems.forEach(item => {
        item.classList.remove("main-navigation__box-item--active")
      });
      sectionItems[2].classList.add("main-navigation__box-item--active")
    }else{
      sectionItems[2].classList.remove("main-navigation__box-item--active")
    }
  
    if((sectionUnderstand) <= (scrollPosition + 10)){
      sectionItems.forEach(item => {
        item.classList.remove("main-navigation__box-item--active")
      });
      sectionItems[3].classList.add("main-navigation__box-item--active")
    }else{
      sectionItems[3].classList.remove("main-navigation__box-item--active")
    }  
  });
}


function toggleContent(elementSelector, fallbackText, maxWidth, svgPath = null, style=null) {
  const element = document.querySelector(elementSelector);

  if (!element) return;

  function insertSVGorClearText() {
    if (svgPath && style) {
      element.innerHTML = `<a href="#header"><img src="${svgPath}" alt="icon" style="${style}"></a>`;
    } else if (svgPath && !style) {
      element.innerHTML = `<img src="${svgPath}" alt="icon">`;
    } else {
      element.innerHTML = '';
    }
  }

  function restoreText() {
    element.innerHTML = fallbackText;
  }

  const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);

  function handleScreenChange(e) {
    if (e.matches) {
      insertSVGorClearText();
    } else {
      restoreText();
    }
  }

  mediaQuery.addEventListener('change', handleScreenChange);
  handleScreenChange(mediaQuery);
}


function burgerMenu(){
  document.addEventListener("DOMContentLoaded", function() {
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.menu');
    const body = document.body;
  
    burger.addEventListener('click', function() {
      burger.classList.toggle('active');
      menu.classList.toggle('active');
      body.classList.toggle('lock');
    });
  });
  
}

function isFirefox() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

function smoothScrollForFirefox(){
  if (isFirefox()) {
    Math.easeOutQuad = function (t, b, c, d) { 
        t /= d; 
        return -c * t * (t - 2) + b; 
    };
  
    (function() {
        var interval, mult = 0, dir = 0, steps = 30, length = 90;
  
        function MouseWheelHandler(e) {
            if (e.preventDefault) e.preventDefault();
            e.returnValue = false;
  
            clearInterval(interval);
            ++mult;
            mult = Math.min(mult, 5);
            var delta = Math.sign(e.deltaY || e.detail || -e.wheelDelta);
            if (dir != delta) {
                mult = 1;
                dir = delta;
            }
  
            for (var tgt = e.target; tgt != document.documentElement; tgt = tgt.parentNode) {
                var oldScroll = tgt.scrollTop;
                tgt.scrollTop += delta;
                if (oldScroll != tgt.scrollTop) break;
            }
  
            var start = tgt.scrollTop;
            var end = start + length * mult * delta;
            var change = end - start;
            var step = 0;
  
            function animateScroll() {
                var pos = Math.round(Math.easeOutQuad(step++, start, change, steps));
                tgt.scrollTop = pos;
                if (step < steps) {
                    requestAnimationFrame(animateScroll);
                } else {
                    mult = 0;
                }
            }
  
            requestAnimationFrame(animateScroll);
        }
  
        window.addEventListener("wheel", MouseWheelHandler, { passive: false });
        window.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    })();
  }
}


function smoothScrollAnchors(){
  document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default jump behavior
  
            // Find the target element
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
  
            if (targetElement) {
                // Calculate the scroll position
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800; // Transition duration in milliseconds
                let startTime = null;
  
                // Easing function (easeOutQuad for smooth animation)
                function easeOutQuad(t, b, c, d) {
                    t /= d;
                    return -c * t * (t - 2) + b;
                }
  
                // Animation function
                function animateScroll(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
  
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animateScroll);
                    }
                }
  
                // Start the animation
                requestAnimationFrame(animateScroll);
            }
        });
    });
  });
}

function openCloseModalWindow(){
  const modalWindowWrapper = document.querySelector('.modal-window__wrapper');
  const modalWindow = document.querySelector('.modal-window');
  const loginLink = document.querySelector('.login-link');
  const registerLink = document.querySelector('.register-link');
  const btnPopups = document.querySelectorAll('.profile__box');
  const iconClose = document.querySelector('.icon-close');
  
  registerLink.addEventListener('click', () => {
    modalWindow.classList.add('active');
  });
  
  loginLink.addEventListener('click', () => {
    modalWindow.classList.remove('active');
  });
  
  btnPopups.forEach(btn => {
    btn.addEventListener('click', () => {
      modalWindow.classList.toggle('active-popup');
      modalWindowWrapper.classList.toggle('active-popup');
    });
  });
  
  iconClose.addEventListener('click', () => {
    modalWindow.classList.remove('active-popup');
    modalWindowWrapper.classList.remove('active-popup');
  });
  
  modalWindow.addEventListener('wheel', preventScroll, {passive: false});
  
  function preventScroll(e){
      e.preventDefault();
      e.stopPropagation();
  
      return false;
  }
  
}

function backToTop(){
  function applyStyleOnScroll() {
    const divElement = document.querySelector('.back-top');
    
    if (window.innerWidth <= 750 && window.scrollY > 1760) {
      divElement.style.opacity = '1';
    } else {
      divElement.style.opacity = '0';
    }
  }
  
  window.addEventListener('scroll', applyStyleOnScroll);
  
  applyStyleOnScroll();  
}

<<<<<<< HEAD



=======
function removeClassActivePopUp(){
  window.addEventListener('wheel', function(){
    const scrollPosition = window.scrollY;
    let modalWindow = document.querySelector('.modal-window');
    if (scrollPosition >= 950){
      modalWindow.classList.remove('active-popup')
    }
  });
};


removeClassActivePopUp();
>>>>>>> e5e16bb (optimaze all project)
asidesToFixed();
ScrollMainNavigation();
toggleContent('.main-navigation__box-item--first', '<a href="#header">Start</a>', 1240, "images/home.svg", "max-width: 20px;");
toggleContent('.profile__box-text', 'Account', 750);
burgerMenu();
smoothScrollForFirefox();
smoothScrollAnchors();
openCloseModalWindow();
backToTop();




