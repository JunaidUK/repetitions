import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import Homepage from '../containers/Homepage'

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
