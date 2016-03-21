import React from 'react'

import HaxfredCard from './card'
import Links from './links'

const Container = React.createClass({
  render: function () {
    return (
      <div className='ui container two column stackable grid'>
        <div className='ui five wide column'>
          <HaxfredCard />
        </div>
        <div id='links' className='ui eleven wide column'>
          <Links />
        </div>
      </div>
    )
  }
})

export default Container
