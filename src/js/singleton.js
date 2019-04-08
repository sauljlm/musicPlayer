const Singleton = (function () {
    let playing = 0;
    const SONGS_URL = 'songs';

    // const PREFIX = 'song_data';
    let instance = null;
    let songs = [
      {
        title: "rockstar",
        artist: "Post Malone",
        cover: "../img/rockstarCover.jpg",
        linkAudio: "rockstar.mp3",
        year: "2016",
        start: false
      },
      {
        title: "Adan y Eva",
        artist: "Paulo Londra",
        cover: "../img/adanYevaCover.jpg",
        linkAudio: "Adan_y_Eva.mp3",
        year: "2019",
        start: false
      },
      {
        title: "believer",
        artist: "Imagine Dragons",
        cover: "../img/believerCover.jpg",
        linkAudio: "Believer.mp3",
        year: "2017",
        start: false
      },
      {
        title: "gansta's parade",
        artist: "Coolio",
        cover: "../img/ganstaCover.jpg",
        linkAudio: "gansta's_paradice.mp3",
        year: "1995",
        start: false
      },
      {
        title: "Panda",
        artist: "Desiigner",
        cover: "../img/pandaCover.jpg",
        linkAudio: "panda.mp3",
        year: "2015",
        start: false
      },
      {
        title: "Without Me",
        artist: "Halsey",
        cover: "../img/withoutMeCover.jpg",
        linkAudio: "Without_Me.mp3",
        year: "2018",
        start: false
      }
    ];

    return class Singleton {

        constructor () {
            this._audio = null;
            this.playing = false;

            if(!instance) {
                // this.getStorage();
                instance = this;
            }
            return instance;

        }

        set audio(data) {
            this._audio = data;
        }

        /**
         * Load the song
         */
        getSong () {
            return `${SONGS_URL}/${songs[playing].linkAudio}`;
        }

        /**
         * play the audio
         */
        play () {
            this._audio.play();
            this.playing = true;
        }

        /**
         * pause the audio
         */
        pause () {
            this._audio.pause();
            this.playing = false;
        }

        next () {
          if (playing >= songs.length - 1) {
            playing = 0;
          } else {
            playing += 1;
          }
          this._audio.setAttribute('src', `${this.getSong()}`);
          if(this.playing === true) {
            this.playing = true;
            this.play();
          } else {
            this.playing = false;
            this.pause();
          }
        }

        back () {
          if (playing === 0) {
            playing = songs.length - 1;
          } else {
            playing -= 1;
          }
          this._audio.setAttribute('src', `${this.getSong()}`);
          if(this.playing === true) {
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
        togglePlay () {
            if(this.playing) {
              this.pause();
            } else {
              this.play();
            }
            console.log(this.playing);
            // this.changeIco();
        }


        changeIco(btnPlaypase) {
          if(this.playing) {
            btnPlaypase.classList.add('btn-play');
            btnPlaypase.classList.remove('btn-pause');
          } else {
            btnPlaypase.classList.remove('btn-play');
            btnPlaypase.classList.add('btn-pause');
          }
        }
    }
})();
