import React from "react"
import Table from "../Table/Table"
import ViewIcon from "@material-ui/icons/RemoveRedEye"
import IconButton from "@material-ui/core/IconButton"
import Play from "@material-ui/icons/PlayArrow"
import { toHHMMSS } from "../../utility"
const EventsComponent = ({
  data,
  onSelectRows,
  seekAndPlay,
  seekAndPlayAll
}) => {
  const onSelectionChange = rows => {
    onSelectRows(rows)
  }

  const onViewClick = rowData => ev => {
    seekAndPlay(rowData.time)
  }

  const columns = [
    {
      title: "",
      field: "",
      render: rowData => (
        <IconButton onClick={onViewClick(rowData)}>
          <ViewIcon />
        </IconButton>
      )
    },
    { title: "Típus", field: "type" },
    { title: "Játékos", field: "player.name" },
    { title: "Időpont", render: rowData => toHHMMSS(rowData.time) }
  ]
  const onPlayAll = (evt, data) => {
    seekAndPlayAll(data)
  }
  return (
    <Table
      style={{
        width: "70%"
      }}
      options={{
        selection: true,
        filtering: true
      }}
      onSelectionChange={onSelectionChange}
      columns={columns}
      data={data}
      actions={[
        {
          tooltip: "Kijelölt jelenetek lejátszása",
          icon: Play,
          onClick: onPlayAll
        }
      ]}
    />
  )
}

export default EventsComponent
