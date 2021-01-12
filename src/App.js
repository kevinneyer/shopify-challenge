import React from 'react'
import Home from './Components/home'
import { Jumbotron, Row, Col, Container } from 'react-bootstrap';
import logo  from './assets/logo.png'


const App = () => {
  return (
    <div>
      <Jumbotron className='jumbo'> 
      <Container>
      <Row>
        <Col>
        {/* <img className='logo' src={logo} alt='logo'></img> */}
        <h1 className='header'>
          <img className='logo' src={logo} alt='logo'></img>
          The Shoppies
        </h1>
        </Col>
        </Row>
        </Container> 
      </Jumbotron>
      <Home />
    </div>
  )
}

export default App
