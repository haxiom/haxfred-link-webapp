import React from 'react'

const Article = React.createClass({
  render () {
    return (
      <a href={this.props.url} target='_blank'>
        <div className='ui floating icon message'>
          <i className="linkify icon"></i>
          <div className="content">
            <p>{this.props.url}</p>
          </div>
        </div>
      </a>
    )
  }
})

export default function createContent (type, url) {
  switch(type) {
    default:
      return <Article url={url} />
  }
}
