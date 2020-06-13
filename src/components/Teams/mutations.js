import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks/lib/index";
import { query } from "./TeamsContainer";

const addTeamMutation = gql`
  mutation addTeam($name: String!, $logoUrl: String!) {
    addTeam(name: $name, logoUrl: $logoUrl) {
      id
      name
      logoUrl
    }
  }
`;

export const useAddTeamMutation = () => {
  const [addTeam] = useMutation(addTeamMutation)
  return addTeam
};
