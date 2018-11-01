import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import Homepage from '../containers/Homepage'
import AthleteDash from '../containers/AthleteDash'

export const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path='/interfaces' component={Homepage} />
        <Route path='/' component={Homepage} />
      </Router>
    </div>
  )
}

export default App
