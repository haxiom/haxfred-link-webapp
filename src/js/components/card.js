import React from 'react'

const MetaSpan = React.createClass({
  render () {
    return (
      <div className='meta'>
        <span className={this.props.type}>{this.props.value}</span>
      </div>
    )
  }
})

const Card = React.createClass({
  render () {
    let metaNodes = this.props.meta.map((meta, index) => {
      return <MetaSpan key={index} type={meta.type} value={meta.value} />
    })

    return (
      <div id={this.props.id} className='ui card'>
        <div className='image'>
          <img src={this.props.image} />
        </div>
        <div className='content'>
          <a className='header'>{this.props.name}</a>
          {metaNodes}
          <div className='description'>
            {this.props.description}
          </div>
        </div>
      </div>
    )
  }
})

const HaxfredCard = React.createClass({
  render () {
    let metaData = [{
      type: 'date',
      value: 'Born July 11th, 2013'
    }]

    return (
      <Card
        id='haxfred-card'
        name='Haxfred'
        meta={metaData}
        description='Haxfred is your friendly neighborhood #Haxiom bot'
        image='/images/haxfred.jpg'
      />
    )
  }
})

export default HaxfredCard
