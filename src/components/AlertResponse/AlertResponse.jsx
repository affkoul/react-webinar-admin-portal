import React from "react";
import PropTypes from "prop-types";

// material-ui/core
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// material-ui/lab
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  root: { direction: "ltr" },
  alertText: {
    whiteSpace: "pre-wrap",
    textAlign: "left",
  },
}));

function AlertResponse({ message, type }) {
  const classes = useStyles();

  return (
    <div>
      {message && (
        <Alert variant="filled" elevation={2} severity={type}>
          <Typography variant="body1" className={classes.alertText}>
            {message}
          </Typography>
        </Alert>
      )}
    </div>
  );
}

AlertResponse.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

AlertResponse.defaultProps = {
  message: null,
  type: "error",
};

export default AlertResponse;
