import React,  {useState, useEffect }from 'react'
import Movies from './movies'

const Home = () => {

    const [ title, setTitle ] = useState('')
    const [ movies, setMovies ] = useState([])

    const titleHandler = (e) => {
        setTitle(e.target.value)
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDb_API_KEY}&s=${title}`)
        .then(res => res.json())
        .then(movies => setMovies(movies.Search))
        setTitle('')
    }
   
    return(
        <div>
            <form onSubmit={submitHandler}>
                <input onChange={titleHandler} value={title} type='text' placeholder='search movie...' />
                <input type='submit'></input>
            </form>
            {movies.length > 0 ? <Movies movies={movies}/> : null }
            
        </div>
    )
}

export default Home