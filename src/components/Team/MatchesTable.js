import React from "react"
import { Link } from "react-router-dom"
import ViewIcon from "@material-ui/icons/ViewComfy"
import IconButton from "@material-ui/core/IconButton"
import Table from "../Table/Table"
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline"

const MatchesTable = ({ data }) => (
  <div style={{ maxWidth: "100%" }}>
    <Table
      columns={[
        {
          title: "",
          field: "",
          render: rowData => (
            <Link to={`/app/match/${rowData.id}`}>
              <IconButton>
                <PlayCircleOutline />
              </IconButton>
            </Link>
          )
        },
        { title: "Home team", field: "homeTeam.name" },
        { title: "Away team", field: "awayTeam.name" },
        { title: "Date", field: "date", type: "date" }
      ]}
      data={data}
      title="Games"
    />
  </div>
)

export default MatchesTable
