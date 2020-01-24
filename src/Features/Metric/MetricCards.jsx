import React, { useEffect, useState, useRef } from 'react';
import { actions } from './reducer';
import { useSelector } from 'react-redux';
import { useSubscription } from 'urql';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MetricCard from './MetricCard';

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

const getMetrics = state => {
  const { selectedMetrics } = state.metrics;
  return selectedMetrics;
};

export default function MetricCards() {
  const classes = useStyles();
  // const ref = useRef();
  const selectedMetrics = useSelector(getMetrics);
  // const [result] = useSubscription({ query })

  // console.log(result)
  // debugger
  const formCards = cards => {
    return cards.map((c, idx) => <MetricCard metric={c} key={idx} />);
  };

  if (!selectedMetrics) return null;

  return formCards(selectedMetrics);
}
