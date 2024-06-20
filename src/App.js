import {Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieDetails from './components/MovieDetails'
import SearchDetails from './components/SearchDetails'
import './App.css'

const App = () => (
  <div className="app-con">
    <Header />
    <Switch>
      <Route exact path="/" component={Popular} />
      <Route exact path="/top-rated" component={TopRated} />
      <Route exact path="/upcoming" component={Upcoming} />
      <Route exact path="/search/:text" component={SearchDetails} />
      <Route exact path="/movie/:id" component={MovieDetails} />
    </Switch>
  </div>
)

export default App
