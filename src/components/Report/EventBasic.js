import React from 'react'
import {map,filter,prop, propEq, groupBy} from 'ramda'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function EventBasic(props){
  const {type, events, label} = props
  const typeEvents = filter(propEq('type',type))
  const getEventsByPeriod = groupBy(prop('period'))
  const eventsFiltered = (typeEvents(events))
  const eventsByPeriod = getEventsByPeriod(eventsFiltered)

  return <Table>
    <TableHead>
      <TableRow>
        <TableCell>{label}</TableCell>
        <TableCell>{eventsFiltered.length}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>1st period</TableCell>
        <TableCell>{eventsByPeriod.FIRST && eventsByPeriod.FIRST.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>2nd period</TableCell>
        <TableCell>{eventsByPeriod.SECOND && eventsByPeriod.SECOND.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>3rd period</TableCell>
        <TableCell>{eventsByPeriod.THIRD && eventsByPeriod.THIRD.length}</TableCell>
      </TableRow>
    </TableBody>
    </Table>
}