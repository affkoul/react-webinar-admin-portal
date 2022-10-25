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
import { convertToJalali, getWebinarTier } from "utils/commonUtils";

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

function UserWebinar() {
  const classes = useStyle();
  const [webinarList, setWebinarList] = useState([]);
  const [serverError, setServerError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    api
      .getUserWebinars({ params: { userId: id } })
      .then((res) => {
        setWebinarList(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setServerError(err.response.data.message);
        }
      });
  }, []);

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
                <TableCell className={classes.indexColumn}>Row</TableCell>
                <TableCell>Photo</TableCell>
                <TableCell>Webinar name</TableCell>
                <TableCell>Webinar level</TableCell>
                <TableCell>Holding time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {webinarList.map((webinar, index) => (
                <TableRow key={webinar.webinarId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={webinar.featuredImage}
                      alt="Image"
                      className={classes.featuredImage}
                    />
                  </TableCell>
                  <TableCell>{webinar.name}</TableCell>
                  <TableCell>{getWebinarTier(webinar.tier)}</TableCell>
                  {/* <TableCell>{convertToJalali(webinar.time)}</TableCell> */}
                  <TableCell>{webinar.time}</TableCell>

                  <TableCell
                    className={
                      webinar.isAccepted ? classes.accept : classes.reject
                    }
                  >
                    {webinar.isAccepted ? "Confirmed" : "Not Confirmed"}
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
export default UserWebinar;
