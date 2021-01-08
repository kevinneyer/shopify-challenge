import React from 'react'
import { Media, Button }from 'react-bootstrap';

const Movies = (props) => {

    const { movie, nominateHandler, nominations } = props

    return(
        <div>
            <Media>
                <img
                    width={64}
                    height={64}
                    className="mr-3"
                    src={movie.Poster}
                    alt={movie.Title}
                />
                <Media.Body>
                    <h5>{movie.Title}</h5>
                    <p>{movie.Year}</p>
                </Media.Body>
                {nominations.includes(movie) ? <Button disabled >Nominate</Button>: <Button onClick={() => nominateHandler(movie)}>Nominate</Button>}
            </Media>
        </div>
    )
}

export default Movies