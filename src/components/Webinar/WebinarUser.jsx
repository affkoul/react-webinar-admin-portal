/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
} from "@material-ui/core";

// components
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
  featuredImage: {
    maxHeight: "50px",
  },
  accept: {
    color: theme.palette.success.main,
  },
  reject: {
    color: theme.palette.error.main,
  },
  statusIconBox: {
    display: "flex",
    flexDirection: "row-reverse",
  },
}));

function WebinarUser() {
  const classes = useStyle();
  const [userList, setUserList] = useState([]);
  const [serverError, setServerError] = useState(null);

  const { id } = useParams();

  console.log("ID", id);

  useEffect(() => {
    api
      .getWebinarUsers({ urlParams: { id } })
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setServerError(err.response.data.message);
        }
      });
  }, [id]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <AlertResponse message={serverError} />
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.indexColumn}>row</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
export default WebinarUser;
