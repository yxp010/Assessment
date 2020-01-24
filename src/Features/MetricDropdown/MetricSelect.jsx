import React, { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { actions } from './reducer';
import { useDispatch } from 'react-redux';
import { useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';

const query = `
query {
  getMetrics
}
`;

// const metrics = [
//   {
//     value: 'waterTemp',
//     key: 0,
//     text: 'waterTemp',
//   },
//   {
//     value: 'otherTemp',
//     key: 1,
//     text: 'otherTemp',
//   },
// ];

const formMetrics = (metrics) => {
  return metrics.map((m, idx) => {
    return {
      value: m,
      key: idx,
      text: m
    }
  })
}

export default function MetricSelect() {

  const [metrics, setMetics] = useState([])

  const dispatch = useDispatch();
  const handleChange = (e, { value }) => dispatch(actions.addMetric({selectedMetrics: value}))


  const [result] = useQuery({query})
  const { fetching, data, error } = result

  useEffect(() => {
    if (error) {
      dispatch(actions.weatherApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data
    setMetics(formMetrics(getMetrics))
  }, [dispatch, data, error, setMetics]);

  if (fetching) return <LinearProgress />;

  return <Dropdown onChange={handleChange} placeholder="Select metrics" fluid multiple search selection options={metrics}/>;
}
