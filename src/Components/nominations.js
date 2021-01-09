import React from 'react'
import { Media, Button, Card }from 'react-bootstrap';

const Nominations = (props) => {

    const { nominations, removeHandler } = props
 
    return(
        <div>
            <h3>Nominations</h3> 
            <Card>  
                <Card.Body> 
                    {nominations.length > 0 ?
                    nominations.map(nominee => 
                        <Media>
                            <img
                                width={64}
                                height={64}
                                className="mr-3"
                                src={nominee.Poster}
                                alt={nominee.Title}
                            />
                            <Media.Body>
                                <h5>{nominee.Title}</h5>
                                <p>{nominee.Year}</p>
                            </Media.Body>
                            <Button onClick={() => removeHandler(nominee)}>Remove</Button>
                        </Media>
                    )
                    :
                    <h5>Nominate some Movies!</h5>
                    }
                </Card.Body> 
            </Card>
        </div>
    )
}

export default Nominations