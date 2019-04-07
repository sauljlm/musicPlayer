const Player = (function () {

  return class Player {
    constructor(container, singleton) {
      this.container = container;
      this.contNav = document.querySelector('#cont-nav');
      this._audio = null;
      this.singleton = singleton;
      this.compose();
    }

    compose() {
      this._audio = this.audio();
      const btnPlaypase = this.btn('class', 'btn-play');
      const btnBack = this.btn('class', 'btn-back');
      const btnNext = this.btn('class', 'btn-next');

      btnPlaypase.addEventListener('click', () => {
        this.singleton.togglePlay();
      });

      btnBack.addEventListener('click', () => {
        this.singleton.back();
      });

      this.container.appendChild(this._audio);
      this.contNav.appendChild(btnBack);
      this.contNav.appendChild(btnPlaypase);
      this.contNav.appendChild(btnNext);

      this.singleton.audio = this._audio;
      // console.log(this.singleton.cancion);
    }

    audio() {
      const audio = document.createElement('audio');
      audio.setAttribute('src', `${this.singleton.getSong()}`);
      // audio.setAttribute('src', 'https://github.com/sauljlm/songs/blob/master/Adan%20y%20Eva.mp3');
      
      audio.setAttribute('controls', '');
      audio.setAttribute('class', 'clearfix');
      return audio;
    }

    btn(type = 'class', value) {
      const btn = document.createElement('button');
      if (value) { 
        btn.setAttribute(`${type}`, `btn ${value}`);
      }
      return btn;
    }

    /**
     * Disable a button
     * @param {HTMLButtonElement} button
     */
    static disableButton (button) {
      if(!(button instanceof HTMLButtonElement))
          throw new Error(`Invalid button is not a HTMLButtonElement: ${button}`);

      button.setAttribute('disabled', '');
      button.classList.add('disabled');
    }

    /**
     * Disable a button
     * @param {HTMLButtonElement} button
     */
    static enableButton (button) {
        if(!(button instanceof HTMLButtonElement))
            throw new Error(`Invalid button is not a HTMLButtonElement: ${button}`);

        button.removeAttribute('disabled');
        button.classList.remove('disabled');
    }
  };
}());
