import React from "react"
import TeamsComponent from "./TeamsComponent"
import { Query } from "react-apollo"
import { gql } from "apollo-boost"

const TeamsQuery = Component => props => (
  <Query
    query={gql`
      {
        teams {
          id
          name
          logoUrl
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error</p>
      return <Component data={data} {...props} />
    }}
  </Query>
)

const TeamsContainer = props => {
  const {
    data: { teams }
  } = props
  return <TeamsComponent teams={teams} />
}
export default TeamsQuery(TeamsContainer)
