import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import './i18n';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Provider } from "react-redux";
import {store} from "../store";

const defaultOptions= {
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  }
}

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});

export default client

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App/>
    </Provider>
  </ApolloProvider>
);











