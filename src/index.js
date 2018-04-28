import React from 'react'
import ReactDOM from 'react-dom'

import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import { Row } from './Layout'

const site = {
  name: "The Incrementalist"
}

const Incrementalist = () => {
  return (
    <div>
      <Row>
        <Header title={site.name}/>
      </Row>
      <Row>
        <Content />
      </Row>
      <Row>
        <Footer />
      </Row>
    </div>
  )
}

ReactDOM.render(<Incrementalist />, document.getElementById('Incrementalist'))
