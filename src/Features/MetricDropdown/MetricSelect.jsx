import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { actions } from './reducer';
import { useDispatch, useSelector } from 'react-redux';

const query = `
query($latLong: WeatherQuery!) {
  getWeatherForLocation(latLong: $latLong) {
    description
    locationName
    temperatureinCelsius
  }
}
`;

const metrics = [
  {
    value: 'waterTemp',
    key: 0,
    text: 'waterTemp',
  },
  {
    value: 'otherTemp',
    key: 1,
    text: 'otherTemp',
  },
];

export default function MetricSelect() {
  const dispatch = useDispatch();
  const handleChange = (e, { value }) => dispatch(actions.addMetric({selectedMetrics: value}))
  return <Dropdown onChange={handleChange} placeholder="Select metrics" fluid multiple search selection options={metrics}/>;
}
