const Player = (function () {

  return class Player {
    constructor(contAudio, singleton) {
      this.contAudio = document.querySelector(contAudio);
      this.contNav = document.querySelector('#cont-nav');
      this.contAllSongs = document.querySelector('#allSongs');
      this.contPlayList = document.querySelector('#playList');
      this.contCover = document.querySelector('.js-cover');
      this.btnPlaypase = null;
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
      this.btnPlaypase = btnPlaypase;
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
      container.setAttribute('class', 'allsongs draggable');
      container.setAttribute('id', 'div1');

      container.addEventListener('drop', this.drop);
      container.addEventListener('dragover', this.dragover);

      this.composeList(container);

      return container;
    }

    playList() {
      const container = document.createElement('ul');
      container.setAttribute('class', 'playList draggable');
      container.setAttribute('id', 'div2');
      
      container.addEventListener('drop', this.drop);
      container.addEventListener('dragover', this.dragover);

      this.composePlayList(container);
      
      return container;
    }

    composeList(container) {
      const songs = this.singleton.songsDATA;
      songs.forEach((song, index) => {
        const row = document.createElement('li');
        const star = document.createElement('button');
        star.setAttribute('class', 'star starDefault');

        row.addEventListener('click', () => {
          this._audio.setAttribute('src', `${this.singleton.getSong(index)}`);
          this.singleton.setCover(index);
          this.singleton.setPlaying = false;
          this.singleton.changeIco(this.btnPlaypase);
          this.singleton.togglePlay();
        });
        
        row.setAttribute('id', `${index}`);
        row.setAttribute('class', 'song clearfix');
        row.draggable = true;
        row.innerHTML = `${song.title}`;
        
        row.addEventListener('dragstart', this.drag);

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
      const audio = new Audio();
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
      if (!(button instanceof HTMLButtonElement)) {
        throw new Error(`Invalid button is not a HTMLButtonElement: ${button}`);
      }
      button.removeAttribute('disabled');
      button.classList.remove('disabled');
    }

    /*
    drag(event) {
      let id = event.target.getAttribute('id');
      event.dataTransfer.setData('text', id);
    }

    drop(event) {
      event.preventDefault();
      let id = this.getAttribute('id');
      let item = document.querySelector(`[id = "${id}"]`);
      let data = event.dataTransfer.getData("text", id);
      //console.log(data);

      //this.add();
      
      //let clone = item.cloneNode(true);
      //clone.draggable = true;
      //clone.addEventListener('dragstart', this.drag);

      //item.appendChild(document.getElementById(data));
      //item.parentNode.removeChild(item);
    }

    dragover(event) {
      event.preventDefault();
    }

    add() {
      
      const songs = this.singleton.songsDATA;
      songs.forEach((song) => {
        console.log(song);
      });
      
    }
    */
  };
}());
