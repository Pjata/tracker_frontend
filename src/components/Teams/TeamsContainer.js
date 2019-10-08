import React, { useState } from "react";
import TeamsComponent from "./TeamsComponent";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useAddTeamMutation } from "./mutations";

export const query = gql`
  {
    teams {
      id
      name
      logoUrl
    }
  }
`;

const TeamsContainer = props => {
  const { loading, error, data } = useQuery(query);
  const [newTeamDialogOpen, setNewTeamDialogOpen] = useState(false);
  const addTeam = useAddTeamMutation();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const onAddNewTeam = values => {
    addTeam({ variables: values });
    setNewTeamDialogOpen(false);
  };

  const { teams } = data;
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
