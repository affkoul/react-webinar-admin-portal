import React from "react";
import PropTypes from "prop-types";

// material-ui/core
import { FormControl, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: { direction: "ltr" },
}));

function SelectWrapper({
  label,
  labelId,
  id,
  name,
  value,
  onChange,
  children,
  ...other
}) {
  const classes = useStyle();
  return (
    <FormControl
      variant="outlined"
      className={classes.root}
      margin="normal"
      fullWidth
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        {...other}
      >
        {children}
      </Select>
    </FormControl>
  );
}

SelectWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // value: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

SelectWrapper.defaultProps = {
  children: <div />,
};

export default SelectWrapper;
