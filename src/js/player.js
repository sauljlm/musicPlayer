const Player = (function () {

  const contSongs = document.querySelector('.js-songs'); 

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
      const navSongs = this.nav();

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

      contSongs.insertBefore(navSongs, this.contAllSongs);
      this.contAudio.appendChild(this.AUDIO);
      this.contNav.appendChild(btnBack);
      this.contNav.appendChild(btnPlaypase);
      this.contNav.appendChild(btnNext);
      this.contAllSongs.appendChild(allSongs);
      this.contPlayList.appendChild(playList);

      this.singleton.audio = this.AUDIO;

      this.disableButton(btnPlaypase);
      this.disableButton(btnBack);
      this.disableButton(btnNext);
    }

    nav() {
      const container = document.createElement('div');
      container.setAttribute('class', 'songs-header');

      const sortBy = document.createElement('select');
      sortBy.setAttribute('id', 'formSort');
      const optionDefault = this.option();
      optionDefault.setAttribute('selected','selected');
      optionDefault.innerHTML = 'Sor By'
      const option1 = this.option('artist');
      const option2 = this.option('songName');
      const option3 = this.option('year');
      const option4 = this.option('started');
      const option5 = this.option('album');

      const btnDelite = this.btn('class','js-delite');
      const btnEdit = this.btn('class', 'js-edit');
      this.disableButton(btnDelite);
      this.disableButton(btnEdit);
      btnDelite.setAttribute('class', 'delite');
      btnEdit.setAttribute('class', 'edit');
      btnDelite.innerHTML = 'Delite';
      btnEdit.innerHTML = 'Edit';

      const search = this.createSearch();

      sortBy.appendChild(optionDefault);
      sortBy.appendChild(option1);
      sortBy.appendChild(option2);
      sortBy.appendChild(option3);
      sortBy.appendChild(option4);
      sortBy.appendChild(option5);

      container.appendChild(sortBy);
      container.appendChild(btnDelite);
      container.appendChild(btnEdit);

      container.appendChild(search);

      return container;
    }

    option(value = ' ') {
      const option = document.createElement('option')
      option.setAttribute('value', `${value}`);
      if (value) {
        option.innerHTML = value;
      }
      return option;
    }

    createSearch() {
      const form = document.createElement('form');
      form.setAttribute('class', 'cont-search');

      const input = document.createElement('input');
      input.setAttribute('type', 'search');
      input.setAttribute('placeholder', 'Search');

      form.appendChild(input);

      return form;
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
        row.setAttribute('id', `${index}`);
        row.setAttribute('dataSong', `${songs[index].dataSong}`);
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
        row.setAttribute('id', `${index}`);
        row.setAttribute('dataSong', `${songs[index].dataSong}`);
        row.setAttribute('class', 'song clearfix');
        row.setAttribute('draggable', 'true');

        row.addEventListener('click', () => {
          singleton.initSong(index);
        });

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
      //if(!(button instanceof HTMLButtonElement))
      //    throw new Error(`Invalid button is not a HTMLButtonElement: ${button}`);
      button.setAttribute('disabled', '');
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
        const dataSong = this.dragged.getAttribute('dataSong');
        const songs = singleton.songsDATA;
        const playList = singleton.playListDATA;

        if (event.target.className === 'playList') {
          singleton.setPlayList = songs[id];

          player.composePlayList();
          songs.splice(id, 1);
          player.composeList();
          playList.forEach((element, index) => {
            if (element.dataSong === dataSong) {
              singleton.initSong(index);
            }
          });
        }

        if (event.target.className === 'allsongs') {
          singleton.setlist = playList[id];

          playList.splice(id, 1);
          player.composePlayList();
          player.composeList();
        }
      });
    }
  };
}());
