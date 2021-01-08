import React from 'react'

const Movies = (props) => {

    const { movies } = props

   
    return(
        <div>
            {movies.map(movie => movie.Title)}
        </div>
    )
}

export default Movies