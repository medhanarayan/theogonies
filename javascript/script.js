gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions: "restart pause resume pause",
  markers: false
});

const SCROLL_START = 'top';
const SCROLL_END = '+=100';

// ScrollTrigger for parallax-middle
gsap.to('.parallax-middle', {
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.parallax-container',
    start: SCROLL_START,
    end: SCROLL_END,
    scrub: 0.3,
  }
});

const timelineHeader = gsap.timeline({
  scrollTrigger: {
    id: "zoom",
    trigger: "#plot",
    scrub: 0.3,
    start: "top top",
    end: "+=100% 50px",
    pin: true,
  }
});

gsap.set('.textbox-container', { opacity: 0,});

// Add animation to make the textbox appear after parallax-middle is disappeared
gsap.to('.textbox-container', {
  opacity: 1,
  duration: 1,
  scrollTrigger: {
    trigger: '.parallax-container',
    start: SCROLL_END, // Start the animation after the parallax-middle is disappeared
    end: '+=400', // Adjust the end position as per your requirements
    scrub: 0.3,
  }
});

function updateBlur() {
    
    const scrollY = window.scrollY || window.pageYOffset;
    const textBox = document.querySelector('.textbox-container');
    const bgImage = document.querySelector('.parallax-bg img');
    const bgImage2 = document.querySelector('.zoom-image');
  
    if (textBox && bgImage) {
      const textBoxBottom = textBox.getBoundingClientRect().bottom;
  
      // Calculate blur value based on the scroll position
      const blurValue = (scrollY > textBoxBottom) ? ((scrollY - textBoxBottom) / 20) + 'px' : '0px';
      
      // Calculate opacity value based on the scroll position
      const opacityValue = (scrollY > textBoxBottom) ? 1 - (scrollY - textBoxBottom) / 500 : 1; // Adjust the divisor to control the rate of opacity change
      
      bgImage.style.filter = `blur(${blurValue})`;
      bgImage2.style.filter = `blur(${blurValue})`;
      
      // Make the images as opaque as possible
      bgImage.style.opacity = opacityValue;
      bgImage2.style.opacity = opacityValue;
      if (textBox) {
        const textBoxBottom = textBox.getBoundingClientRect().bottom;
        const scrollY = window.scrollY || window.pageYOffset;

        const drawLine = document.querySelector('.draw-line');
        
        // Calculate the height based on the scroll position
        const lineHeight = (scrollY > textBoxBottom) ? (scrollY - textBoxBottom) + 'px' : '0px';
        
        drawLine.style.height = lineHeight;
        drawLine.style.opacity = (scrollY > textBoxBottom) ? 1 : 0; 
        const MAX_HEIGHT_VALUE = 200;
        if (parseInt(lineHeight, 10) >= MAX_HEIGHT_VALUE) {
            // Hide elements when the draw-line reaches its maximum height
            gsap.to(['.parallax-container'], {
              opacity: 0,
              duration: 1,
            });
          } else {
            // Show elements
            gsap.to(['.parallax-container'], {
              opacity: 1,
              duration: 1,
            });
          }
    }
}
}

// Attach ScrollTrigger to the window scroll event to call the updateBlur function
window.addEventListener('scroll', updateBlur);


  
// Animations within the timeline
timelineHeader
  .to(".parallax-bg", { scale: 1.1}, "sameTime")
  .to(".parallax-foreground", { scale: 2 }, "sameTime");


