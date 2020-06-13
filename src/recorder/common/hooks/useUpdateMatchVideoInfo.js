import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import firebase from '../../../common/firebase/firebase'
const db = firebase.firestore()

const updateMatchVideoInfo = async ({matchId, matchVideoInfo}) => {
  return db
    .collection(`teams/5d43f02a08d1d35013f5b38b/matches`)
    .doc(matchId)
    .update({matchVideoInfo});
};
const useUpdateMatchVideoInfo = matchId => {
  return matchVideoInfo => updateMatchVideoInfo({ matchId, matchVideoInfo })
};

export default useUpdateMatchVideoInfo;
