import React,  { useState, useEffect } from 'react'
import Movies from './movies'
import Nominations from './nominations'
import FinishedModal from './finishedModal'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const Home = () => {

    const [ title, setTitle ] = useState('')
    const [ movies, setMovies ] = useState([])
    // If localStorage is present, use localStorage as state. If not, use an empty array.
    const [ nominations, setNominations ] = useState(
        localStorage.getItem('nominations') ?
        JSON.parse(localStorage.getItem('nominations'))
        :   
        [])
    localStorage.setItem('nominations', JSON.stringify(nominations))

    // Render saved nominations upon refresh or window re-open.
    useEffect(() => {
        setNominations(nominations)
    },[nominations])

    const titleHandler = (e) => {
        setTitle(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(title.length === 0){
            alert('Search Cannot be Empty!')
        } else
        fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDb_API_KEY}&s=${title}`)
        .then(res => res.json())
        .then(movies => setMovies(movies.Search))
        .catch(error => {
            if(error){
                alert('Something went wrong!')
            }
        })
    }

    const clearHandler = () => {
        setMovies([])
        setTitle('')
    }

    const clearNominations = () => {
        setNominations([])
        localStorage.clear()
    }

    const nominateHandler = (movie) => {
        setNominations([...nominations, movie])
        localStorage.setItem('nominations', JSON.stringify(nominations))
    }

    const removeHandler = (movie) => {
        let spreadNominations = [...nominations]
        let newNominations = spreadNominations.filter(nominee => nominee.Title !== movie.Title)
        setNominations(newNominations)
    }
   

    const sortMovies = movies.sort((a,b) => a.Year - b.Year)
    
    return(
        <div>
           {nominations.length === 5 ? <FinishedModal/> : ''}
            <Container>
                <Form className='input' onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label className='title'>Movie Title</Form.Label>
                        <Form.Control onChange={titleHandler} value={title} type='text' placeholder='Enter Movie Title Here...' />
                    </Form.Group>
                    <Button onClick={clearHandler} variant='dark'> Clear Search</Button>
                </Form>
            </Container>
            <Container className='movie-noms'>
                <Row>
                    <Col md='8'>
                        <div>
                            <h3 className='sub-header'>Movies</h3>
                            {movies.length > 0 ? 
                                <h5 className='remainder'>Search Results for {title}</h5> 
                                : 
                                <h5 className='remainder'>Search Results</h5> 
                            }
                            <div className='movies'>  
                                {movies.length > 0 ? 
                                    <Row>
                                        {sortMovies.map((movie, key) => 
                                        <Movies id={key} movie={movie} 
                                        nominateHandler={nominateHandler} 
                                        nominations={nominations} 
                                        title={title} />)}
                                    </Row> 
                                    : 
                                    null 
                                }
                            </div> 
                        </div>
                    </Col>
                    <Col> 
                        <Nominations 
                        nominations={nominations} 
                        removeHandler={removeHandler} 
                        clearNominations={clearNominations}/>
                    </Col>
                </Row>
            </Container>    
        </div>
    
    )
}

export default Home