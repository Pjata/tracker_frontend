import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './introspection-result';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

export const recorderUri =
  process.env.NODE_ENV !== "development"
    ? "https://trackerrecordernovideo.herokuapp.com"
    : "http://localhost:3001";
const uri =
  process.env.NODE_ENV !== "development"
    ? "https://trackergraphql.herokuapp.com/graphql"
    : "http://localhost:3000/graphql";


const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri,
      credentials: "same-origin"
    })
  ]),
  cache: new InMemoryCache({fragmentMatcher})
});
export default client;
