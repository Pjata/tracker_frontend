import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { blue } from "@material-ui/core/colors";
import Img from "react-image";
import { StylesContext } from "@material-ui/styles/StylesProvider";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    display: "grid",
    gridTemplateColumns: "1fr",
    width: 300
  },
  logo: {
    width: 300,
    height: 200
  },
  buttons: {
    width: "100%",
    display: "flex",
    paddingTop: theme.spacing(2),
    justifyContent: "flex-end"
  }
}));

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open, onSubmit } = props;
  const [values, setValues] = useState({
    name: "",
    logoUrl: ""
  });

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  const onChange = key => event => {
    setValues({
      ...values,
      [key]: event.target.value
    });
  };

  const { name, logoUrl } = values;
  const enableAdd = name && logoUrl;
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className={classes.root}>
        <DialogTitle id="simple-dialog-title">Add new team</DialogTitle>
        <TextField
          label={"Team name"}
          value={name}
          onChange={onChange("name")}
        />
        <TextField
          label={"Team logo url"}
          value={logoUrl}
          onChange={onChange("logoUrl")}
        />

        <Img alt="logo" className={classes.logo} src={logoUrl} />
        <div className={classes.buttons}>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={!enableAdd}
            variant="contained"
          >
            Add
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default SimpleDialog;
