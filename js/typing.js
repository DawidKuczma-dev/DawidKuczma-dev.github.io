const box = document.querySelector('.intro-tile__typing');
const texts = ['Portfolio created by:', 'Portfolio wykonane przez:'];

let textIndex = 0;
let charIndex = 0;
let deleting = false;
let lastTime = 0;

const speed = 50; // typing/deleting speed
const pauseEnd = 1500; // pause after typing
const pasueStart = 200; // pause after deleting

const typeWriter = (timestamp) => {
   if (timestamp - lastTime < speed) {
      requestAnimationFrame(typeWriter);
      return;
   }

   lastTime = timestamp;
   const currentText = texts[textIndex];

   if (!deleting) {
      // Text typing
      box.textContent = currentText.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
         setTimeout(() => {
            deleting = true;
            requestAnimationFrame(typeWriter);
         }, pauseEnd);
         return;
      }
   } else {
      // Text deleting
      box.textContent = currentText.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
         deleting = false;
         textIndex = (textIndex + 1) % texts.length;
         setTimeout(() => {
            requestAnimationFrame(typeWriter);
         }, pasueStart);
         return;
      }
   }

   requestAnimationFrame(typeWriter);
};

requestAnimationFrame(typeWriter);
