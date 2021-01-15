import React from 'react'
import Home from './Components/home'
import { Jumbotron } from 'react-bootstrap';
import logo  from './assets/logo.png'

const App = () => {
  return (
    <div  className='app'>
      <Jumbotron className='jumbo'> 
        <h1 className='header'>
          <img className='logo' src={logo} alt='logo'></img>
          The Shoppies
        </h1>
      </Jumbotron>
      <Home />
    </div>
  )
}

export default App
