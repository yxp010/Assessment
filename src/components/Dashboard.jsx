import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MetricSelect from '../Features/Metric/MetricSelect'
import MetricCards from '../Features/Metric/MetricCards'
import { useDispatch } from 'react-redux';
import { useQuery } from 'urql';
import { actions } from '../Features/Metric/reducer';
import MetricChart from '../Features/Metric/MetricChart'

const useStyles = makeStyles({
  dashboard: {
    padding: '24px',
    width: '100%',
    height: '100%'
  },
});

const query = `
query {
  getMetrics
}
`;

export default function Dashborad() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [result] = useQuery({ query });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.metricApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    console.log("render dashboard")
    // set metrics to redux store
    dispatch(actions.setMetrics({ allMetrics: getMetrics }))
  }, [dispatch, data, error]);

  return (
    <div className={classes.dashboard}>
        <MetricSelect />
        <MetricCards />
        <MetricChart />
    </div>
  );
};
