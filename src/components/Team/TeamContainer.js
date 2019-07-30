import React from "react"
import TeamComponent from "./TeamComponent"

const TeamContainer = props => {
  const data = [
    {
      id: "0",
      homeTeam: "MAC",
      awayTeam: "KASSA",
      date: new Date()
    },
    {
      id: "1",
      homeTeam: "MAC",
      awayTeam: "MISKOVEC",
      date: new Date()
    },
    {
      id: "2",
      homeTeam: "MAC",
      videoId: "BMVakSczGgk",
      awayTeam: "Jolán",
      date: new Date()
    }
  ]
  return <TeamComponent data={data} />
}

export default TeamContainer
