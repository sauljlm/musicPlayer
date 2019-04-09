const Singleton = (function () {
  let playing = 0;

  let instance = null;
  let songs = [
    {
      title: 'rockstar',
      artist: 'Post Malone',
      cover: 'rockstarCover.jpg',
      linkAudio: 'rockstar.mp3',
      year: '2016',
      started: false,
    },
    {
      title: 'Adan y Eva',
      artist: 'Paulo Londra',
      cover: 'adanYevaCover.jpg',
      linkAudio: 'Adan_y_Eva.mp3',
      year: '2019',
      started: false,
    },
    {
      title: 'believer',
      artist: 'Imagine Dragons',
      cover: 'believerCover.jpg',
      linkAudio: 'Believer.mp3',
      year: '2017',
      started: false,
    },
    {
      title: 'ganstas paradice',
      artist: 'Coolio',
      cover: 'ganstaCover.jpg',
      linkAudio: "gansta's_paradice.mp3",
      year: '1995',
      started: false,
    },
    {
      title: 'Panda',
      artist: 'Desiigner',
      cover: 'pandaCover.jpg',
      linkAudio: 'panda.mp3',
      year: '2015',
      started: false,
    },
    {
      title: 'Without Me',
      artist: 'Halsey',
      cover: 'withoutMeCover.jpg',
      linkAudio: 'Without_Me.mp3',
      year: '2018',
      started: false,
    },
  ];
  let playList = [];

  return class Singleton {
    constructor() {
      this._audio = null;
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
      this._audio = data;
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

    set setPlayList (value) {
      playList.push(value);
    }

    set setPlaying(value) {
      this.playing = value;
    }

    setCover(index = playing) {
      if (this.playing === false) {
        document.body.style.backgroundImage = `url(../img/default.jpg})`;
        this.contCover.style.backgroundImage = `url(../img/default.jpg})`;
      }
      document.body.style.backgroundImage = `url(../img/${songs[index].cover})`;
      this.contCover.style.backgroundImage = `url(../img/${songs[index].cover})`;
    }

    /**
     * Load the song
     */
    getSong(index) {
      this.setCover();
      if (index) {
        return `songs/${songs[index].linkAudio}`;
      }
      return `songs/${songs[playing].linkAudio}`;
    }

    /**
     * play the audio
     */
    play() {
      this._audio.play();
      this.playing = true;
    }

    /**
     * pause the audio
     */
    pause() {
      this._audio.pause();
      this.playing = false;
    }

    next() {
      if (playing >= songs.length - 1) {
        playing = 0;
      } else {
        playing += 1;
      }
      this._audio.setAttribute('src', `${this.getSong()}`);
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
      this._audio.setAttribute('src', `${this.getSong()}`);
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

    changeIco(btnPlaypase) {
      if (!btnPlaypase) {
        throw new Error(`Invalid btn is not a HTMLbtnElement: ${btnPlaypase}`);
      }
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
