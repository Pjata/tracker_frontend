import { gql } from "apollo-boost";
import { eventFragment } from "./fragments";
export const update = gql`
  mutation UpdateEvent($eventId: ID!, $eventInput: EventInput!) {
    updateEvent(eventId: $eventId, eventInput: $eventInput) {
      ...EventFragment
    }
  }
  ${eventFragment}
`;

export const add = gql`
  mutation AddEvent($matchId: ID!, $eventInput: EventInput!) {
    addEvent(matchId: $matchId, eventInput: $eventInput) {
      ...EventFragment
    }
  }
  ${eventFragment}
`;

export const deleteQuery = gql`
  mutation DeleteEvent($eventId: ID!) {
    deleteEvent(eventId: $eventId)
  }
`;

export const getOptimisticResponse = event => ({
  __typename: "Event",
  time: event.time,
  realTime: event.realTime,
  type: event.type,
  id: event.id || "sdsfd",
  position: {
    __typename: "Position",
    ...event.position
  },
  player: event.player || {
    __typename: "Player",
    id: "none",
    name: "",
    number: 0
  }
});
