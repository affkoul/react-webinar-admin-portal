import React from "react";
import { useHistory, useLocation } from "react-router-dom";

// material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Divider, List } from "@material-ui/core";

// material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import OndemandVideo from "@material-ui/icons/OndemandVideo";
import PeopleIcon from "@material-ui/icons/People";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";

// components
import SidebarItem from "components/Sidebar/SidebarItem";

const drawerWidth = 240;

const useStyle = makeStyles((theme) => ({
  root: { direction: "ltr" },
  toolbar: theme.mixins.toolbar,
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

function Sidebar() {
  const classes = useStyle();
  const history = useHistory();
  const location = useLocation();

  const changeRoute = (route) => {
    history.push(route);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <SidebarItem
          label="Dashboard"
          icon={<DashboardIcon />}
          onClick={() => {
            changeRoute("/");
          }}
          selected={location.pathname === "/"}
        />
      </List>
      <Divider />
      <SidebarItem
        label="Users"
        icon={<PeopleAltIcon />}
        onClick={() => {
          changeRoute("/user");
        }}
        selected={location.pathname === "/user"}
      />

      <SidebarItem
        label="Speakers"
        icon={<RecordVoiceOverIcon />}
        onClick={() => {
          changeRoute("/lecturer");
        }}
        selected={location.pathname === "/lecturer"}
      />

      <SidebarItem
        label="Admins"
        icon={<PeopleIcon />}
        onClick={() => {
          changeRoute("/admin");
        }}
        selected={location.pathname === "/admin"}
      />

      <Divider />

      <SidebarItem
        label="Webinars"
        icon={<OndemandVideo />}
        onClick={() => {
          changeRoute("/webinar");
        }}
        selected={location.pathname === "/webinar"}
      />

      <SidebarItem
        label="Categories of webinars"
        icon={<FormatAlignLeftIcon />}
        onClick={() => {
          changeRoute("/webinarCategory");
        }}
        selected={location.pathname === "/webinarCategory"}
      />
      <Divider />
    </Drawer>
  );
}

export default Sidebar;
