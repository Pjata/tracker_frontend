import React from "react"
import { Link } from "react-router-dom"
import ViewIcon from "@material-ui/icons/ViewComfy"
import IconButton from "@material-ui/core/IconButton"
import Table from "../Table/Table"
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline"

const MatchesTable = ({ data, onRowAdd, onRowUpdate }) => (
  <div style={{ maxWidth: "100%" }}>
    <Table
      editable={{
        isEditable:()=>true,
        onRowAdd,
        onRowUpdate,
      }}
      columns={[
        {
          title: "",
          field: "",
          editable: "never",
          render: rowData => {
            if(!rowData){
              return <div/>
            }
            return <Link to={`/app/match/${rowData.id}`}>
              <IconButton>
                <PlayCircleOutline />
              </IconButton>
            </Link>
          }
        },
        {
          title: "Edit",
          field: "",
          editable: "never",
          render: rowData => {
            if(!rowData){
              return <div/>
            }
            return <Link to={`/app/match/${rowData.id}`}>
              <IconButton>
                <PlayCircleOutline />
              </IconButton>
            </Link>
          }
        },
        { title: "Home team", field: "homeTeam.name" , editable: "never" 
      },
        {title: "video id", field: "videoId"},
        { title: "Away team", field: "awayTeam.name" },
        { title: "Date", field: "date", type: "date", }
      ]}
      data={data}
      title="Games"
    />
  </div>
)

export default MatchesTable
