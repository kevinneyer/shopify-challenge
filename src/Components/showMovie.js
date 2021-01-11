import React, { useState } from 'react'
import { Button, Modal, Media }from 'react-bootstrap';

const ShowMovie = (props) => {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const { movie } = props
    console.log(movie)
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{movie.Title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Media>
            <img
                width={300}
                height={300}
                className="mr-3"
                src={movie.Poster}
                alt="Generic placeholder"
            />
                <Media.Body>
                    <h5>{movie.Year}</h5>
                    <p>{movie.Plot}</p>
                </Media.Body>
            </Media>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default ShowMovie