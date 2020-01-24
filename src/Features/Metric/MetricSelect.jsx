import React, { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { actions } from './reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';



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
  const { allMetrics } = state.metrics;
  // debugger
  return allMetrics;
};

export default function MetricSelect() {
  const metrics = useSelector(getMetrics);

  const dispatch = useDispatch();
  const handleChange = (e, { value }) => dispatch(actions.addMetric({ selectedMetrics: value }));

  if (!metrics || metrics.length <= 0) return <LinearProgress />;
  return (
    <Dropdown onChange={handleChange} placeholder="Select metrics" fluid multiple search selection options={formMetrics(metrics)} />
  );
}
