import React from 'react'
import { Media, Button } from 'react-bootstrap'

const Nominations = (props) => {

    const { nominations, removeHandler, clearNominations } = props
    const remainder = 5 - nominations.length
 
    return(
        <div>
            <h3 className='sub-header'>Nominations {nominations.length >= 1 ? <Button onClick={clearNominations} variant='dark'>Clear Nominations</Button> : null }</h3>
            {remainder > 0 ?
                <h5 className='remainder'>You have {remainder} {remainder === 1 ? 'nomination' : 'nominations'} left</h5>
                :
                <h5 className='remainder'>You're finished voting!</h5>
            } 
            {nominations.length > 0 ?
                nominations.map(nominee => 
                    <div className='nominations'>
                        <Media>
                            <img
                                width={64}
                                className="mr-3"
                                src={nominee.Poster}
                                alt={nominee.Title}
                            />
                            <Media.Body className='nominee-text'>
                                <h5 className='nominee-header'>{nominee.Title}</h5>
                                <p>{nominee.Year}</p>
                            </Media.Body>
                            <Button variant="danger" onClick={() => removeHandler(nominee)}>Remove</Button>
                        </Media>
                    </div>
                )
                :
                null
            }
        </div>
    )
}

export default Nominations