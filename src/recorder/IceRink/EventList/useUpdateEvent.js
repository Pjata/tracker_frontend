import React, { useContext } from "react";
import { update, getOptimisticResponse } from "./mutations";
import { useMutation } from "@apollo/react-hooks";
import { addColorToEvent } from "./EventListContainer";

import firebase from '../../../common/firebase/firebase'

const db = firebase.firestore()

const updateEventFirestore = async ({ matchId, id, ...event }) => {
  return db
    .collection(`teams/5d43f02a08d1d35013f5b38b/matches/${matchId}/events`)
    .doc(id)
    .update(event);
};
export const useUpdateEvent = (dispatch) => {
  const updateEvent = async (updateableEvent) => {
    await updateEventFirestore(updateableEvent);
  };
  return updateEvent;
};

export default useUpdateEvent;
