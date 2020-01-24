import React, { useEffect, useState } from 'react';
import { actions } from './reducer';
import { useSelector } from 'react-redux';
import { useQuery } from 'urql';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const getMeasurements = state => {
  const { allMeasurements } = state.metrics;
  return { allMeasurements };
};

export default function MetricCards({ metric }) {
  const classes = useStyles();
  const [value, setValue] = useState();
  const { allMeasurements } = useSelector(getMeasurements)
  const measurements = allMeasurements[metric]
  const lastValue = measurements[measurements.length - 1].value

  return (
    <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {metric}
            </Typography>
            <Typography variant="h5" component="h2">
              {lastValue}
            </Typography>
          </CardContent>
        </Card>
  )
}
