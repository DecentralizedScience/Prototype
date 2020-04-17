import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/Chip.css';
import './styles/MaterialTable.css'
import App, {ReviewerSearch} from './components/App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

var config
try {
   config = require('./config.json')
} catch (e) {
  console.error('Client configuration file not found.')
  config = {
    host: 'http://localhost',
    port: 4000,
    path: '/graphql'
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#374784',
      light: '#a7cee2',
      dark: '#21305c',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ef696a',
      light: '#f3e8b7',
      dark: '#b8383f',
      contrastText: '#000000'
    }
  }
})

const httpLink = createHttpLink({
  uri: config.host  + ':' + config.port + config.path
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

window.ReactDOM = ReactDOM;
window.React = React;

let RS = () => (
  <MuiThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <ReviewerSearch/>
      </ApolloProvider>
  </MuiThemeProvider>
)

window.ReviewerSeach = RS

export { RS as ReviewerSearch };
