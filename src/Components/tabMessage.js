import React from 'react';

const tabMessage = (props) => {
    const  { message } = props; 
    return (
        <div>
            <div className='tab-message'>
                { message }
            </div>

        </div>
    )
}

export default tabMessage