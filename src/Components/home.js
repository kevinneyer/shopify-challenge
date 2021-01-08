import React,  { useState }from 'react'
import Movies from './movies'
import Nominations from './nominations'
import { Form, Button, Container, Row, Col, Card }from 'react-bootstrap';

const Home = () => {

    const [ title, setTitle ] = useState('')
    const [ movies, setMovies ] = useState([])
    const [ nominations, setNominations ] = useState([])

    const titleHandler = (e) => {
        setTitle(e.target.value)
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        if(title.length === 0){
            alert('Search Somthing!')
        } else
        fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDb_API_KEY}&s=${title}`)
        .then(res => res.json())
        .then(movies => setMovies(movies.Search))
        // setTitle('')
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
            <Container>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Movie Title</Form.Label>
                    <Form.Control onChange={titleHandler} value={title} type="text" placeholder="Enter Movie Title Here..." />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button onClick={clearHandler} variant="secondary">Clear Search</Button>
            </Form>
            </Container>
            <Container>
                <Row>
                    <Col>
                    {movies.length > 0 ? 
                        <div>
                            <h3>Movies</h3>
                            <Card>
                                <Card.Body>
                                    {movies.map(movie => <Movies movie={movie} nominateHandler={nominateHandler} nominations={nominations} />)}
                                </Card.Body>
                            </Card> 
                        </div>
                    : 
                    null 
                    }
                    </Col>
                    <Col>{nominations.length > 0 ? <Nominations nominations={nominations} removeHandler={removeHandler} /> : null }</Col>
                </Row>
            </Container>    
        </div>
    
    )
}

export default Home