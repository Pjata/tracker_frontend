import React, { Component } from "react";
import Select from "react-select";
import useTeamHook from "../../IceRink/PlayerSelector/TeamHook/useTeamHook";

const PlayerFilter = ({ selectedPlayers, onChange }) => {
  const [loading, error, data] = useTeamHook("5d43f02a08d1d35013f5b38b");
  if (loading && !data) {
    return null;
  }
  if (error) {
    return <div>Error</div>;
  }
  const players =
    data && data.team && data.team.players.sort((a, b) => a.number - b.number);
  const options =
    players &&
    players.map(player => ({
      value: player.id,
      label: `${player.number} ${player.name}`
    }));
  return (
    <Select
      options={options}
      value={selectedPlayers}
      onChange={onChange}
      placeholder="Players..."
      isMulti
    />
  );
};

export default PlayerFilter;
