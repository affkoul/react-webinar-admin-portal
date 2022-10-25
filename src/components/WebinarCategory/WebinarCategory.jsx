import React, { useState, useEffect } from "react";

// material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, List, ListSubheader, Button } from "@material-ui/core";

// components
import LinkWrapper from "components/Link/LinkWrapper";
import AlertResponse from "components/AlertResponse/AlertResponse";
import WebinarCategoryItem from "components/WebinarCategory/WebinarCategoryItem";

// utils
import api from "utils/api";

const useStyle = makeStyles({
  root: { direction: "ltr" },
  table: {
    minWidth: 650,
  },
  featuredImage: {
    maxWidth: "100%",
    maxHeight: "50px",
  },
  indexColumn: {
    width: "70px",
  },
  actionsColumn: {
    width: "140px",
  },
});

function WebinarCategory() {
  const classes = useStyle();

  const [webinarCategoryList, setWebinarCategoryList] = useState([]);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    const getWebinarCategoryList = () => {
      api
        .getWebinarCategoryList()
        .then((res) => {
          setWebinarCategoryList(res.data);
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            setServerError(err.response.data.message);
          }
        });
    };

    getWebinarCategoryList();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <LinkWrapper to="/webinarCategory/edit">
          <Button variant="contained" color="secondary">
            New webinar category
          </Button>
        </LinkWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <AlertResponse message={serverError} />
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={12} md={6}>
        <Paper>
          <List
            component="nav"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Categories of webinars
              </ListSubheader>
            }
            className={classes.root}
          >
            {webinarCategoryList.map((webinarCategory, index) => (
              <WebinarCategoryItem
                webinarCategory={webinarCategory}
                index={index}
                key={webinarCategory.id}
              />
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default WebinarCategory;
