import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";

// material-ui/icons
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";

// utils
import { getAdmin } from "utils/commonUtils";
import api from "utils/api";

const useStyle = makeStyles((theme) => ({
  root: { direction: "ltr" },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  user: {
    marginRight: theme.spacing(1),
  },
}));

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.reload();
};

function Header() {
  const classes = useStyle();
  const history = useHistory();

  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const { adminId } = getAdmin(localStorage.getItem("authToken"));

    const getContentList = () => {
      api
        .getAdmin({
          urlParams: { id: adminId },
        })
        .then((res) => {
          setAdmin(res.data);
        })
        .catch((err) => {
          if (err && err.response && err.response.status === 401) {
            localStorage.removeItem("authToken");
            window.location.reload();
          }
        });
    };

    getContentList();
  }, []);

  const changeRoute = (route) => {
    history.push(route);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          Webinar system
        </Typography>
        {admin._id && (
          <Typography variant="h6" className={classes.user}>
            {admin.name} ({admin.username})
          </Typography>
        )}
        <IconButton
          color="inherit"
          onClick={() => {
            changeRoute("/account");
          }}
          title="Account"
        >
          <PersonIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleLogout} title="Exit">
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
