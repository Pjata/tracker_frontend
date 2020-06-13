import React, { useMemo } from "react"
import Drawer from "../Drawer/Drawer"
import MatchesTable from "./MatchesTable"
import Theaters from "@material-ui/icons/Theaters"
import Players from "@material-ui/icons/AccessibilityNew"
import PlayersTable from "./PlayersTable"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Link from "@material-ui/core/Link"

const modules = [
  {
    title: "Games",
    icon: <Theaters />,
    component: props => (
      <MatchesTable onRowAdd={props.onMatchAdd} onRowUpdate={props.onMatchUpdate} data={props.data.matches} key={props.index} />
    )
  },
 /* {
    title: "Players",
    icon: <Players />,
    component: props => (
      <PlayersTable
        data={props.data.players}
        key={props.index}
        onRowUpdate={props.onPlayerUpdate}
        onRowAdd={props.onPlayerAdd}
        onRowDelete={props.onPlayerDelete}
      />
    )
  } */
]

const Title = ({ teamName }) => {
  return (
    <Breadcrumbs>
      <Link color="inherit" href="/app/teams/">
        Teams
      </Link>
      <Link color="textPrimary" aria-current="page">
        {teamName}
      </Link>
    </Breadcrumbs>
  )
}

const TeamComponent = ({ data, activeModule, setActiveModule, ...rest }) => {
  const moduleComps = modules.map(
    (module, index) =>
      activeModule === index && module.component({ index, data: data, ...rest })
  )
  const onModuleSelected = index => ev => {
    setActiveModule(index)
  }
  return (
    <Drawer
      activeModule={activeModule}
      onModuleSelected={onModuleSelected}
      title={<Title teamName={data.name} />}
      modules={modules}
    >
      {moduleComps}
    </Drawer>
  )
}
export default TeamComponent
