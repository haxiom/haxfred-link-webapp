import React from 'react'
import moment from 'moment'
import marked from  'marked'
import createContent from './content'

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
		let linkNodes = this.props.data.reverse().map((link) => {
      let profileImage = `/users/images/${link.user.toLowerCase()}`
      if (!link.url) return <div key={link.id}></div>

      return (
        <Link
          key={link.id}
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
  loadLinksFromServer () {
    fetch('http://benicio.haxiom.io/api/links').then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data[0])
      this.setState({ data })
    });
  },
  getInitialState () {
    return {data: []}
  },
  componentDidMount () {
    this.loadLinksFromServer();
  },
	render () {
    return (
      <LinkList data={this.state.data} />
    )
  }
})

export default LinkContainer
