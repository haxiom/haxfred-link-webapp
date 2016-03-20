import React from 'react'

const Article = React.createClass({
  render () {
    return (
      <a href={this.props.url} target='_blank'>
        <h4>{this.props.url}</h4>
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
