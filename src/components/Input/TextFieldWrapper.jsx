import React from "react";

// material-ui/core
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: { direction: "ltr" },
}));

function TextFieldWrapper({ ...props }) {
  const classes = useStyle();
  return (
    <TextField
      variant="outlined"
      className={classes.root}
      margin="normal"
      fullWidth
      {...props}
    />
  );
}

export default TextFieldWrapper;
