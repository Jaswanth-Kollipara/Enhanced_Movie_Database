import {Link} from 'react-router-dom'
import './index.css'

const Movies = props => {
  const {movieData} = props
  const {id, title, voteAverage, posterPath} = movieData
  const path = `https://image.tmdb.org/t/p/w500${posterPath}`
  return (
    <li className="movies-li-con">
      <h1 className="movies-heading">
        Title: <span>{title}</span>
      </h1>
      <p className="movies-para">Rating: {voteAverage}</p>
      <img className="movies-img" src={path} alt={title} />
      <Link to={`/movie/${id}`} className="movies-link">
        <button type="button" className="movies-btn">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default Movies
