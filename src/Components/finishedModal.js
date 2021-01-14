import React, { useState } from 'react'
import { Button, Modal }from 'react-bootstrap';

const FinishedModal = () => {

  const [ show, setShow ] = useState(true)

  const handleClose = () => {
    setShow(false)
  }

  return (
    <>
      <Modal contentClassName='modal' centered='true' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='modal-title'>🎉Congratulations!🎉 </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You've Completed your Voting!
        </Modal.Body>
        <Modal.Footer>
          <Button className='nominate' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  }

export default FinishedModal