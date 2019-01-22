import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar.js';


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug;
    });

    this.state = { 
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      isHovering: false,
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: 0.5
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }
  
  componentDidMount() {
    this.eventListeners = {
      timeUpdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationChange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumeChange: e => {
        this.setState({ currentVolume: this.audioElement.volume});
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeUpdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationChange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumeChange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeUpdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationChange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumeChange);
  }
  
  play() {
    this.audioElement.play();
    this.setState( { isPlaying: true} );
  };

  pause() {
    this.audioElement.pause()
    this.setState( { isPlaying: false} );
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); } 
      this.play();
    }
  }

  handleSongHover(song) {
    console.log('hoverred');
    this.setState( { isHovering: song } )
  }

  handleSongLeave(song) {
    console.log('unhoverred');
    this.setState( { isHovering: false } )
  }

  displayIcon(song) {
    let className = "";
    if (this.state.isHovering && song === this.state.currentSong) {
      return className = "icon ion-md-play";
    }
    if(this.state.isPlaying && song === this.state.currentSong) {
      return className = "icon ion-md-pause";
    }
  }

  handlePrevClick(song) {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex -1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick(song) {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min((this.state.album.songs.length - 1), currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
     this.audioElement.currentTime = newTime;
     this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ currentVolume: newVolume });
  }

  formatTime(totalSeconds) {
    if (isNaN(totalSeconds)) {
      return "-:--";
    } else {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds= totalSeconds % 60;
      const wholeSecond = Math.floor(seconds)
      return ( minutes + ":" + wholeSecond );
    }
  }

    render() {
      return (
        <section className="album">
          <section id="album-info">
            <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
         </section>
         <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>  
           <tbody>
              {this.state.album.songs.map( (song, index) => 
                <tr className="song" key={index} 
                  onClick={() => this.handleSongClick(song)} 
                  onMouseEnter={ () => this.handleSongHover(song) } 
                  onMouseLeave={ () => this.handleSongLeave(song) } >
                  <td >
                    <button>
                      <span className= {this.displayIcon(song)} > {index + 1} </span>
                      </button>
                  </td>
                  <td>{song.title}</td>
                  <td>{this.formatTime(song.duration)}</td>
                </tr>
             )}
           </tbody>
         </table>
         <PlayerBar 
            isPlaying={this.state.isPlaying} 
            currentSong={this.state.currentSong}
            currentTime={this.audioElement.currentTime}
            duration={this.audioElement.duration}
            currentVolume={this.audioElement.currentVolume}
            handleSongClick={() => this.handleSongClick(this.state.currentSong)}
            handlePrevClick={() => this.handlePrevClick()} 
            handleNextClick={() => this.handleNextClick()}
            handleTimeChange={(e) => this.handleTimeChange(e)} 
            handleVolumeChange={(e) => this.handleVolumeChange(e)}
            formatTime={(e) => this.formatTime(e)}
         />
        </section>
      );
    }
  }

export default Album;