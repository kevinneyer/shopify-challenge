import React from 'react'
import { Button, Spinner, Col, Card }from 'react-bootstrap';

const Movies = (props) => {

    const { movie, nominateHandler, nominations } = props

    return(
        <div>
            {movie ? 
                <Col>
                    <Card style={{ width: '12rem' }} bg='dark' text='white'>
                        <Card.Img
                            width={64}
                            height={300}
                            className="mr-3"
                            src={movie.Poster}
                            alt={movie.Title}
                        />
                        <Card.Text>{movie.Title}</Card.Text>
                        <Card.Text>{movie.Year}</Card.Text>
                        {nominations.includes(movie) || nominations.length === 5 ? 
                            <Button variant="secondary" disabled >Nominate</Button>
                            : 
                            <Button className='nominate' onClick={() => nominateHandler(movie)}>Nominate</Button>
                        }
                    </Card>
                </Col>
                :
                <Spinner animation="grow" />
            }
        </div>
    )
}

export default Movies