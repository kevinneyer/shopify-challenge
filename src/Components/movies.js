import React, { useState, useEffect } from 'react'
import { Button, Spinner, Col, Card }from 'react-bootstrap';

const Movies = (props) => {
    const { movie, nominateHandler, nominations, isMoviesTab, removeHandler } = props
    const [ isNominated, setIsNominated ] = useState(false);

    const filterNoms = () => {
        let nomArray = nominations.filter((nomination) => nomination.imdbID === movie.imdbID);
        if (nomArray.length > 0) {
            setIsNominated(true);
        }
    };

    useEffect(() => {
        if(nominations && nominations.length > 0) {
            filterNoms();
        }
    });

    return(
        <div>
            { movie ? 
                <Col>
                    <Card style={{ width: '300px', height: '600px', marginBottom: '30px'}} bg='dark' text='white'>
                        <Card.Body>
                        <Card.Img
                            width={100}
                            height={400}
                            className="mr-3"
                            src={movie.Poster}
                            alt={movie.Title}
                        />
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Subtitle>{movie.Year}</Card.Subtitle>
                        { isMoviesTab ?
                            isNominated || (nominations && nominations.length === 5) ? 
                            <Button style={{ width: '100%', position: 'absolute', left: '0px', bottom: '0px' }} variant="secondary" disabled >Nominate</Button>
                            : 
                            <Button style={{ width: '100%', position: 'absolute', left: '0px', bottom: '0px' }} className='nominate' onClick={() => nominateHandler(movie)}>Nominate</Button>
                        
                        :
                        <Button style={{ width: '100%', position: 'absolute', left: '0px', bottom: '0px' }}variant="danger" onClick={() => removeHandler(movie)}>Remove</Button>
                        }   
                        </Card.Body>
                    </Card>
                </Col>
                :
                <Spinner animation="grow" />
            }
        </div>
    )
}

export default Movies