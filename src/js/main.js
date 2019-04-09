(function () {
  const singleton = new Singleton();
  const importSong = new Import();
  const btnSongs = document.querySelector('#songs');
  const btnImport = document.querySelector('#import');
  const contSongs = document.querySelector('.js-songs');
  const contImport = document.querySelector('.js-import');
  
  function init() {
    const player = new Player('.cont-audio', singleton);
  }

  btnImport.addEventListener('click', () => {
    contSongs.classList.remove('show');
    contSongs.classList.add('hidde');
    contImport.classList.remove('hidde');
    contImport.classList.add('show');
  });

  btnSongs.addEventListener('click', () => {
    contSongs.classList.remove('hidde');
    contSongs.classList.add('show');
    contImport.classList.remove('show');
    contImport.classList.add('hidde');
  });

  document.addEventListener('DOMContentLoaded', init);
}());
