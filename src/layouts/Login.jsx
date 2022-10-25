import React from "react";

// components
import LoginBox from "components/Login/LoginBox";

import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: { direction: "ltr" },
}));

function Login() {
  const classes = useStyle();
  return <LoginBox className={classes.root} />;
}

export default Login;
