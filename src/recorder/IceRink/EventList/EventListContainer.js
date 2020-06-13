import React, { useState, useMemo, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Events from "../Events";
import query from "./query";
import { update, add, getOptimisticResponse, deleteQuery } from "./mutations";
import firebase from "../../../common/firebase/firebase";
import { RecordStateContext } from "../RecordState";

const db = firebase.firestore();

export const mapData = (querySnapshot) => {
  console.log(querySnapshot);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const useEvents = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(RecordStateContext);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      db.collection(
        `teams/5d43f02a08d1d35013f5b38b/matches/${id}/events`
      ).onSnapshot((snapshot) => {
        if (snapshot.metadata.hasPendingWrites) {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "modified") {
              dispatch({
                type: "SELECTED_EVENT",
                data: addColorToEvent({
                  id: change.doc.id,
                  ...change.doc.data(),
                }),
              });
            }
          });
        }
        setData(mapData(snapshot));
        setLoading(false);
      });
    }
    fetch();
  }, [dispatch, id]);

  return [loading, data];
};

export const addColorToEvent = (event) => ({
  ...event,
  color: Events[event.type].color,
});

const EventListContainer = (props) => {
  const { children, matchId } = props;
  const [deleteEventMutation] = useMutation(deleteQuery);

  const [loading, data] = useEvents(matchId);

  const mappedEvents = (() => {
    if (loading || !data) {
      return [];
    }
    const events = data;
    return events ? events.map(addColorToEvent) : [];
  })();

  if (loading) return <p>Loading...</p>;
  if (!data) {
    return <div />;
  }
  const deleteEvent = (event) => {
    deleteEventMutation({
      variables: {
        eventId: event.id,
      },
    });
  };

  return children(mappedEvents, deleteEvent);
};
export default EventListContainer;
