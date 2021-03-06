import React, { Component } from "react";
import albumData from "./../data/albums";
import PlayerBar from "./PlayerBar.js";
import "./../album.css";

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
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

    this.audioElement = document.createElement("audio");
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
        this.setState({ currentVolume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener(
      "timeupdate",
      this.eventListeners.timeUpdate
    );
    this.audioElement.addEventListener(
      "durationchange",
      this.eventListeners.durationChange
    );
    this.audioElement.addEventListener(
      "volumechange",
      this.eventListeners.volumeChange
    );
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener(
      "timeupdate",
      this.eventListeners.timeUpdate
    );
    this.audioElement.removeEventListener(
      "durationchange",
      this.eventListeners.durationChange
    );
    this.audioElement.removeEventListener(
      "volumechange",
      this.eventListeners.volumeChange
    );
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
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
      if (!isSameSong) {
        this.setSong(song);
      }
      this.play();
    }
  }

  handleSongHover(song) {
    console.log("hoverred");
    this.setState({ isHovering: true });
  }

  handleSongLeave(song) {
    console.log("unhoverred");
    this.setState({ isHovering: false });
  }

  displayIcon(song) {
    let className = "";

    if (this.state.isHovering) {
      if (this.state.currentSong !== song) {
        return (className = "icon ion-md-play");
      }
      if (!this.state.isPlaying) {
        return (className = "icon ion-md-play");
      }
      if (this.state.isPlaying && this.state.currentSong === song) {
        return (className = "icon ion-md-pause");
      }

      if (this.state.isPlaying && this.state.currentSong !== song) {
        return (className = "icon ion-md-play");
      }
    }

    if (!this.state.isHovering) {
      if (this.state.isPlaying && this.state.currentSong === song) {
        return (className = "icon ion-md-pause");
      }
    }
  }

  handlePrevClick(song) {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick(song) {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.min(
      this.state.album.songs.length - 1,
      currentIndex + 1
    );
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
      const seconds = totalSeconds % 60;
      const wholeSecond = Math.floor(seconds);
      return minutes + ":" + wholeSecond;
    }
  }

  render() {
    return (
      <section
        className="album"
        style={{ backgroundImage: "url(" + this.state.album.albumCover + ")" }}
      >
        <section className="bg" />
        <section id="empty-space" />
        <section id="album-info">
          <img
            id="album-cover-art"
            src={this.state.album.albumCover}
            alt={this.state.album.title}
          />
          <p id="album-title">{this.state.album.title}</p>
          <p className="artist">
            {this.state.album.artist} - {this.state.album.releaseInfo}
          </p>
          <div id="release-info" />
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {this.state.album.songs.map((song, index) => (
              <tr
                className="song"
                key={index}
                onClick={() => this.handleSongClick(song)}
                onMouseEnter={e => this.handleSongHover(song)}
                onMouseLeave={e => this.handleSongLeave(song)}
              >
                <td>
                  <button>
                    <span id="number" className={this.displayIcon(song)}>
                      {index + 1}
                    </span>

                    {/* {this.state.isHovering &&
                    this.state.currentSong === song ? (
                      <span className="icon ion-md-play" />
                    ) : (
                      ""
                    )} */}
                    {/* {this.state.currentSong === song ? (
                      <span className="icon ion-md-pause" />
                    ) : (
                      ""
                    )}
                 */}
                  </button>
                </td>
                <td id="song-title">{song.title}</td>
                <td id="song-duration">{this.formatTime(song.duration)}</td>
              </tr>
            ))}
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
          handleTimeChange={e => this.handleTimeChange(e)}
          handleVolumeChange={e => this.handleVolumeChange(e)}
          formatTime={e => this.formatTime(e)}
        />
      </section>
    );
  }
}

export default Album;
