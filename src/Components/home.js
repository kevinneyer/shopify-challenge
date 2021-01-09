import React,  { useState, useEffect }from 'react'
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
                   
                        <div>
                            <h3>Movies</h3>
                            <Card>
                                
                                {movies.length > 0 ? <Card.Body> <h5>Search Results for {title}</h5>{ movies.map((movie, key) => <Movies id={key} movie={movie} nominateHandler={nominateHandler} nominations={nominations} title={title} />)  }</Card.Body>: <Card.Body><h5>Search some Movies!</h5> </Card.Body>}
                               
                            </Card> 
                        </div>
                    </Col>
                    <Col> <Nominations nominations={nominations} removeHandler={removeHandler} /></Col>
                </Row>
            </Container>    
        </div>
    
    )
}

export default Home