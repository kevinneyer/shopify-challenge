import React, { useState } from 'react'
import { Button, Modal, Media }from 'react-bootstrap';

const ShowMovie = (props) => {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const { movie } = props

    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Congratulations!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You've Completed your Voting!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default ShowMovie