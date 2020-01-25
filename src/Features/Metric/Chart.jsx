import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';
import React, { useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux'

const data = [
  { name: 1, cost: 4.11, impression: 100, "lol": 1232 },
  { name: 2, cost: 2.39, impression: 120, "lol": 1232 },
  { name: 3, cost: 1.37, impression: 150, "lol": 1232 },
  { name: 4, cost: 1.16, impression: 180, "lol": 1232 },
  { name: 5, cost: 2.29, impression: 200, "lol": 1232 },
  { name: 6, cost: 3, impression: 499, "lol": 1232 },
  { name: 7, cost: 0.53, impression: 50, "lol": 1232 },
  { name: 8, cost: 2.52, impression: 100, "lol": 1232 },
  { name: 9, cost: 1.79, impression: 200, "lol": 1232 },
  { name: 10, cost: 2.94, impression: 222, "lol": 1231},
  { name: 11, cost: 4.3, impression: 210, "lol": 1232 },
  { name: 12, cost: 4.41, impression: 300, "lol": 1232 },
  { name: 13, cost: 2.1, impression: 50, "lol": 1232 },
  { name: 14, cost: 8, impression: 190, "lol": 1232 },
  { name: 15, cost: 0, impression: 300, "lol": 1232 },
  { name: 16, cost: 9, impression: 400, "lol": 1232 },
  { name: 17, cost: 3, impression: 200, "lol": 1232 },
  { name: 18, cost: 2, impression: 50, "lol": 1232 },
  { name: 19, cost: 3, impression: 100, "lol": 1232 },
  { name: 20, cost: 7, impression: 100, "lol": 1232 }
];

const initialState = {
  data: data,
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 'dataMax+1',
  bottom: 'dataMin-1',
  top2: 'dataMax+20',
  bottom2: 'dataMin-20',
  animation: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setState':
      if (!action.payload || Object.keys(action.payload).length === 0) return state;
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const getAxisYDomain = (from, to, ref, offset) => {
  const refData = data.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach(d => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const getMetrics = state => {
  const { selectedMetrics, allMeasurements } = state.metrics;
  // debugger
  return { selectedMetrics, allMeasurements };
};

function timeConverter(timestamp){
  var a = new Date(timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

const formatChartData = (measurements, metrics) => {

}

export default function Chart( {metrics} ) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { allMeasurements } = useSelector(getMetrics)

  // if (!metrics || metrics.length === 0) return null

  // const zoom = () => {
  //   let { refAreaLeft, refAreaRight, data } = state;

  //   if (refAreaLeft === refAreaRight || refAreaRight === '') {
  //     dispatch({
  //       type: 'setState',
  //       payload: {
  //         refAreaLeft: '',
  //         refAreaRight: '',
  //       },
  //     });
  //     return;
  //   }

    // xAxis domain
    // if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // // yAxis domain
    // const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1);
    // const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, 'impression', 50);

  //   dispatch({
  //     type: 'setState',
  //     payload: {
  //       // refAreaLeft: '',
  //       // refAreaRight: '',
  //       data: data.slice(),
  //       // left: refAreaLeft,
  //       // right: refAreaRight,
  //       bottom,
  //       top,
  //       bottom2,
  //       top2,
  //     },
  //   });
  // };

  // const zoomOut = () => {
  //   const { data } = state;
  //   dispatch({
  //     type: 'setState',
  //     payload: {
  //       data: data.slice(),
  //       refAreaLeft: '',
  //       refAreaRight: '',
  //       left: 'dataMin',
  //       right: 'dataMax',
  //       top: 'dataMax+1',
  //       bottom: 'dataMin',
  //       top2: 'dataMax+50',
  //       bottom: 'dataMin+50',
  //     },
  //   });
  // };
  console.log(state)
  const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = state;

  if (!data) return null

  return (
    <div className="highlight-bar-charts">
      <LineChart
        width={800}
        height={400}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis allowDataOverflow={true} dataKey="name" domain={[left, right]} type="number" />
        <YAxis allowDataOverflow={true} type="number" yAxisId="1" />
        <YAxis orientation="left" allowDataOverflow={true} type="number" yAxisId="2" />
        <YAxis orientation="left" allowDataOverflow={true} type="number" yAxisId="3" />
        <Tooltip />
        <Line yAxisId="1" type="linear" dataKey="cost" stroke="#8884d8" animationDuration={300} />
        <Line yAxisId="2" type="linear" dataKey="impression" stroke="#82ca9d" animationDuration={300} />
        <Line yAxisId="3" type="linear" dataKey="lol" stroke="#eb3458" animationDuration={300} />

        {/* {refAreaLeft && refAreaRight ? (
          <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
        ) : null} */}
      </LineChart>
    </div>
  );
}
