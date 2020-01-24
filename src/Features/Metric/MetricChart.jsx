import React, { useEffect, useState } from 'react';

import { actions } from './reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';

const getMultiMeasurements = `
   query($input:[MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        metric
        at 
        value
        unit
      }
    }
  }
`;

const before = Date.now();
const after = before - 30 * 60 * 1000;

const formInput = metrics => {
  return metrics.map(metricName => {
    return {
      metricName,
      after,
      before,
    };
  });
};

const getMetrics = state => {
  const { allMetrics, selectedMetrics, allMeasurements } = state.metrics;
  // debugger
  return { allMetrics, selectedMetrics, allMeasurements };
};

export default function MetricChart() {
  const dispatch = useDispatch();
  const { allMetrics, selectedMetrics, allMeasurements } = useSelector(getMetrics);

  let input = formInput(allMetrics);

  const [result] = useQuery({
    query: getMultiMeasurements,
    variables: {
      input,
    },
  });
  const { fetching, data, error } = result;
  //   debugger;
  useEffect(() => {
    if (error) {
      //   dispatch(actions.weatherApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;

    // Format the data to [{ metric: Array[{measurement}]}]
    const measurements = {};
    data.getMultipleMeasurements.forEach(m => {
      measurements[m.metric] = m.measurements;
    });
    dispatch(actions.setMeasurements({ allMeasurements: measurements }));
  }, [data, error, dispatch]);

  return null;
}
