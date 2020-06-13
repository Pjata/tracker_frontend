import React from "react";
import { map, filter, prop, propEq, groupBy } from "ramda";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const getWinRateLabel = type => (wins, eventsByPeriod) => {
  if (!(eventsByPeriod && eventsByPeriod[type])) {
    return "";
  }
  return `${wins[type].length}/${eventsByPeriod[type].length} (${Math.round(
    (wins[type].length / eventsByPeriod[type].length) * 100
  )}%)`;
};
export const filterWins = filter(
  event => event.eventData.faceoffType === "WIN"
);

export default function FaceoffBasic(props) {
  const { type, events, label } = props;
  const typeEvents = filter(propEq("type", "FACEOFF"));
  const getEventsByPeriod = groupBy(prop("period"));
  const eventsFiltered = typeEvents(events);
  const winsOnly = filterWins(eventsFiltered);
  const eventsByPeriod = getEventsByPeriod(eventsFiltered);
  const wins = getEventsByPeriod(winsOnly);
  console.log(wins);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{label}</TableCell>
          <TableCell>
            {winsOnly.length}/{eventsFiltered.length}{" "}
            {`(${Math.round((winsOnly.length / eventsFiltered.length) * 100)}%)`}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>1st period</TableCell>
          <TableCell>
            {getWinRateLabel("FIRST")(wins, eventsByPeriod)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2nd period</TableCell>
          <TableCell>
            {getWinRateLabel("SECOND")(wins, eventsByPeriod)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>3rd period</TableCell>
          <TableCell>
            {getWinRateLabel("THIRD")(wins, eventsByPeriod)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
