import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiStatusConstants1 = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    movieData: {},
    castData: {},
    apiStatus: apiStatusConstants.initial,
    apiStatus1: apiStatusConstants1.initial,
  }

  componentDidMount() {
    this.getMovieData()
    this.getCastsData()
  }

  getMovieData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=02881493a475ea49012dd3d678c23298&language=en-U`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        originalTitle: fetchedData.original_title,
        posterPath: fetchedData.poster_path,
        voteAverage: fetchedData.vote_average,
        runtime: fetchedData.runtime,
        genres: fetchedData.genres.map(val => ({
          id: val.id,
          name: val.name,
        })),
        releaseDate: fetchedData.release_date,
        overview: fetchedData.overview,
      }
      this.setState({
        movieData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getCastsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    this.setState({
      apiStatus1: apiStatusConstants1.inProgress,
    })
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=02881493a475ea49012dd3d678c23298&language=en-US`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        originalTitle: fetchedData.original_title,
        posterPath: fetchedData.poster_path,
        voteAverage: fetchedData.vote_average,
        runtime: fetchedData.runtime,
        genres: fetchedData.genres.map(val => ({
          id: val.id,
          name: val.name,
        })),
        releaseDate: fetchedData.release_date,
        overview: fetchedData.overview,
      }
      this.setState({
        castData: updatedData,
        apiStatus1: apiStatusConstants1.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus1: apiStatusConstants1.failure,
      })
    }
  }

  renderMovieDetailsView = () => {
    const {movieData} = this.state
    const {
      originalTitle,
      voteAverage,
      runtime,
      releaseDate,
      overview,
      posterPath,
      genres,
    } = movieData
    const path = `https://image.tmdb.org/t/p/w500${posterPath}`
    const generList = []
    const update = genres.map(val => {
      generList.push(val.name)
      return val
    })
    const gener = generList.join(', ')

    return (
      <div className="movie-details-main-container">
        <h1>Title: {originalTitle}</h1>
        <h1>Rating: {voteAverage}</h1>
        <h1>Duration: {runtime}</h1>
        <h1>Relase Date: {releaseDate}</h1>
        <h1>Overview: {overview}</h1>
        <h1>Gener: {gener}</h1>
        <img className="movie-img" src={path} alt={originalTitle} />
      </div>
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

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMovieDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
