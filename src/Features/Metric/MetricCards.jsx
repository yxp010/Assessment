import React from 'react';
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
query {
  getMetrics
}
`;

const getMetrics = state => {
  const { selectedMetrics } = state.metrics;
  return selectedMetrics;
};

export default function MetricCards() {
  const classes = useStyles();

  const formCards = cards => {
    return cards.map((c, idx) => {
      return (
        <Card key={idx} className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {c}
            </Typography>
          </CardContent>
        </Card>
      );
    });
  };

  const selectedMetrics = useSelector(getMetrics);
  console.log(selectedMetrics);
  // console.log(useSelector(state => state.me))
  if (selectedMetrics && selectedMetrics.length === 0) return null;

  return formCards(selectedMetrics);
}
