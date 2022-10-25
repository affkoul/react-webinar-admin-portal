import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// materia-ui/core
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: { direction: "ltr" },
  link: {
    textDecoration: "none",
    display: "inline-block",
  },
});

function LinkWrapper({ children, ...props }) {
  const classes = useStyle();

  return (
    <Link className={classes.link} {...props}>
      {children}
    </Link>
  );
}

LinkWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LinkWrapper;
