document.addEventListener('DOMContentLoaded', function() {
  document
    .querySelector('.load-more-boards-button')
    .addEventListener('click', function(e) {
      e.target.classList.toggle('clicked');
      document
        .querySelectorAll('.animated-board')
        .forEach(element => element.classList.toggle('active'));
    });
});
