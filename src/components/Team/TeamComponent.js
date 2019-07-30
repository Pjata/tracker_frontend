import React from "react"
import { Link } from "react-router-dom"
import ViewIcon from "@material-ui/icons/ViewComfy"
import IconButton from "@material-ui/core/IconButton"
import Table from "../Table/Table"

const TeamComponent = ({ data }) => {
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
          { title: "Hazai csapat", field: "homeTeam" },
          { title: "Idegenbeli csapat", field: "awayTeam" },
          { title: "Dátum", field: "date", type: "date" }
        ]}
        data={data}
        title="Meccsek"
      />
    </div>
  )
}
export default TeamComponent
