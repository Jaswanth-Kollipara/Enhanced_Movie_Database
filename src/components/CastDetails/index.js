import './index.css'

const CastDetails = props => {
  const {castData} = props
  const {
    gender,
    knownForDepartment,
    name,
    popularity,
    profilePath,
    character,
  } = castData
  const gen = gender === 1 ? 'Female' : 'Male'
  const path = `https://image.tmdb.org/t/p/w500${profilePath}`
  return (
    <li className="cast-li-con">
      <h1 className="cast-details-heading">Name: {name}</h1>
      <p className="cast-details-para">Gender: {gen}</p>
      <p className="cast-details-para">Role: {knownForDepartment}</p>
      <p className="cast-details-para">Character: {character}</p>
      <p className="cast-details-para">Popularity: {popularity}</p>
      <img className="cast-details-img" src={path} alt={name} />
    </li>
  )
}

export default CastDetails
