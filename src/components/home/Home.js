import React from "react";
import Input from "@mui/material/Input";
import { Paper, TextField } from "@material-ui/core";
import useStyles from "./styles";

function Home() {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <h4>Digital logic circuit similator</h4>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        type="string"
      />
    </Paper>
  );
}

export default Home;
