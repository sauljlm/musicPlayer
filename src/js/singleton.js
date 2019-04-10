const Singleton = (function () {
  let playing = 0;
  let instance = null;
  let songs = [
    {
      title: 'rockstar',
      artist: 'Post Malone',
      album: 'Beerbongs & Bentleys',
      cover: 'rockstarCover.jpg',
      linkAudio: 'https://sauljlm.github.io/songs/rockstar.mp3',
      year: '2016',
      started: false,
      dataSong: 'rockstar',
    },
    {
      title: 'Adan y Eva',
      artist: 'Paulo Londra',
      album: "Hit's Spring! 2019",
      cover: 'adanYevaCover.jpg',
      linkAudio: 'https://sauljlm.github.io/songs/Adan%20y%20Eva.mp3',
      year: '2019',
      started: false,
      dataSong: 'Adan y Eva',
    },
    {
      title: 'believer',
      artist: 'Imagine Dragons',
      album: 'Evolve',
      cover: 'believerCover.jpg',
      linkAudio: 'https://sauljlm.github.io/songs/Believer.mp3',
      year: '2017',
      started: false,
      dataSong: 'believer',
    },
    {
      title: "gangsta's paradise",
      artist: 'Coolio',
      album: "Gangsta's Paradise",
      cover: 'ganstaCover.jpg',
      linkAudio: "https://sauljlm.github.io/songs/gansta's%20paradice.mp3",
      year: '1995',
      started: false,
      dataSong: "gangsta's paradise",
    },
    {
      title: 'Panda',
      artist: 'Desiigner',
      album: 'Panda',
      cover: 'pandaCover.jpg',
      linkAudio: 'https://sauljlm.github.io/songs/panda.mp3',
      year: '2015',
      started: false,
      dataSong: 'Panda',
    },
    {
      title: 'Without Me',
      artist: 'Halsey',
      album: 'Eastside',
      cover: 'withoutMeCover.jpg',
      linkAudio: 'https://sauljlm.github.io/songs/Without%20Me.mp3',
      year: '2018',
      started: false,
      dataSong: 'Without Me',
    },
  ];
  let playList = [];

  return class Singleton {
    constructor() {
      this.AUDIO = null;
      this.playing = false;
      this.cover = null;
      this.contCover = document.querySelector('.js-cover');
      if (!instance) {
        instance = this;
      }
      return instance;
    }

    set audio(data) {
      if (!data) {
        throw new Error(`Invalid set audio is not a HTMLaudioElement: ${data}`);
      }
      this.AUDIO = data;
    }

    /**
     * return array songs
     */
    get songsDATA () {
      return songs;
    }

    /**
     * return array playList
     */
    get playListDATA () {
      return playList;
    }

    /**
     * push playlist
     *  @param {object} value
     */
    set setPlayList (value) {
      playList.push(value);
    }

      /**
     * push list
     *  @param {object} value
     */
    set setlist (value) {
      songs.push(value);
    }

    /**
     * set playing
     *  @param {number} value
     */
    set setPlaying(value) {
      console.log(value);
      this.playing = value;
    }

    setCover(index = playing) {
      if (this.playing === false) {
        document.body.style.backgroundImage = "url('img/default.jpg')";
        this.contCover.style.backgroundImage = "url('img/default.jpg')";
      } else {
        document.body.style.backgroundImage = `url(img/${playList[index].cover})`;
        this.contCover.style.backgroundImage = `url(img/${playList[index].cover})`;
      }
    }

    /**
     * Load the song
     *  @param {number} index
     */
    getSong(index) {
      this.setCover();

      if (index) {
        return `${playList[index].linkAudio}`;
      }
      return `${playList[playing].linkAudio}`;
    }

    initSong(dataSong) {
      this.AUDIO.setAttribute('src', `${this.getSong(dataSong)}`);
      this.setPlaying = false;
      this.togglePlay();
      // this.changeIco();
      this.setCover(dataSong);
    }

    /**
     * play the audio
     */
    play() {
      this.AUDIO.play();
      this.playing = true;
    }

    /**
     * pause the audio
     */
    pause() {
      this.AUDIO.pause();
      this.playing = false;
    }

    next() {
      if (playing >= songs.length - 1) {
        playing = 0;
      } else {
        playing += 1;
      }
      this.AUDIO.setAttribute('src', `${this.getSong()}`);
      if (this.playing === true) {
        this.playing = true;
        this.play();
      } else {
        this.playing = false;
        this.pause();
      }
    }

    back() {
      if (playing === 0) {
        playing = songs.length - 1;
      } else {
        playing -= 1;
      }
      this.AUDIO.setAttribute('src', `${this.getSong()}`);
      if (this.playing === true) {
        this.playing = true;
        this.play();
      } else {
        this.playing = false;
        this.pause();
      }
    }

    /**
     * toggle play/pause
     */
    togglePlay() {
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
    }

    /**
     * change icon of button
     * @param {HTMLButtonElement} button
     */
    changeIco(btnPlaypase) {
      if (this.playing) {
        btnPlaypase.classList.add('btn-play');
        btnPlaypase.classList.remove('btn-pause');
      } else {
        btnPlaypase.classList.remove('btn-play');
        btnPlaypase.classList.add('btn-pause');
      }
    }
  }
}());
