const ImportFunctions = (function () {
  return class ImportFunctions {
    constructor () {
      this.singleton = new Singleton();
      this.import = new Import();
      this.name = null;
      this.artist = null;
      this.year = null;
      this.album = null;
      this.image = null;
      this.mp3 = null;
      this.waw = null;
      this.ogg = null;

      this.import.render();
    }

    static valueImport(e) {
      e.preventDefault();
      console.log('hola mundo');
    }
  }
}());