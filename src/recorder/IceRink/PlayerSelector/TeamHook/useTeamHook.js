import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks/lib/index";
import { query } from "./query";
import firebase from "../../../../common/firebase/firebase";
import {
  updatePlayerMutation,
  addPlayerMutation,
  deletePlayerMutation,
} from "./mutations";
import { mapData } from "../../EventList/EventListContainer";

const db = firebase.firestore();

export const useTeam = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);

      db.collection(`teams/${id}/players`)
        .onSnapshot((snapshot) => {
          setData({players: mapData(snapshot)});
          setLoading(false);
        });
    }
    fetch();
  }, [id]);
  console.log(data);

  return [loading, data];
};

export const useTeamHook = (teamId) => {
  const [loading, data] = useTeam(teamId);
  const [updatePlayer] = useMutation(updatePlayerMutation);
  const [addPlayer] = useMutation(addPlayerMutation, {
    update: (cache, { data: { addPlayer } }) => {
      const { team } = cache.readQuery({
        query,
        variables: {
          teamId,
        },
      });
      team.players.push(addPlayer);
      cache.writeQuery({
        query,
        data: { team },
      });
    },
  });
  const [deletePlayer] = useMutation(deletePlayerMutation, {
    update: (cache, { data: { deletePlayer } }) => {
      const { team } = cache.readQuery({
        query,
        variables: {
          teamId,
        },
      });
      team.players = team.players.filter(
        (player) => player.id !== deletePlayer
      );
      cache.writeQuery({
        query,
        data: { team },
      });
    },
  });
  return [loading, null, data, updatePlayer, addPlayer, deletePlayer];
};

export default useTeamHook;
