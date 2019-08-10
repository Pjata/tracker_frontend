import ApolloClient from "apollo-boost"
console.log(process.env.NODE_ENV)
const uri =
  process.env.NODE_ENV !== "development"
    ? "https://trackergraphql.herokuapp.com/graphql"
    : "http://localhost:4000/graphql"
export const client = new ApolloClient({
  uri
})
export default client
