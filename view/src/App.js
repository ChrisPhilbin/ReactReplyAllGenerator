import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import ReplySelector from './components/ReplySelector'
import SignUp from './pages/Signup'

const App = () => {

  return(
    <Router>
      <div>
        <Switch>
          <Route exact path="/"       component={ReplySelector} />
          <Route exact path="/login"  component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  )
}

export default App