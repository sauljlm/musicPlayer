const Singleton = (function () {
    let playing = 0;

    let instance = null;
    let songs = [
      {
        title: "rockstar",
        artist: "Post Malone",
        cover: "rockstarCover.jpg",
        linkAudio: "rockstar.mp3",
        year: "2016",
        start: false
      },
      {
        title: "Adan y Eva",
        artist: "Paulo Londra",
        cover: "adanYevaCover.jpg",
        linkAudio: "Adan_y_Eva.mp3",
        year: "2019",
        start: false
      },
      {
        title: "believer",
        artist: "Imagine Dragons",
        cover: "believerCover.jpg",
        linkAudio: "Believer.mp3",
        year: "2017",
        start: false
      },
      {
        title: "gansta's parade",
        artist: "Coolio",
        cover: "ganstaCover.jpg",
        linkAudio: "gansta's_paradice.mp3",
        year: "1995",
        start: false
      },
      {
        title: "Panda",
        artist: "Desiigner",
        cover: "pandaCover.jpg",
        linkAudio: "panda.mp3",
        year: "2015",
        start: false
      },
      {
        title: "Without Me",
        artist: "Halsey",
        cover: "withoutMeCover.jpg",
        linkAudio: "Without_Me.mp3",
        year: "2018",
        start: false
      }
    ];

    let playList = [];

    return class Singleton {
        constructor () {
            this._audio = null;
            this.playing = false;
            this.cover = null;
            this.contCover = document.querySelector('.js-cover');
           
            if(!instance) {
                // this.getStorage();
                instance = this;
            }
            return instance;

        }

        set audio(data) {
            if (!data){
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

        set setPlaying(value) {
          this.playing = value;
          //console.log(playing);
        }

        setCover() {
          document.body.style.backgroundImage = `url(../img/${songs[playing].cover})`;
          this.contCover.style.backgroundImage = `url(../img/${songs[playing].cover})`;
        }

        /**
         * Load the song
         */
        getSong (index) {
          this.setCover();
          if (index) {
            return `songs/${songs[index].linkAudio}`;
          } else {
            return `songs/${songs[playing].linkAudio}`;
          }
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
        }

        changeIco(btnPlaypase) {
          if (!btnPlaypase) {
            throw new Error(`Invalid btn is not a HTMLbtnElement: ${btnPlaypase}`);
          }
          if(this.playing) {
            btnPlaypase.classList.add('btn-play');
            btnPlaypase.classList.remove('btn-pause');
          } else {
            btnPlaypase.classList.remove('btn-play');
            btnPlaypase.classList.add('btn-pause');
          }
        }

                /**
         * Drop event handler
         * @param {Event} event
         * @returns {boolean}
         */
        drop (event) {
          let id = event.dataTransfer.getData('text');
          let todo = this.data.get(id);
          if(!todo) return false;

          // toggle the todo done status
          this.data.toggleItem(todo);

          // remove the element on the current list
          todo.element.parentNode.removeChild(todo.element);

          // add the todo
          this.addTodo(todo);
        }

        /**
         * Dragover event handler
         * @param {Event} event
         */
        dragover (event) {
            event.preventDefault()
        }

        /**
         * Dragstart
         * @param {Event} event
         */
        dragstart (event) {
            let id = event.target.getAttribute('data-id');
            event.dataTransfer.setData('text', id);
        }
    }
})();
