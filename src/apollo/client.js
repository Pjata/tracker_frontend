import ApolloClient from "apollo-boost"
const uri =
  process.env.NODE_ENV === "production"
    ? "https://trackergraphql.herokuapp.com/graphql"
    : "http://localhost:4000/graphql"
export const client = new ApolloClient({
  uri
})
export default client
