import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Movies from '../Movies'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    moviesList: {},
    apiStatus: apiStatusConstants.initial,
    page: 1,
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {page} = this.state
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=02881493a475ea49012dd3d678c23298&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(val => ({
        adult: val.adult,
        backdropPath: val.backdrop_path,
        genreIds: val.genre_ids,
        id: val.id,
        originalLanguage: val.original_language,
        originalTitle: val.original_title,
        overview: val.overview,
        popularity: val.popularity,
        posterPath: val.poster_path,
        releaseDate: val.release_date,
        title: val.title,
        video: val.video,
        voteAverage: val.vote_average,
        voteCount: val.vote_count,
      }))
      this.setState({
        moviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickPrev = () => {
    const {page} = this.state
    if (page !== 1) {
      this.setState(prevState => ({page: prevState.page - 1}), this.getMovies)
    }
  }

  onClickNext = () => {
    this.setState(prevState => ({page: prevState.page + 1}), this.getMovies)
  }

  renderMoviesListView = () => {
    const {moviesList} = this.state

    return (
      <ul className="popular-ul">
        {moviesList.map(item => (
          <Movies key={item.id} movieData={item} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderAllMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMoviesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {page} = this.state
    return (
      <div className="popular-main-container">
        <div className="popular-main-container-in">
          <button
            type="button"
            className="popular-btn"
            onClick={this.onClickPrev}
          >
            Prev
          </button>
          <p className="popular-para">{page}</p>
          <button
            type="button"
            className="popular-btn"
            onClick={this.onClickNext}
          >
            Next
          </button>
        </div>
        {this.renderAllMovies()}
      </div>
    )
  }
}

export default Popular
