const video = document.getElementById('profileVideo');

video.addEventListener('error', () => {
   video.poster = 'assets/images/prof.jpg';
});
