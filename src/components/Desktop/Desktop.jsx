import React from "react";

// material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    maxWidth: "925px",
    direction: "ltr",
  },
});
function Desktop() {
  const classes = useStyle();

  return (
    <>
      <Grid container spacing={1} className={classes.root} />
    </>
  );
}

export default Desktop;
