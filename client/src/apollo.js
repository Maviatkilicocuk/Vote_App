import { ApolloClient, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

// WebSocket bağlantısı (subscription için)
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8080/v1/graphql',
  options: {
    reconnect: true,
  },
});

// HTTP bağlantısı (query ve mutation için)
const httpLink = new HttpLink({
  uri: 'http://localhost:8080/v1/graphql',
});

// Bağlantıları ayır: subscription'lar WebSocket ile, diğerleri HTTP ile
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// Apollo Client oluştur
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
