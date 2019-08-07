import React from "react"
import TeamComponent from "./TeamComponent"
import { useQuery } from "@apollo/react-hooks/lib/index"
import { query } from "./query"

const TeamContainer = props => {
  const { loading, error, data } = useQuery(query)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  const { team } = data
  return <TeamComponent data={team} />
}

export default TeamContainer
