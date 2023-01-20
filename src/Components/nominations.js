import React, { useState, useEffect } from 'react'
import Movies from './movies'
import TabMessage from './tabMessage';
import { Button } from 'react-bootstrap'

const Nominations = (props) => {
    const [ message, setMessage ] = useState('');

    const { nominations, removeHandler, clearNominations } = props;
    const remainder = 5 - nominations.length;

    const getMessage = () => {
        let secondHalf = remainder === 1 ? 'nomination left' : 'nominations left'
        let textMessage;
        if (remainder > 0) {
            textMessage = `You have ${remainder} ` + secondHalf
        } else {
            textMessage = "You're finished voting!"
        }
        setMessage(textMessage);
    }

    useEffect(() => {
        getMessage()
    })

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
            {/* { remainder > 0 ?
                <h5 className='remainder'>You have {remainder} {remainder === 1 ? 'nomination' : 'nominations'} left</h5>
                :
                <h5 className='remainder'>You're finished voting!</h5>
            }  */}
            <TabMessage 
                message={message}/>
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