import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Card, CardContent } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
  root: {
    margin: theme.spacing(3),
    position: "relative",
    overflow: "visible",
    direction: "ltr",
  },
  main: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  items: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginTop: theme.spacing(1),
  },
  icon: (props) => ({
    boxShadow: theme.shadows[5],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: props.iconBgc,
    width: "75px",
    height: "75px",
    borderRadius: 5,
    position: "absolute",
    top: "-27px",
    left: "12px",
  }),
  pos: {
    fontSize: 38,
  },
  sub: {
    marginLeft: theme.spacing(3),
    paddingTop: theme.spacing(2),
  },
  card: {
    paddingBottom: "0px !important",
  },
}));

function ReportCard({ title, field, iconBgc, icon, multiItems, path }) {
  const classes = useStyle({ iconBgc });

  return (
    <Link className={classes.link} to={path}>
      <Card className={classes.root} elevation={4}>
        <CardContent className={classes.card}>
          <Grid className={classes.main}>
            <Typography variant="body1" component="h3" color="textSecondary">
              {title}
            </Typography>
            <div className={classes.icon}>{icon}</div>
          </Grid>
          {field.map((item) => (
            <div className={classes.items} key={item._id}>
              <Typography variant="h3" component="p" className={classes.pos}>
                {item.subTxt}
              </Typography>
              {multiItems && (
                <Typography
                  variant="body1"
                  component="p"
                  color="textSecondary"
                  className={classes.sub}
                >
                  {item.sub}
                </Typography>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}
ReportCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  field: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  multiItems: PropTypes.bool,
  iconBgc: PropTypes.string,
  path: PropTypes.string.isRequired,
};
ReportCard.defaultProps = {
  iconBgc: "#e53935",
  multiItems: false,
};

export default ReportCard;
