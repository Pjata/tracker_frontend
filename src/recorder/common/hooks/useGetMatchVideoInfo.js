import React, { useState, useEffect } from "react";
import { mapData } from "../../IceRink/EventList/EventListContainer";
import firebase from "../../../common/firebase/firebase";

const db = firebase.firestore();

const useGetMatchVideoInfo = (matchId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetch() {
      setLoading(true);
      db.collection(`teams/5d43f02a08d1d35013f5b38b/matches`)
        .doc(matchId)
        .onSnapshot((snapshot) => {
          setData({ id: snapshot.id, ...snapshot.data() });
          setLoading(false);
        });
    }
    fetch();
  }, [matchId]);

  return [loading, data];
};

export default useGetMatchVideoInfo;
