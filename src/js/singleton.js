const Singleton = (function () {
  let playing = 0;
  let instance = null;
  let songs = [
    {
      title: 'Boret',
      artist: 'Billie Eilish',
      album: 'Boret',
      cover: 'BoredCover.png',
      mp3: 'https://sauljlm.github.io/songs/Bored.mp3',
      wav: 'https://sauljlm.github.io/songs/Bored.wav',
      ogg: 'https://sauljlm.github.io/songs/Bored.ogg',
      year: '2017',
      started: false,
      dataSong: 'Boret',
    },
    {
      title: 'rockstar',
      artist: 'Post Malone',
      album: 'Beerbongs & Bentleys',
      cover: 'rockstarCover.jpg',
      mp3: 'https://sauljlm.github.io/songs/rockstar.mp3',
      wav: 'https://sauljlm.github.io/songs/rockstar.wav',
      ogg: 'https://sauljlm.github.io/songs/rockstar.ogg',
      year: '2016',
      started: false,
      dataSong: 'rockstar',
    },
    {
      title: 'Ocean Eyes',
      artist: 'Billie Eilish',
      album: 'ocean',
      cover: 'oceanEyesCover.jpg',
      mp3: 'https://sauljlm.github.io/songs/Ocean%20Eyes.mp3',
      wav: 'https://sauljlm.github.io/songs/Ocean%20Eyes.wav',
      ogg: 'https://sauljlm.github.io/songs/Ocean%20Eyes.ogg',
      year: '2017',
      started: false,
      dataSong: 'Ocean Eyes',
    },
    {
      title: 'Adan y Eva',
      artist: 'Paulo Londra',
      album: "Hit's Spring! 2019",
      cover: 'adanYevaCover.jpg',
      mp3: 'https://sauljlm.github.io/songs/Adan%20y%20Eva.mp3',
      wav: 'https://sauljlm.github.io/songs/Adan%20y%20Eva.wav',
      ogg: 'https://sauljlm.github.io/songs/Adan%20y%20Eva.ogg',
      year: '2019',
      started: false,
      dataSong: 'Adan y Eva',
    },
    {
      title: 'On Melancholy Hill',
      artist: 'Gorillaz',
      album: 'Plastic Beach',
      cover: 'OnMelancholy HillCover.jpg',
      mp3: 'https://sauljlm.github.io/songs/On%20Melancholy%20Hill.mp3',
      wav: 'https://sauljlm.github.io/songs/On%20Melancholy%20Hill.wav',
      ogg: 'https://sauljlm.github.io/songs/On%20Melancholy%20Hill.ogg',
      year: '2010',
      started: false,
      dataSong: 'Boret',
    },
    {
      title: 'believer',
      artist: 'Imagine Dragons',
      album: 'Evolve',
      cover: 'believerCover.jpg',
      mp3: 'https://sauljlm.github.io/songs/Believer.mp3',
      wav: 'https://sauljlm.github.io/songs/Believer.wav',
      ogg: 'https://sauljlm.github.io/songs/Believer.ogg',
      year: '2017',
      started: false,
      dataSong: 'believer',
    },
    {
      title: "gangsta's paradise",
      artist: 'Coolio',
      album: "Gangsta's Paradise",
      cover: 'ganstaCover.jpg',
      mp3: "https://sauljlm.github.io/songs/gansta's%20paradice.mp3",
      wav: "https://sauljlm.github.io/songs/gansta's%20paradice.wav",
      ogg: "https://sauljlm.github.io/songs/gansta's%20paradice.ogg",
      year: '1995',
      started: false,
      dataSong: "gangsta's paradise",
    },
    {
      title: 'tranz',
      artist: 'Gorillaz',
      album: 'Plastic Beach',
      cover: 'TranzCover.jpg',
      mp3: 'https://sauljlm.github.io/songs/Tranz.mp3',
      wav: 'https://sauljlm.github.io/songs/Tranz.mp3',
      ogg: 'https://sauljlm.github.io/songs/Tranz.mp3',
      year: '2018',
      started: false,
      dataSong: 'tranz',
    },
    {
      title: 'Panda',
      artist: 'Desiigner',
      album: 'Panda',
      cover: 'pandaCover.jpg',
      mp3: 'https://sauljlm.github.io/songs/panda.mp3',
      wav: 'https://sauljlm.github.io/songs/panda.wav',
      ogg: 'https://sauljlm.github.io/songs/panda.ogg',
      year: '2015',
      started: false,
      dataSong: 'Panda',
    },
    {
      title: 'i dont wannabe you any more',
      artist: 'Billie Eillish',
      album: 'Plastic Beach',
      cover: 'idontwannabeyouanymoreCover.jpg',
      mp3: 'https://sauljlm.github.io/songs/idontwannabeyouanymore.mp3',
      wav: 'https://sauljlm.github.io/songs/idontwannabeyouanymore.mp3',
      ogg: 'https://sauljlm.github.io/songs/idontwannabeyouanymore.mp3',
      year: '2016',
      started: false,
      dataSong: 'idontwannabeyouanymore',
    },
    {
      title: 'hostenage',
      artist: 'Gorillaz',
      album: 'Plastic Beach',
      cover: 'hostenageCover.jpg',
      mp3: 'https://sauljlm.github.io/songs/hostage.mp3',
      wav: 'https://sauljlm.github.io/songs/hostage.mp3',
      ogg: 'https://sauljlm.github.io/songs/hostage.mp3',
      year: '2016',
      started: false,
      dataSong: 'hostenage',
    },
    {
      title: 'Without Me',
      artist: 'Halsey',
      album: 'Eastside',
      cover: 'withoutMeCover.jpg',
      mp3: 'https://sauljlm.github.io/songs/Without%20Me.mp3',
      wav: 'https://sauljlm.github.io/songs/Without%20Me.wav',
      ogg: 'https://sauljlm.github.io/songs/Without%20Me.ogg',
      year: '2018',
      started: false,
      dataSong: 'Without Me',
    },
    {
      title: "when the party's over",
      artist: 'Billie Eillish',
      album: "when the party's over",
      cover: 'when-the-partys-over.jpg',
      mp3: "https://sauljlm.github.io/songs/when%20the%20party's%20over.mp3",
      wav: "https://sauljlm.github.io/songs/when%20the%20party's%20over.mp3",
      ogg: "https://sauljlm.github.io/songs/when%20the%20party's%20over.mp3",
      year: '2018',
      started: false,
      dataSong: "when the party's over",
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

    get playingDATA() {
      return playing;
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
      this.playing = value;
    }

    set songPlaying(value) {
      playing = value;
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
        return `${playList[index].mp3}`;
      }
      return `${playList[playing].mp3}`;
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
      player.songActive();
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
      player.songActive();
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
