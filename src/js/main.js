(function () {
  const singleton = new Singleton();
  const btnSongs = document.querySelector('#songs');
  const btnImport = document.querySelector('#import');
  
  function init() {
    const player = new Player('.cont-audio', singleton);
    
  }
  document.addEventListener('DOMContentLoaded', init);
}());
