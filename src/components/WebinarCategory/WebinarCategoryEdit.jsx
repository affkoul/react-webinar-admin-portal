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

function WebinarCategoryEdit() {
  const classes = useStyle();
  const history = useHistory();
  const { id } = useParams();

  const [serverError, setServerError] = useState(null);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getWebinarCategory = () => {
      console.log("ID", id);
      api
        .getWebinarCategory({
          urlParams: {
            id,
          },
        })
        .then((res) => {
          const objCategory = res.data;
          setCategory(objCategory.category);
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            setServerError(err.response.data.message);
          }
        });
    };

    if (id) {
      getWebinarCategory();
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("inja");
    setServerError(null);
    api
      .patchPostWebinarCategory({
        urlParams: { id },
        data: {
          category,
        },
      })
      .then(() => {
        console.log("here?");
        history.push(`/webinarCategory`);
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
                {id ? `Edit Webinar category` : `New Webinar category`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldWrapper
                label="Webinar category"
                id="category"
                name="category"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
                required
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
              <LinkWrapper to="/webinarCategory">
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
export default WebinarCategoryEdit;
