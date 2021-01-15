import React,  { useState, useEffect }from 'react'
import Movies from './movies'
import Nominations from './nominations'
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import FinishedModal from './finishedModal';

const Home = () => {

    const [ title, setTitle ] = useState('')
    const [ movies, setMovies ] = useState([])
    const [ nominations, setNominations ] = useState([])

    const titleHandler = (e) => {
        setTitle(e.target.value)
    }

    // useEffect(() => {
    //     setNominations(nominations)
    // },[nominations])
    
    const submitHandler = (e) => {
        e.preventDefault();
        if(title.length === 0){
            alert('Search Somthing!')
        } else
        fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDb_API_KEY}&s=${title}`)
        .then(res => res.json())
        .then(movies => setMovies(movies.Search))
        // .catch(error => {
        //     if(error){
        //         setTitle('')
        //         setMovies([])
        //         alert('there was an error. Try Again')
        //     }
        // })
        
        // // setTitle('')
    }

    const clearHandler = () => {
        setMovies([])
        setTitle('')
    }

    const nominateHandler = (movie) => {
        setNominations([...nominations, movie ])
    }

    const removeHandler = (movie) => {
        let spreadNominations = [...nominations]
        let newNominations = spreadNominations.filter(nominee => nominee.Title !== movie.Title)
        setNominations(newNominations)
    }
   
    return(
        <div>
           {nominations.length === 5 ? <FinishedModal/> : ''}
            <Container>
            <Form className='input' onSubmit={submitHandler}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className='title'>Movie Title</Form.Label>
                    <Form.Control onChange={titleHandler} value={title} type="text" placeholder="Enter Movie Title Here..." />
                </Form.Group>
                {/* <Button className='submit' type="submit">
                    Submit
                </Button> */}
                <Button onClick={clearHandler} variant="dark"> Clear Search</Button>
            </Form>
            </Container>
            <Container className='movie-noms'>
                <Row>
                    <Col md='8'>
                        <div>
                        <h3 className='sub-header'>Movies</h3>
                        {movies.length > 0? <h5 className='remainder'>Search Results for {title}</h5> : <h5 className='remainder'>Search Results</h5> }
                            <div className='movies'>  
                                {movies.length > 0 ? <Row> {movies.map((movie, key) => <Movies id={key} movie={movie} nominateHandler={nominateHandler} nominations={nominations} title={title} />)  }</Row>: null }
                            </div> 
                        </div>
                    </Col>
                    <Col> <Nominations nominations={nominations} removeHandler={removeHandler} /></Col>
                </Row>
            </Container>    
        </div>
    
    )
}

export default Home