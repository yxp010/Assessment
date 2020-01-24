import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css'

import { Provider, createClient } from 'urql';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
