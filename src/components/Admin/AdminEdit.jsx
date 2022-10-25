import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

// material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button } from "@material-ui/core";

// components
import LinkWrapper from "components/Link/LinkWrapper";
import TextFieldWrapper from "components/Input/TextFieldWrapper";
import AlertResponse from "components/AlertResponse/AlertResponse";

// utils
import api from "utils/api";

const useStyle = makeStyles((theme) => ({
  root: { direction: "ltr" },
  container: {
    padding: theme.spacing(1),
  },
  submit: {
    marginRight: theme.spacing(1),
  },
  fileInput: {
    display: "none",
  },
  featuredImage: {
    maxWidth: "100%",
    maxHeight: "200px",
  },
}));

function AdminEdit() {
  const classes = useStyle();
  const history = useHistory();
  const { id } = useParams();

  const [serverError, setServerError] = useState(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getAdmin = () => {
      console.log("ID", id);
      api
        .getAdmin({
          urlParams: {
            id,
          },
        })
        .then((res) => {
          const admin = res.data;
          setName(admin.name);
          setPhoneNumber(admin.phoneNumber);
          setEmail(admin.email);
          setUsername(admin.username);
          setPassword(admin.password);
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            setServerError(err.response.data.message);
          }
        });
    };

    if (id) {
      getAdmin();
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("inja");
    setServerError(null);
    api
      .patchPostAdmin({
        urlParams: { id },
        data: {
          name,
          phoneNumber,
          email,
          username,
          password,
        },
      })
      .then(() => {
        console.log("here?");
        history.push(`/admin`);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setServerError(err.response.data.message);
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h5">
                {id ? `Admin edit` : `New admin`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldWrapper
                label="name"
                id="name"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldWrapper
                label="Cellular phone"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(event) => {
                  setPhoneNumber(event.target.value);
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldWrapper
                label="E-mail"
                id="email"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldWrapper
                label="username"
                id="username"
                name="username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextFieldWrapper
                label="Password"
                id="password"
                name="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
                type="password"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <AlertResponse message={serverError} />
            </Grid>
            <Grid item xs={11}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Record
              </Button>
              <LinkWrapper to="/admin">
                <Button variant="contained" color="default">
                  Opt out
                </Button>
              </LinkWrapper>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  );
}
export default AdminEdit;
