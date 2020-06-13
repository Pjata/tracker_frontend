import React from 'react'

import Select from "react-select"
import { useTeams } from '../../common/hooks/useTeams';

const TeamSelector = props => {
  const {value,onChange} = props
  const teams = useTeams()
  if(!teams) {
    return <div>Loading...</div>
  }

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