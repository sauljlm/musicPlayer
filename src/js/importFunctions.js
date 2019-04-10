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

    static getForm(e) {
      e.preventDefault();
      const name = document.querySelector('#name').value;
      this.name = this.validate(name);
      console.log(this.name);
    }

    validate(value) {
      if(!value) { 
        return false
      } else {
        return value
      }
    }


  }
}());