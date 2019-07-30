import React from "react"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import styled from "@material-ui/styles/styled"
import Box from "@material-ui/core/Box"
import { Link } from "react-router-dom"
const CenteredText = styled(Typography)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
})
const CardStyled = styled(Card)({
  height: "250px"
})
const CardMediaStyled = styled(CardMedia)({
  height: "150px"
})

const Container = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  width: "700px",
  gridGap: "48px",
  padding: "24px"
})

const TeamCard = ({ name, logo, id }) => (
  <Link to={`/app/team/${id}`}>
    <CardStyled>
      <CardMediaStyled image={logo} />
      <CardContent>
        <CenteredText variant={"h5"}>{name}</CenteredText>
      </CardContent>
    </CardStyled>
  </Link>
)
const TeamsComponent = ({ teams }) => {
  return (
    <Container>
      {teams.map(team => <TeamCard key={team.name} {...team} />)}
    </Container>
  )
}
export default TeamsComponent
