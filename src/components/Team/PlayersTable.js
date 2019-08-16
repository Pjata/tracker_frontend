import React from "react"
import { Link } from "react-router-dom"
import ViewIcon from "@material-ui/icons/ViewComfy"
import IconButton from "@material-ui/core/IconButton"
import Table from "../Table/Table"

const PlayersTable = ({ data, onRowUpdate, onRowAdd, onRowDelete }) => {
  return (
    <div style={{ maxWidth: "100%" }}>
      <Table
        editable={{
          isEditable: () => true,
          isDeletable: () => true,
          onRowUpdate,
          onRowAdd,
          onRowDelete
        }}
        columns={[
          { title: "Name", field: "name" },
          { title: "Number", field: "number" },
          { title: "Row", field: "row" },
          { title: "TrackerID", field: "trackerID" },
          {
            title: "Position",
            field: "position",
            lookup: {
              LEFT_WING: "Left wing",
              CENTER: "Center",
              RIGHT_WING: "Right wing",
              LEFT_DEFENDER: "Left defender",
              RIGHT_DEFENDER: "Right defender",
              GOALIE: "Goalie"
            }
          }
        ]}
        data={data}
        title="Players"
      />
    </div>
  )
}

export default PlayersTable
