import React from 'react'

import { useQuery } from "@apollo/react-hooks"
import {query} from "./TeamsContainer"
import Select from "react-select"

const TeamSelector = props => {
  const {value,onChange} = props
  const { loading, error, data } = useQuery(query)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  console.log(value)

  const { teams } = data
  const options = teams.map(team => ({
    label: team.name,
    value: team.id
  }))
  const onChangeInternal = option => {
      console.log(value)
      onChange(option.value)
  }
  const selected = options.find(team => team.value === value)
  return <Select value={selected} onChange={onChangeInternal} options={options}/>
}

export default TeamSelector