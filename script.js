// Get Elements
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let slider = document.querySelector('.slider');
let slides = document.querySelectorAll('.slide');

// Get slide width
let width = slides[0].getBoundingClientRect().width;

// Update width on resize
window.addEventListener('resize', () => {
  width = slides[0].getBoundingClientRect().width;
});

// Start index at 0
let index = 0;

// Insert first and last slides for smooth infinite loop
slider.insertAdjacentHTML('afterbegin', slides[slides.length - 1].outerHTML);
slider.insertAdjacentHTML('beforeend', slides[0].outerHTML);

// Initial position
slider.style.transform = `translateX(-${width}px)`;

// Create dots
slides.forEach(() => {
  let dot = document.createElement('li');
  dot.classList.add('dot');
  document.querySelector('.slider-controler').appendChild(dot);
});

// Get all dots
let dots = document.querySelectorAll('.dot');
dots[0].classList.add('active'); // Activate first dot

// Helper functions
function SlideMove(i) {
  if (i !== undefined) {
    slider.style.transform = `translateX(-${width * (i + 1)}px)`;
  } else {
    slider.style.transform = `translateX(-${width}px)`;
  }
}

function transition(enable) {
  if (enable) {
    slider.style.transition = `transform 0.5s ease-in-out`;
  } else {
    slider.style.transition = 'none';
  }
}

function removeDot() {
  dots.forEach((dot) => dot.classList.remove('active'));
}

function activeDot(i) {
  dots[i].classList.add('active');
}

// Manual next button
next.addEventListener('click', () => {
  index++;
  transition(true);
  SlideMove(index);
  removeDot();

  if (index > slides.length - 1) {
    setTimeout(() => {
      transition(false);
      index = 0;
      SlideMove();
      activeDot(index);
    }, 500);
  } else {
    activeDot(index);
  }
});

// Manual previous button
prev.addEventListener('click', () => {
  index--;
  transition(true);
  SlideMove(index);
  removeDot();

  if (index < 0) {
    setTimeout(() => {
      transition(false);
      index = slides.length - 1;
      SlideMove(index);
      activeDot(index);
    }, 500);
  } else {
    activeDot(index);
  }
});

// Dots click
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    removeDot();
    index = i;
    activeDot(index);
    transition(true);
    SlideMove(index);
  });
});

// Auto sliding
function autoSlide() {
  index++;
  transition(true);
  SlideMove(index);
  removeDot();

  if (index > slides.length - 1) {
    setTimeout(() => {
      transition(false);
      index = 0;
      SlideMove();
      activeDot(index);
    }, 500);
  } else {
    activeDot(index);
  }
}

// Start autoslide every 5 seconds
let autoSlideInterval = setInterval(autoSlide, 2000);

// Pause auto sliding on hover
slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
slider.addEventListener('mouseleave', () => autoSlideInterval = setInterval(autoSlide, 2000));
