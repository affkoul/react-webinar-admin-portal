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

function Admin() {
  const classes = useStyle();
  const [adminList, setAdminList] = useState([]);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    api
      .getAdminList()
      .then((res) => {
        setAdminList(res.data);
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
        <LinkWrapper to="/admin/edit">
          <Button variant="contained" color="secondary">
            New admin
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
              {adminList.map((admin, index) => (
                <TableRow key={admin.adminId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.username}</TableCell>
                  <TableCell>{admin.phoneNumber}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <LinkWrapper to={`/admin/edit/${admin.adminId}`}>
                      <IconButton>
                        <EditIcon />
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
export default Admin;
