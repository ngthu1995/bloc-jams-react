import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './../library.css'

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return (
      <section className="library">
        <section id="empty-space"></section>
        <div className="row">
          {
            this.state.albums.map( (album, index) => 
              <div className="column">
                <Link to={`/album/${album.slug}`} key={index}>
                  <img src={album.albumCover} alt={album.title} />
                  <div>{album.title}</div>
                  <div>{album.artist}</div>
                  <div>{album.songs.length} songs</div>
                </Link>
              </div>
            )
          }
        </div>
      </section>
    )
  }
}

export default Library;