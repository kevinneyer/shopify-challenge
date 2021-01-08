import React,  { useState }from 'react'
import Movies from './movies'
import Nominations from './nominations'
import { Form, Button, Container, Row, Col }from 'react-bootstrap';

const Home = () => {

    const [ title, setTitle ] = useState('')
    const [ movies, setMovies ] = useState([])
    const [ nominations, setNominations ] = useState([])
    // const [ nominated, setNominated ] = useState(false)

    const titleHandler = (e) => {
        setTitle(e.target.value)
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
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

    // const disableHandler = () => {
    //     setNominated(!nominated)
    // }
    
    if(nominations.length === 5){
        alert('Nominations Complete!')
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
                    <Col>{movies.length > 0 ? <Movies movies={movies} nominateHandler={nominateHandler} nominations={nominations} /> : null }</Col>
                    <Col>{nominations.length > 0 ? <Nominations nominations={nominations} removeHandler={removeHandler} /> : null }</Col>
                </Row>
            </Container>    
        </div>
    )
}

export default Home