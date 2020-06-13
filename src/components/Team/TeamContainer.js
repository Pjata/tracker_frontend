import React, { useState } from "react";
import TeamComponent from "./TeamComponent";
import useTeamHook from "./TeamHook/useTeamHook";
const getPlayerInput = (playerInput) => ({
  name: playerInput.name,
  number: Number(playerInput.number),
  trackerID: playerInput.trackerID,
  position: playerInput.position,
  row: Number(playerInput.row),
});
const TeamContainer = (props) => {
  const [activeModule, setActiveModule] = useState(0);
  const teamId = props.match.params.id;
  const [
    data,
    updatePlayer,
    addPlayer,
    deletePlayer,
    addMatch,
    updateMatch,
  ] = useTeamHook(props.match.params.id);

  if (!data) return <p>Loading...</p>;

  const onPlayerUpdate = (newData, oldData) => {
    return new Promise((resolve, reject) => {
      const { id, ...playerInput } = newData;
      updatePlayer({
        variables: {
          playerId: id,
          playerInput: getPlayerInput(playerInput),
        },
      });
      resolve();
    });
  };
  const onPlayerAdd = (newData) => {
    return new Promise((resolve, reject) => {
      const { id, ...playerInput } = newData;
      addPlayer({
        variables: {
          teamId,
          playerInput: {
            ...getPlayerInput(playerInput),
          },
        },
      });
      resolve();
    });
  };
  const onMatchAdd = (newData) => {
    return new Promise((resolve, reject) => {
      addMatch({
        variables: {
          ...newData,
          homeTeamId: "5d43f02a08d1d35013f5b38b",
          awayTeamId: newData.awayTeam.id,
        },
      });
      console.log(newData);
      resolve();
    });
  };
  const onMatchUpdate = ({ id, ...rest }) => {
    debugger;
    return new Promise((resolve, reject) => {
      updateMatch({
        variables: {
          matchId: id,
          ...rest,
        },
      });
      resolve();
    });
  };
  const onPlayerDelete = (newData) => {
    return new Promise((resolve, reject) => {
      const { id } = newData;
      deletePlayer({
        variables: {
          playerId: id,
        },
      });
      resolve();
    });
  };
  return (
    <TeamComponent
      data={data}
      activeModule={activeModule}
      onMatchAdd={onMatchAdd}
      onMatchUpdate={onMatchUpdate}
      setActiveModule={setActiveModule}
      onPlayerUpdate={onPlayerUpdate}
      onPlayerAdd={onPlayerAdd}
      onPlayerDelete={onPlayerDelete}
    />
  );
};

export default TeamContainer;
