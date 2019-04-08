const Player = (function () {

  return class Player {
    constructor(contAudio, singleton) {
      this.contAudio = document.querySelector(contAudio);
      this.contNav = document.querySelector('#cont-nav');
      this.contAllSongs = document.querySelector('#allSongs');
      this.contPlayList = document.querySelector('#playList');
      this.contCover = document.querySelector('.js-cover');
      this._audio = null;
      this.singleton = singleton;
      this.compose();
    }

    compose() {
      this._audio = this.audio();
      const btnPlaypase = this.btn('class', 'btn-play');
      const btnBack = this.btn('class', 'btn-back');
      const btnNext = this.btn('class', 'btn-next');
      const allSongs = this.allSongs();
      const playList = this.playList();

      btnPlaypase.addEventListener('click', () => {
        this.singleton.changeIco(btnPlaypase);
        this.singleton.togglePlay();
      });
      btnBack.addEventListener('click', () => {
        this.singleton.back();
      });
      btnNext.addEventListener('click', () => {
        this.singleton.next();
      });

      this.contAudio.appendChild(this._audio);
      this.contNav.appendChild(btnBack);
      this.contNav.appendChild(btnPlaypase);
      this.contNav.appendChild(btnNext);
      this.contAllSongs.appendChild(allSongs);
      this.contPlayList.appendChild(playList);

      this.singleton.audio = this._audio;
    }

    allSongs() {
      const container = document.createElement('ul');
      container.setAttribute('class', 'allsongs dragable');
      this.composeList(container);
      
      return container;
    }

    playList() {
      const container = document.createElement('ul');
      container.setAttribute('class', 'playList dragable');
      this.composePlayList(container);
      
      return container;
    }

    composeList(container) {
      const songs = this.singleton.songsDATA;
      songs.forEach((song, index) => {
        const row = document.createElement('li');
        const star = document.createElement('button');
        star.setAttribute('class','star starDefault');

        row.setAttribute('id', `${index}`);
        row.setAttribute('class', 'song clearfix');
        row.innerHTML = `${song.title}`;
        row.appendChild(star);
        container.appendChild(row);
      });
    }

    composePlayList(container) {
      const songs = this.singleton.playListDATA;
      songs.forEach((song, index) => {
        const row = document.createElement('li');
        const star = document.createElement('button');
        star.setAttribute('class','star starDefault');

        row.setAttribute('id', `${index}`);
        row.setAttribute('class', 'song clearfix');
        row.innerHTML = `${song.title}`;
        row.appendChild(star);
        container.appendChild(row);
      });
    }

    audio() {
      const audio = document.createElement('audio');
      audio.setAttribute('src', `${this.singleton.getSong()}`);
      // audio.setAttribute('src', 'https://github.com/sauljlm/songs/blob/master/Adan%20y%20Eva.mp3');
      audio.setAttribute('controls', '');
      audio.setAttribute('class', 'clearfix');

      audio.addEventListener('ended', ()=> {
        this.singleton.next();
      });
      return audio;
    }

    btn(type = 'class', value) {
      const btn = document.createElement('button');
      if (!type && value) { 
        throw new Error(`Invalid class value is not a HTMLbtnElement: ${type} / ${value}`);
      } else {
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
