import React, { useState, useEffect } from "react";
import TeamsComponent from "./TeamsComponent";
import { useAddTeamMutation } from "./mutations";
import { useTeams } from "../../common/hooks/useTeams";

const TeamsContainer = props => {
  const teams = useTeams();
  const [newTeamDialogOpen, setNewTeamDialogOpen] = useState(false);
  const addTeam = useAddTeamMutation();
  if (!teams) return <p>Loading...</p>;

  const onAddNewTeam = values => {
    addTeam({ variables: values });
    setNewTeamDialogOpen(false);
  };

  return (
    <TeamsComponent
      newTeamDialogOpen={newTeamDialogOpen}
      setNewTeamDialogOpen={setNewTeamDialogOpen}
      onAddNewTeam={onAddNewTeam}
      teams={teams}
    />
  );
};
export default TeamsContainer;
