import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// material-ui/core
import { Typography, Card, CardContent, CardActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// utils
import { toFaDigit } from "utils/commonUtils";

const useStyle = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    overflow: "visible",
    direction: "ltr",
  },
  lineChartWrapper: {
    transform: "translate(0px,-43px)",
    overflow: "hidden",
    borderRadius: 5,
  },
  lineChart: (props) => ({
    boxShadow: theme.shadows[5],
    backgroundColor: props.chartBgc,
    height: "250px",
    borderRadius: 5,
    transform: "translate(-7%, 0px)",
    [theme.breakpoints.down("sm")]: {
      transform: "translate(0%, 0px)",
    },
    "& > svg": {
      paddingTop: theme.spacing(2),
      overflow: "visible",
      height: "215px",
    },
    "& > div:nth-child(2)": {
      transform: "translate(-20px,0px)",
      color: "#fff",
      padding: theme.spacing(1),
    },
    "& > div:nth-child(3)": {
      right: "0",
    },
  }),
  title: {
    fontSize: "20px",
    textAlign: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column-reverse",
  },
  moreIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  customTooltip: (props) => ({
    backgroundColor: props.toolTipBgc,
    marginLeft: theme.spacing(7.5),
    marginRight: theme.spacing(7.5),
    padding: theme.spacing(0.75),
    width: "160px",
    height: "100px",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
  }),
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0px",
    color: "black",
  },
  line1: (props) => ({
    color: props.line1Clr,
    margin: "0px",
  }),
  line2: (props) => ({
    color: props.line2Clr,
    margin: "0px",
  }),
  line3: (props) => ({
    color: props.line3Clr,
    margin: "0px",
  }),
}));

function ReportChart({
  data,
  XdataKey,
  title,
  chartBgc,
  toolTipBgc,
  children,
  line1DataKey,
  line2DataKey,
  line3DataKey,
  line1Clr,
  line2Clr,
  line3Clr,
}) {
  const classes = useStyle({
    chartBgc,
    toolTipBgc,
    line1Clr,
    line2Clr,
    line3Clr,
  });

  const [chartSize, setChartSize] = useState(500);

  useEffect(() => {
    const wt = document.querySelector("#LineChartWrapperId").offsetWidth;
    setChartSize(wt * 1.2);
  }, []);

  /* eslint-disable react/prop-types */

  const CustomizedXAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={-30}
          y={40}
          dy={-26}
          textAnchor="end"
          fill="#fff"
          transform="rotate(-40)"
          fontSize="16px"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const CustomizedYAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={-1} y={5} dy={0} textAnchor="end" fill="#fff" fontSize="16px">
          {toFaDigit(payload.value)}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className={classes.customTooltip}>
          <p className={classes.label}>{label}</p>
          <p className={classes.line1}>{`${line1DataKey} : ${
            payload && toFaDigit(payload[0].value)
          }`}</p>
          <p className={classes.line2}>{`${line2DataKey} : ${
            payload && toFaDigit(payload[1].value)
          }`}</p>
          <p className={classes.line3}>{`${line3DataKey} : ${
            payload && toFaDigit(payload[2].value)
          }`}</p>
        </div>
      );
    }

    return null;
  };
  /* eslint-enable react/prop-types */

  return (
    <Card className={classes.root} elevation={4}>
      <CardContent className={classes.card}>
        <Typography variant="h3" component="p" className={classes.title}>
          {title}
        </Typography>
        <div id="LineChartWrapperId" className={classes.lineChartWrapper}>
          <LineChart
            className={classes.lineChart}
            width={chartSize}
            height={250}
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={XdataKey}
              type="category"
              axisLine={false}
              tickLine={false}
              tick={<CustomizedXAxisTick />}
              tickMargin={10}
            />
            <YAxis
              tickMargin={20}
              axisLine={false}
              tickLine={false}
              tick={<CustomizedYAxisTick />}
            />
            <Tooltip content={<CustomTooltip backgroundColor={toolTipBgc} />} />
            <Legend />
            <Line
              type="monotone"
              dataKey={line1DataKey}
              stroke={line1Clr}
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey={line2DataKey}
              stroke={line2Clr}
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey={line3DataKey}
              stroke={line3Clr}
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </CardContent>
      <CardActions className={classes.moreIcon}>{children}</CardActions>
    </Card>
  );
}
ReportChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  XdataKey: PropTypes.string.isRequired,
  line1DataKey: PropTypes.string.isRequired,
  line2DataKey: PropTypes.string,
  line3DataKey: PropTypes.string,
  title: PropTypes.string.isRequired,
  toolTipBgc: PropTypes.string,
  chartBgc: PropTypes.string,
  children: PropTypes.node,
  line1Clr: PropTypes.string,
  line2Clr: PropTypes.string,
  line3Clr: PropTypes.string,
};
ReportChart.defaultProps = {
  toolTipBgc: "#fff",
  chartBgc: "#ec407a",
  line2DataKey: "",
  line3DataKey: "",
  line1Clr: "#1a2849",
  line2Clr: "#2b580c",
  line3Clr: "#407aec",
  children: <div />,
};
export default ReportChart;
