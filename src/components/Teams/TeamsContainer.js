import React from "react"
import TeamsComponent from "./TeamsComponent"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const query = gql`
  {
    teams {
      id
      name
      logoUrl
    }
  }
`

const TeamsContainer = props => {
  const { loading, error, data } = useQuery(query)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  const { teams } = data
  return <TeamsComponent teams={teams} />
}
export default TeamsContainer
