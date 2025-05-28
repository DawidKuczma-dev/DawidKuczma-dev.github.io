const buttons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project-tile');

buttons.forEach((button) => {
   button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      buttons.forEach((button) => {
         button.classList.remove('active');
      });
      button.classList.add('active');

      projects.forEach((project) => {
         const category = project.getAttribute('data-category');

         if (filter === 'all' || filter === category) project.classList.remove('hidden');
         else project.classList.add('hidden');
      });
   });
});
