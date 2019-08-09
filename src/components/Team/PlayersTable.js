import React from "react"
import { Link } from "react-router-dom"
import ViewIcon from "@material-ui/icons/ViewComfy"
import IconButton from "@material-ui/core/IconButton"
import Table from "../Table/Table"

const PlayersTable = ({ data, onRowUpdate, onRowAdd, onRowDelete }) => {
  console.log(data)
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
          { title: "TrackerID", field: "trackerID" }
        ]}
        data={data}
        title="Players"
      />
    </div>
  )
}

export default PlayersTable
