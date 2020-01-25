import React, { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { actions } from './reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';

const query = `
subscription {
  newMeasurement {
    metric
    at
    value
    unit
  }
}
`;

const formMetrics = metrics => {
  return metrics.map((m, idx) => {
    return {
      value: m,
      key: idx,
      text: m,
    };
  });
};

const getMetrics = state => {
  const { allMeasurements } = state.metrics;
  // debugger
  return { allMeasurements };
};

export default function MetricSelect() {
  const { allMeasurements } = useSelector(getMetrics);
  const dispatch = useDispatch();
  const [result] = useSubscription({ query })
  const { data, error } = result
  
  useEffect(() => {
    if (error) {
      console.log(error)
      return
    }

    // debugger
    if (!data) return
    if (!allMeasurements || allMeasurements && Object.keys(allMeasurements).length === 0) return

    // debugger
    let newMeasurement = data.newMeasurement
    let metric = newMeasurement.metric
    let time = newMeasurement.at
    let lastMeasurement = allMeasurements[metric][allMeasurements[metric].length - 1]

    // Compare if the subscription return the new data is newer last measurement for this metric
    if (lastMeasurement.at < time) {

      dispatch(actions.addMeasurement({metric, newMeasurement}))
    }
  }, [dispatch, data, error, allMeasurements])

  const handleChange = (e, { value }) => dispatch(actions.addMetric({ selectedMetrics: value }));

  if (!allMeasurements || allMeasurements && Object.keys(allMeasurements).length === 0) return <LinearProgress />;
  return (
    <Dropdown onChange={handleChange} placeholder="Select metrics" fluid multiple search selection options={formMetrics(Object.keys(allMeasurements))} />
  );
}
