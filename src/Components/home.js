import React,  { useState, useEffect } from 'react';
import Movies from './movies';
import Nominations from './nominations';
import FinishedModal from './finishedModal';
import TabMessage from './tabMessage';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Home = () => {

    const [ title, setTitle ] = useState('');
    const [ movies, setMovies ] = useState([]);
    const [ isMoviesTab, setisMoviesTab ] = useState(true);
    const [ error, setError ] = useState(false);

    const movieMessage = "Search Some Movies!";

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
            alert('Search cannot be empty')
        } else
        fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDb_API_KEY}&s=${title}`)
        .then(res => res.json())
        .then((data) => {
            if(data.Search) {
                setMovies(data.Search);
            } else {
                setError(true);
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
   
    const contentToggle = () => {
        setisMoviesTab(!isMoviesTab);
    }

    const sortMovies = movies.length > 0 ? movies.sort((a,b) => a.Year - b.Year) : []
    
    return(
        <div>
            { nominations.length === 5 ? <FinishedModal/> : '' }
            <Container fluid >
                <Form className='input' onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label className='title'>Movie Title</Form.Label>
                        <Form.Control onChange={titleHandler} value={title} type='text' placeholder='Enter Movie Title Here...' />
                    </Form.Group>
                   { movies.length > 0 && isMoviesTab ? 
                        <Button onClick={clearHandler} style={{ background: '#f5c518' }} variant='warning'> Clear Search</Button> 
                        : 
                        null 
                    }
                </Form>
            </Container>
            <Container fluid className='movie-noms' style={{ minHeight: '100vh' }}>
                <div className='toggle-button'>
                    <Button onClick={contentToggle} style={{ minWidth: '200px' }}variant='secondary'>
                        { isMoviesTab ? 'View Nomintations' : 'See Movies List'}
                    </Button>
                </div>
                <Row>
                    { isMoviesTab ?
                        <Col>
                            <div className='content-tab'>  
                                { sortMovies.length > 0 && !error ? 
                                    <Row>
                                        {sortMovies.map((movie, key) => 
                                            <Movies 
                                                id={key} 
                                                key={key}
                                                movie={movie} 
                                                nominateHandler={nominateHandler} 
                                                nominations={nominations} 
                                                title={title} 
                                                isMoviesTab={isMoviesTab}/>
                                        )}
                                    </Row> 
                                    :
                                    <div className='message-column'>
                                        <TabMessage message={movieMessage}/>   
                                    </div> 
                                    
                                }
                            </div> 
                        </Col>
                        :
                        <Col>
                            <div className='content-tab'>
                                <Nominations 
                                nominations={nominations} 
                                removeHandler={removeHandler} 
                                clearNominations={clearNominations}
                                isMoviesTab={isMoviesTab}/>
                            </div>
                        </Col>
                    }
                </Row>
            </Container>    
        </div>
    )
}

export default Home