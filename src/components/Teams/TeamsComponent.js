import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styled from "@material-ui/styles/styled";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import NewTeamDialog from "./NewTeamDialog";

const CenteredText = styled(Typography)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});
const CardStyled = styled(Card)({
  height: "250px"
});
const CardMediaStyled = styled(CardMedia)({
  height: "150px"
});

const Container = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  width: "700px",
  gridGap: "48px",
  padding: "24px"
});

const useStyles = makeStyles(theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

const TeamCard = ({ name, logoUrl, id }) => (
  <Link to={`/app/team/${id}`}>
    <CardStyled>
      <CardMediaStyled image={logoUrl} />
      <CardContent>
        <CenteredText variant={"h5"}>{name}</CenteredText>
      </CardContent>
    </CardStyled>
  </Link>
);
const TeamsComponent = ({
  teams,
  newTeamDialogOpen,
  setNewTeamDialogOpen,
  onAddNewTeam
}) => {
  const classes = useStyles();
  const onOpenNewTeamDialog = ev => {
    setNewTeamDialogOpen(true);
  };
  const onCloseNewTeamDialog = ev => {
    setNewTeamDialogOpen(false);
  };
  return (
    <div>
      <NewTeamDialog
        open={newTeamDialogOpen}
        onClose={onCloseNewTeamDialog}
        onSubmit={onAddNewTeam}
      />
      <Container>
        {teams.map(team => (
          <TeamCard key={team.name} {...team} />
        ))}
      </Container>
      <Zoom in={true} unmountOnExit>
        <Fab
          className={classes.fab}
          aria-label={"add"}
          onClick={onOpenNewTeamDialog}
        >
          <AddIcon />
        </Fab>
      </Zoom>
    </div>
  );
};
export default TeamsComponent;
