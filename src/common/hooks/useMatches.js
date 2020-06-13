import { useQuery } from "./useQuery";
import { useTeams } from "./useTeams";
import {map, find,propEq, flip} from 'ramda'

const getTeam = teams => id => find(propEq('id',id))(teams)

const mapMatches = (teams) => map(match => {
  return {
    ...match,
    homeTeam: getTeam(teams)(match.homeTeam),
    awayTeam: getTeam(teams)(match.awayTeam),
    date: match.date && match.date.toDate()
  }

})
export const useMatches = (id) => {
  const teams = useTeams()
  const matches = useQuery(`teams/${id}/matches`)
  if(!teams || !matches) return null 
  const mapped =  mapMatches(teams)(matches)
  console.log(mapped)
  return mapped
}