import React, { PropTypes } from 'react';
import smoothScroll from 'smoothscroll';
import { Link } from 'react-router';

class Video extends React.Component {
  constructor(props) {
    super();
    this.domMap = {
      body: document.querySelector('body'),
    };
    this.toggleIntroView = this.toggleIntroView.bind(this);
    this.onVideoClick = this.onVideoClick.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
    this.scrollSection = this.scrollSection.bind(this);
  }

  init() {
    this.refs.video.addEventListener('ended', this.scrollSection);
  }

  scrollSection() {
    const vid = this.refs.video;
    const section = document.querySelector('.oils-slider');

    if (!vid.paused) {
      this.domMap.body.classList.remove('js-video--playing');
      vid.pause();
    }
    if (!this.domMap.body.classList.contains('js-oils-inview')) {
      smoothScroll(section);
      setTimeout(() => {
        this.domMap.body.classList.add('js-oils-inview');
      }, 400);
    }
  }

  scrollParent() {
    const section = this.refs.video;
    smoothScroll(section);
    setTimeout(() => {
      this.domMap.body.classList.remove('js-oils-inview');
    }, 400);
  }

  toggleVideo() {
    const vid = this.refs.video;
    const vidC = this.refs.frontVid;

    if (vid.paused && vid.currentTime >= 0) {
      vid.play();
    } else {
      vid.pause();
      this.domMap.body.classList.remove('js-video--playing');
    }
  }

  toggleIntroView() {
    if (this.domMap.body.classList.contains('js-video--playing')) {
      this.domMap.body.classList.remove('js-video--playing');
    } else {
      this.domMap.body.classList.add('js-video--playing');
    }
  }

  onVideoClick() {
    this.toggleIntroView();
    this.toggleVideo();
  }

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      this.scrollSection();
    } else {
      this.scrollParent();
    }
  }

  rawMarkup(markup) {
    return { __html: markup };
  }

  render() {
    let video, styles, vid;
    if (this.props.data.video) {
      video = this.props.data.video[0];
      styles = {
        backgroundImage: `url('${this.props.s3Path}${video.placeholder.filename}')`,
      };
      vid = `${this.props.s3Path}${video.video.filename}`;
    }
    return (
      <section className="c-section c-section--intro">
        <div ref={'frontVid'} className="c-frontVid full-height">
          <div className="frontVid__placeholder">
            <div className="frontVid__placeholder__logo"></div>
            <div className="frontVid__placeholder__img" style={ styles }></div>
            <span onClick={this.onVideoClick} className="frontVid__playBtn">PLAY</span>
          </div>
          <video ref={'video'} onClick={ this.toggleVideo }
            className="frontVid__video" src={ vid }></video>
        </div>
        <Link to="/oils" className="section__skipLink section__skipLink--intro">
          <i className="fa fa-angle-down"></i>
        </Link>
      </section>
    );
  }
}

Video.defaultProps = {
  data: [],
  s3Path: 'https://s3.amazonaws.com/eytyy.com/resources/front-video/',
};

export default Video;
