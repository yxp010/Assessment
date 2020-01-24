import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';
import React, { useReducer, useEffect } from 'react';


const initialState = {
  data,
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

export default function Chart() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const zoom = () => {
    let { refAreaLeft, refAreaRight, data } = state;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      dispatch({
        type: 'setState',
        payload: {
          refAreaLeft: '',
          refAreaRight: '',
        },
      });
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1);
    const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, 'impression', 50);

    dispatch({
      type: 'setState',
      payload: {
        refAreaLeft: '',
        refAreaRight: '',
        data: data.slice(),
        left: refAreaLeft,
        right: refAreaRight,
        bottom,
        top,
        bottom2,
        top2,
      },
    });
  };

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

  const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = state;

  return (
    <div className="highlight-bar-charts">
      <LineChart
        width={800}
        height={400}
        data={data}
        onMouseDown={e => dispatch({type: 'setState', payload: { refAreaLeft: e.activeLabel }})}
        onMouseMove={e => dispatch({type: 'setState', payload: { refAreaRight: e.activeLabel }})}
        onMouseUp={zoom}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis allowDataOverflow={true} dataKey="name" domain={[left, right]} type="number" />
        <YAxis allowDataOverflow={true} domain={[bottom, top]} type="number" yAxisId="1" />
        <YAxis orientation="right" allowDataOverflow={true} domain={[bottom2, top2]} type="number" yAxisId="2" />
        <Tooltip />
        <Line yAxisId="1" type="natural" dataKey="cost" stroke="#8884d8" animationDuration={300} />
        <Line yAxisId="2" type="natural" dataKey="impression" stroke="#82ca9d" animationDuration={300} />

        {refAreaLeft && refAreaRight ? (
          <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
        ) : null}
      </LineChart>
    </div>
  );
}
