import React, { useState, useEffect } from "react";

// material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
} from "@material-ui/core";

// material-ui/icons
import EditIcon from "@material-ui/icons/Edit";
import OndemandVideo from "@material-ui/icons/OndemandVideo";

// components
import LinkWrapper from "components/Link/LinkWrapper";
import AlertResponse from "components/AlertResponse/AlertResponse";

import api from "utils/api";

const useStyle = makeStyles((theme) => ({
  root: { direction: "ltr" },
  table: {
    minWidth: 650,
  },
  indexColumn: {
    width: "70px",
  },
  actionsColumn: {
    width: "80px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
}));

function User() {
  const classes = useStyle();
  const [userList, setUserList] = useState([]);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    api
      .getUserList()
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setServerError(err.response.data.message);
        }
      });
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <LinkWrapper to="/user/edit">
          <Button variant="contained" color="secondary">
            New user
          </Button>
        </LinkWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <AlertResponse message={serverError} />
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.indexColumn}>Row</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user, index) => (
                <TableRow key={user.userId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <LinkWrapper to={`/user/edit/${user.userId}`}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </LinkWrapper>
                    <LinkWrapper to={`/user/webinar/${user.userId}`}>
                      <IconButton>
                        <OndemandVideo />
                      </IconButton>
                    </LinkWrapper>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
export default User;
