import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MetricSelect from '../Features/Metric/MetricSelect'
import MetricCards from '../Features/Metric/MetricCards'

const useStyles = makeStyles({
  dashboard: {
    padding: '24px',
    width: '100%',
    height: '100%'
  },
});

export default function Dashborad() {
  const classes = useStyles();
  return (
    <div className={classes.dashboard}>
        <MetricSelect />
        <MetricCards />
    </div>
  );
};
