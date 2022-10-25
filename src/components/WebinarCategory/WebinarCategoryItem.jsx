import React from "react";
import PropTypes from "prop-types";

// material-ui/core
import { ListItem, ListItemText, Divider, IconButton } from "@material-ui/core";

// material-ui/icons
import EditIcon from "@material-ui/icons/Edit";
// components
import LinkWrapper from "components/Link/LinkWrapper";

import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: { direction: "ltr" },
}));

function WebinarCategoryItem({ webinarCategory, index }) {
  const classes = useStyle();
  return (
    <>
      {index !== 0 && <Divider />}
      <ListItem key={webinarCategory.categoryId} className={classes.root}>
        <ListItemText
          primary={webinarCategory.category}
          inset={
            !webinarCategory.children || webinarCategory.children.length === 0
          }
        />

        <LinkWrapper
          to={`/webinarCategory/edit/${webinarCategory.categoryId}`}
          className={classes.root}
        >
          <IconButton>
            <EditIcon />
          </IconButton>
        </LinkWrapper>
      </ListItem>
    </>
  );
}

WebinarCategoryItem.propTypes = {
  webinarCategory: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};

export default WebinarCategoryItem;
