import { createSlice } from 'redux-starter-kit';

const initialState = {
    selectedMetrics: [],
    allMetrics: []
}

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setMetrics: (state, action) => {
      state.allMetrics = action.payload.allMetrics
    },
    addMetric: (state, action) => {
      state.selectedMetrics = action.payload.selectedMetrics
    },
    setMeasurements: (state, action) => {
      state.allMeasurements = action.payload.allMeasurements
    },
    addMeasurement: (state, action) => {
      // remove the oldest measurement 
      // add the new measurement
      let measurements = state.allMeasurements[action.payload.metric]
      state.allMeasurements[action.payload.metric] = [...measurements, action.payload.newMeasurement]
    },
    metricApiErrorReceived: (state, action) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
