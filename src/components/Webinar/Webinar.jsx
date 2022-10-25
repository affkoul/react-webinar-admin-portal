import React, { useState, useEffect, useCallback } from "react";

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
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

// components
import LinkWrapper from "components/Link/LinkWrapper";
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

function Webinar() {
  const classes = useStyle();
  const [webinarList, setWebinarList] = useState([]);
  const [serverError, setServerError] = useState(null);

  const getWebinarList = useCallback(() => {
    api
      .getWebinarList()
      .then((res) => {
        setWebinarList(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setServerError(err.response.data.message);
        }
      });
  }, []);
  useEffect(() => {
    getWebinarList();
  }, [getWebinarList]);

  const handleSetAccepted = (webinarId, name, email, status) => {
    api
      .patchAcceptedWebinar({
        urlParams: { id: webinarId },
        data: {
          isAccepted: status,
          isRequestAccept: !!email,
          lecturerEmail: email,
          webinarTitle: name,
        },
      })
      .then(() => {
        getWebinarList();
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setServerError(err.response.data.message);
        }
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <LinkWrapper to="/webinar/edit">
          <Button variant="contained" color="secondary">
            New webinar
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
                <TableCell>Photo</TableCell>
                <TableCell>Webinar name</TableCell>
                <TableCell>Webinar level</TableCell>
                <TableCell>Holding time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Speakers</TableCell>
                <TableCell>Operation</TableCell>
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
                  <TableCell>{webinar.username}</TableCell>
                  <TableCell>
                    <div className={classes.statusIconBox}>
                      <LinkWrapper to={`/webinar/user/${webinar.webinarId}`}>
                        <IconButton>
                          <PeopleAltIcon />
                        </IconButton>
                      </LinkWrapper>
                      <LinkWrapper to={`/webinar/edit/${webinar.webinarId}`}>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </LinkWrapper>
                      {webinar.isAccepted === 1 && (
                        <IconButton
                          onClick={() =>
                            handleSetAccepted(
                              webinar.webinarId,
                              webinar.name,
                              webinar.email,
                              false
                            )
                          }
                        >
                          <ThumbDownIcon />
                        </IconButton>
                      )}
                      {webinar.isAccepted === 0 && (
                        <IconButton
                          onClick={() =>
                            handleSetAccepted(
                              webinar.webinarId,
                              webinar.name,
                              webinar.email,
                              true
                            )
                          }
                        >
                          <ThumbUpIcon />
                        </IconButton>
                      )}
                    </div>
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
export default Webinar;
