const Player = (function () {

  return class Player {
    constructor(contAudio) {
      this.contAudio = document.querySelector(contAudio);
      this.contNav = document.querySelector('#cont-nav');
      this.contAllSongs = document.querySelector('#allSongs');
      this.contPlayList = document.querySelector('#playList');
      this.contCover = document.querySelector('.js-cover');
      this.ulPlayList = null;
      this.ulList = null;
      this.dragged = null;
      this.btnPlaypase = null;
      this.AUDIO = null;
      this.singleton = new Singleton();
      this.compose();
      this.dragAndDrop();
    }

    compose() {
      this.AUDIO = this.audio();
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

      this.contAudio.appendChild(this.AUDIO);
      this.contNav.appendChild(btnBack);
      this.contNav.appendChild(btnPlaypase);
      this.contNav.appendChild(btnNext);
      this.contAllSongs.appendChild(allSongs);
      this.contPlayList.appendChild(playList);

      this.singleton.audio = this.AUDIO;
    }

    allSongs() {
      const container = document.createElement('ul');
      container.setAttribute('class', 'allsongs');
      container.setAttribute('id', 'div1');

      this.ulList = container;
      this.composeList(container);

      return container;
    }

    playList() {
      const container = document.createElement('ul');
      container.setAttribute('class', 'playList');
      container.setAttribute('id', 'div2');

      this.ulPlayList = container;
      this.composePlayList(container);

      return container;
    }

    composeList(container = this.ulList) {
      const songs = this.singleton.songsDATA;
      this.clear(container);
      songs.forEach((song, index) => {
        const row = document.createElement('li');
        const star = document.createElement('button');
        star.setAttribute('class', 'star starDefault');

        row.addEventListener('click', () => {
          this.AUDIO.setAttribute('src', `${this.singleton.getSong(index)}`);
          this.singleton.setPlaying = false;
          this.singleton.changeIco(this.btnPlaypase);
          this.singleton.togglePlay();
          this.singleton.setCover(index);
        });

        row.setAttribute('id', `${index}`);
        row.setAttribute('class', 'song clearfix');
        row.setAttribute('draggable', 'true');
        row.setAttribute('ondragstart', 'event.dataTransfer.setData("text/plain",null)');

        row.innerHTML = `${song.title}`;

        row.appendChild(star);
        container.appendChild(row);
      });
    }

    clear(container) {
      container.innerHTML = '';
    }

    composePlayList(container = this.ulPlayList) {
      const songs = this.singleton.playListDATA;
      this.clear(container);
      songs.forEach((song, index) => {
        const row = document.createElement('li');
        const star = document.createElement('button');
        star.setAttribute('class', 'star starDefault');

        row.addEventListener('click', () => {
          this.AUDIO.setAttribute('src', `${this.singleton.getSong(index)}`);
          this.singleton.setPlaying = false;
          this.singleton.changeIco(this.btnPlaypase);
          this.singleton.togglePlay();
          this.singleton.setCover(index);
        });

        row.setAttribute('id', `${index}`);
        row.setAttribute('class', 'song clearfix');
        row.setAttribute('draggable', 'true');

        row.innerHTML = `${song.title}`;

        row.appendChild(star);
        container.appendChild(row);
      });
    }

    audio() {
      const audio = new Audio();
      audio.setAttribute('controls', '');
      audio.setAttribute('class', 'clearfix');

      audio.addEventListener('ended', () => {
        this.singleton.next();
      });

      this.singleton.setCover();
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
    disableButton (button) {
      if(!(button instanceof HTMLButtonElement))
          throw new Error(`Invalid button is not a HTMLButtonElement: ${button}`);

      button.setAttribute('disabled', '');
      button.classList.add('disabled');
    }

    /**
     * Disable a button
     * @param {HTMLButtonElement} button
     */
    enableButton(button) {
      if (!(button instanceof HTMLButtonElement)) {
        throw new Error(`Invalid button is not a HTMLButtonElement: ${button}`);
      }
      button.removeAttribute('disabled');
      button.classList.remove('disabled');
    }

    dragAndDrop() {
      document.addEventListener('dragstart', function drag (event) {
        this.dragged = event.target;
      });

      document.addEventListener('dragover', function dragover(event) {
        event.preventDefault();
      });

      document.addEventListener('drop', function drop(event) {
        const id = this.dragged.getAttribute('id');
        const songs = singleton.songsDATA;
        const playList = singleton.playListDATA;

        if (event.target.className === 'playList') {
          console.log('playList');
          singleton.setPlayList = songs[id];
          songs.splice(id, 1);

          player.composePlayList();
          player.composeList();
        }

        if (event.target.className === 'allsongs') {
          console.log('List');
          singleton.setlist = playList[id];
          playList.splice(id, 1);
          console.log(id);

          player.composePlayList();
          player.composeList();
        }
      });
    }
  };
}());
