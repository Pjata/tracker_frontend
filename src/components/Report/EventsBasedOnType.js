import React from "react";
import { map, filter, prop, propEq, groupBy, path } from "ramda";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const pathDef = p => def => v => path(p)(v) || def;

export default function EventsBasedOnType(props) {
  const { type, events, label, typePath } = props;
  const typeEvents = filter(propEq("type", type));
  const getEventsByType = groupBy(pathDef(typePath)("Unknown"));
  const eventsFiltered = typeEvents(events);
  const eventsByType = getEventsByType(eventsFiltered);

  console.log(Object.keys(eventsByType))
  const rows = Object.keys(eventsByType).map(key => (
    <TableRow>
      <TableCell>{key}</TableCell>
      <TableCell>{eventsByType[key].length}</TableCell>
    </TableRow>
  ));

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{label}</TableCell>
          <TableCell>{eventsFiltered.length}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{rows}</TableBody>
    </Table>
  );
}
