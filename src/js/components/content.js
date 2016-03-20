import React from 'react'

const Article = React.createClass({
  render () {
    return (
      <a href={this.props.url} target='_blank'>
        <div className='ui floating icon message'>
          <i className='linkify icon'></i>
          <div className='content'>
            <p>{this.props.url}</p>
          </div>
        </div>
      </a>
    )
  }
})

const Image = React.createClass({
  render () {
    return (
      <div className='ui raised segment'>
        <img src={this.props.url} />
      </div>
    )
  }
})

const Vimeo = React.createClass({
  render () {
    let vimeoID = this.props.url.replace(/http(s)?:\/\/(www.)?vimeo.com\//g, '')
    let vimeoUrl = `https://player.vimeo.com/video/${vimeoID}`
    return (
      <div className='ui raised segment'>
        <iframe
          src={vimeoUrl}
          width='500'
          height='281'
          frameborder='0'
          webkitAllowFullScreen
          mozAllowFullScreen
          allowFullScreen
        ></iframe>
      </div>
    )
  }
})

const YouTube = React.createClass({
  render () {
    let youtubeID = this.props.url.replace(/http(s)?:\/\/(www.)?youtu(.)?be(.com)?\/(watch\?v=)?/g, '')
    let youtubeUrl = `https://www.youtube.com/embed/${youtubeID}`
    return (
      <div className='ui raised segment'>
        <iframe
          width='560'
          height='315'
          src={youtubeUrl}
          frameBorder='0'
          allowFullScreen
        ></iframe>
      </div>
    )
  }
})

export default function createContent (type, url) {
  switch (type) {
    // case 'image':
    //   return <Image url={url} />
    // case 'vimeo':
    //   return <Vimeo url={url} />
    // case 'youtube':
    //   return <YouTube url={url} />
    default:
      return <Article url={url} />
  }
}
