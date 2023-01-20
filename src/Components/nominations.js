import React from 'react'
import Movies from './movies'
import { Button } from 'react-bootstrap'

const Nominations = (props) => {

    const { nominations, removeHandler, clearNominations } = props
    const remainder = 5 - nominations.length
 
    return(
        <div>
            {/* <h3 className='sub-header'>
                Nominations 
                { nominations.length >= 1 ? 
                <Button onClick={clearNominations} variant='dark'>Clear Nominations</Button> 
                : 
                null 
                }
            </h3> */}
            { remainder > 0 ?
                <h5 className='remainder'>You have {remainder} {remainder === 1 ? 'nomination' : 'nominations'} left</h5>
                :
                <h5 className='remainder'>You're finished voting!</h5>
            } 
            { nominations.length > 0 ?
                nominations.map((nominee, key) =>
                    <Movies 
                    id={key} 
                    key={key}
                    movie={nominee} 
                    removeHandler={removeHandler}
                    />
                )
                :
                null
            }
        </div>
    )
}

export default Nominations