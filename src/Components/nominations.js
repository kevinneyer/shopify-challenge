import React, { useState, useEffect } from 'react'
import Movies from './movies'
import TabMessage from './tabMessage';
import { Row } from 'react-bootstrap'

const Nominations = (props) => {
    const [ message, setMessage ] = useState('');

    const { nominations, removeHandler } = props;
    const remainder = 5 - nominations.length;

    const getMessage = () => {
        let secondHalf = remainder === 1 ? 'nomination left' : 'nominations left';
        let textMessage;
        if (remainder > 0) {
            textMessage = `You have ${remainder} ` + secondHalf;
        } else {
            textMessage = "You're finished voting!";
        }
        setMessage(textMessage);
    }

    useEffect(() => {
        getMessage();
    })

    return(
        <div>
            <TabMessage message={message}/>
            <Row>
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
            </Row>
        </div>
    )
}

export default Nominations