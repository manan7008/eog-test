import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import ApolloClient from 'apollo-client';

// Create WebSocket client
const WSClient = new SubscriptionClient(`wss://react.eogresources.com/graphql`, {
  reconnect: true,
  connectionParams: {
    // Connection parameters to pass some validations
    // on server side during first handshake
  },
});

const GraphQLClient = new ApolloClient({
  link: WSClient,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={GraphQLClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
