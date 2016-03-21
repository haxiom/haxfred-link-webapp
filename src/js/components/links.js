import React from 'react'
import moment from 'moment'
import marked from  'marked'
import throttle from 'lodash/throttle'
import createContent from './content'
import events from '../lib/events'

let body = document.body
let html = document.documentElement
const SCROLL_THROTTLE_TIME = 15
const NUMBER_OF_LINKS_TO_FETCH = 5

function generateLabel(type) {
  switch (type) {
    case 'youtube':
      return 'a YouTube video'
    case 'vimeo':
      return 'a Vimeo video'
    case 'image':
      return 'an image'
    default:
      return 'a link'
  }
}

const Link = React.createClass({
  rawCaption: function () {
    var rawMarkup = marked(this.props.caption.toString(), { sanitize: true })
    return { __html: rawMarkup }
  },
  render () {
    let content = createContent(this.props.type, this.props.url)
    let date = moment(this.props.date).fromNow()

    return (
      <div className="event">
        <div className="label">
          <img src={this.props.profileImage} />
        </div>
        <div className="content">
          <div className="summary">
            {this.props.author} posted {generateLabel(this.props.type)}
            <div className="date">{date}</div>
          </div>
          <div className="extra text">
            <p dangerouslySetInnerHTML={this.rawCaption()} />
            {content}
          </div>
        </div>
      </div>
    )
  }
})

const LinkList = React.createClass({
  render () {
		let linkNodes = this.props.links.map((link, index) => {
      let profileImage = `/users/images/${link.user.toLowerCase()}`
      if (!link.url) return <div key={link.id}></div>

      return (
        <Link
          key={index}
          author={link.user}
          profileImage={profileImage}
          type={link.type}
          url={link.url}
          caption={link.caption}
          date={link.postDate}
        />
      )
    })

    return (
      <div className='ui feed'>
        {linkNodes}
      </div>
    )
  }
})

const LinkContainer = React.createClass({
  loadLinksFromServer (offset) {
    let domain = 'http://benicio.haxiom.io/api/links'
    let endpoint = `${domain}?_offset=${offset}&_limit=${NUMBER_OF_LINKS_TO_FETCH}&_order=createdAt%20DESC`
    fetch(endpoint).then((response) => {
      return response.json()
    }).then((data) => {
      let links = this.state.links.concat(data)
      this.setState({ links })
    }).catch((err) => {
      console.error(err)
    });
  },
  calculateDocumentHeight () {
    let height = Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
    )

    return {
      scroll: window.scrollY + window.innerHeight,
      height
    }
  },
  handleScroll () {
    let doc = this.calculateDocumentHeight();
    let offset = Math.floor(doc.height * 0.2);

    if (doc.scroll + offset >= doc.height) {
      events.emit('requestLinks');
    }
  },
  getInitialState () {
    return {links: []}
  },
  componentDidMount () {
    let linksOffset = 0


    this.loadLinksFromServer(linksOffset);
    window.addEventListener('scroll', throttle(this.handleScroll, SCROLL_THROTTLE_TIME))
    events.on('requestLinks', () => {
      linksOffset  = linksOffset + NUMBER_OF_LINKS_TO_FETCH
      this.loadLinksFromServer(linksOffset);
    })
  },
	render () {
    return (
      <LinkList links={this.state.links} />
    )
  }
})

export default LinkContainer
