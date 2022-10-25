import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// components
import Header from "components/Header/Header";
import Sidebar from "components/Sidebar/Sidebar";
import Desktop from "components/Desktop/Desktop";
import User from "components/User/User";
import UserEdit from "components/User/UserEdit";
import UserWebinar from "components/User/UserWebinar";
import Lecturer from "components/Lecturer/Lecturer";
import LecturerEdit from "components/Lecturer/LecturerEdit";
import LecturerWebinar from "components/Lecturer/LecturerWebinar";
import Webinar from "components/Webinar/Webinar";
import WebinarEdit from "components/Webinar/WebinarEdit";
import WebinarUser from "components/Webinar/WebinarUser";
import Admin from "components/Admin/Admin";
import AdminEdit from "components/Admin/AdminEdit";
import WebinarCategory from "components/WebinarCategory/WebinarCategory";
import WebinarCategoryEdit from "components/WebinarCategory/WebinarCategoryEdit";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    direction: "ltr",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Dashboard() {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Header />
      <Sidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/" component={Desktop} />
          <Route exact path="/user" component={User} />
          <Route exact path="/user/edit/:id?" component={UserEdit} />
          <Route exact path="/user/webinar/:id?" component={UserWebinar} />
          <Route exact path="/lecturer" component={Lecturer} />
          <Route exact path="/lecturer/edit/:id?" component={LecturerEdit} />
          <Route
            exact
            path="/lecturer/webinar/:id?"
            component={LecturerWebinar}
          />
          <Route exact path="/webinar" component={Webinar} />
          <Route exact path="/webinar/edit/:id?" component={WebinarEdit} />
          <Route exact path="/webinar/user/:id?" component={WebinarUser} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/edit/:id?" component={AdminEdit} />
          <Route exact path="/webinarCategory" component={WebinarCategory} />
          <Route
            exact
            path="/webinarCategory/edit/:id?"
            component={WebinarCategoryEdit}
          />

          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}

export default Dashboard;
