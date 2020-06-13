import React from "react";
import useSWR from "swr";
import firebase from "../firebase/firebase";
const db = firebase.firestore();

const mapData = (querySnapshot) => {
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
const queryFirebase = async (query) =>
  new Promise((resolve, reject) => {
    db.collection(query).onSnapshot((snapshot) => {
      resolve(mapData(snapshot));
    });
  });

export const useQuery = (key) => {
  const { data, error } = useSWR(key, queryFirebase);
  return data
};
