import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// HTTP Link
const httpLink = new HttpLink({
  uri: `wss://react.eogresources.com/graphql/query`,
});

// Adds Authentication Headers on HTTP as well as was requests
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

// WebSocket Link
const wsLink = new WebSocketLink({
  uri: `wss://react.eogresources.com/graphql/query`,
  options: {
    reconnect: true,
    lazy: true,
  },
});

// Send query request based on the type definition
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink),
);

// Apollo Client
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const ReduxRoot = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

ReactDOM.render(<ReduxRoot />, document.getElementById('root'));

export default ReduxRoot;
