import React, { useState } from "react";

// material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

// material-ui/icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// components
import AlertResponse from "components/AlertResponse/AlertResponse";

// utils
import api from "utils/api";

const useStyle = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: { direction: "ltr" },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginBox() {
  const classes = useStyle();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setServerError(null);
    api
      .postLogin({
        data: {
          username,
          password,
        },
      })
      .then((res) => {
        if (res.data) {
          localStorage.setItem("authToken", res.data.token);
          window.location.reload();
        } else {
          setServerError("Error in authentication. Please try again.");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setServerError(err.response.data.message);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login to the webinar system panel
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="user name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            value={username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
          <AlertResponse message={serverError} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            log in
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default LoginBox;
