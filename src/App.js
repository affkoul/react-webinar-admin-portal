import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// material-ui/core
import { CssBaseline } from '@material-ui/core'

// jss & theme
import { create } from 'jss'
import rtl from 'jss-rtl'
import {
  MuiThemeProvider,
  StylesProvider,
  jssPreset,
} from '@material-ui/core/styles'


// layouts
import Login from 'layouts/Login'
import Dashboard from 'layouts/Dashboard'

// utils
import theme from 'assets/theme'
// Configure JSS
// const jss = create({ plugins: [...jssPreset().plugins, rtl()] })

function App() {
  const authToken = localStorage.getItem('authToken')

  return (
    <StylesProvider>
      {/* <StylesProvider jss={jss}> */}
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <Switch>
          {!authToken && (
            <Route path="/login">
              <Login />
            </Route>
          )}
          {authToken && (
            <Route path="/">
              <Dashboard />
            </Route>
          )}
          {!authToken && <Redirect from="/" to="/login" />}
        </Switch>
      </MuiThemeProvider>
    </StylesProvider>
  )
}

export default App
