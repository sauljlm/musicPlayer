(function () {
  const singleton = new Singleton();

  const container = document.querySelector('.cont-audio');

  const btnSongs = document.querySelector('#songs');
  const btnImport = document.querySelector('#import');

  function init() {
    const player = new Player(container, singleton);
    
  }
  document.addEventListener('DOMContentLoaded', init);
}());
