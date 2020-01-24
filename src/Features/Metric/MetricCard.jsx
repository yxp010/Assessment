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

const query = `
  query($metricName: String!) {
    getLastKnownMeasurement(metricName: $metricName) {
        value
      }
  }
`;

const getMetrics = state => {
  const { selectedMetrics } = state.metrics;
  return selectedMetrics;
};

export default function MetricCards({ metric }) {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [result] = useQuery({
      query,
      variables: {
          metricName: metric
      }
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      // dispatch(actions.weatherApiErrorReceived({ error: error.message }));
      console.log(error)
      return;
    }
    if (!data) return;
    const { getLastKnownMeasurement } = data;
    setValue(getLastKnownMeasurement.value)
  }, [data, error, setValue]);

  return (
    <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {metric}
            </Typography>
            <Typography variant="h5" component="h2">
              {value}
            </Typography>
          </CardContent>
        </Card>
  )
}
