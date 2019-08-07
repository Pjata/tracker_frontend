import React from "react"
import { Link } from "react-router-dom"
import ViewIcon from "@material-ui/icons/ViewComfy"
import IconButton from "@material-ui/core/IconButton"
import Table from "../Table/Table"

const TeamComponent = ({ data }) => {
  console.log(data)
  return (
    <div style={{ maxWidth: "100%" }}>
      <Table
        columns={[
          {
            title: "",
            field: "",
            render: rowData => (
              <Link to={`/app/match/${rowData.id}`}>
                <IconButton>
                  <ViewIcon />
                </IconButton>
              </Link>
            )
          },
          { title: "Hazai csapat", field: "homeTeam.name" },
          { title: "Idegenbeli csapat", field: "awayTeam.name" },
          { title: "Dátum", field: "date", type: "date" }
        ]}
        data={data.matches}
        title="Meccsek"
      />
    </div>
  )
}
export default TeamComponent
