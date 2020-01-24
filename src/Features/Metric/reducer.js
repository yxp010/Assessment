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
    metricApiErrorReceived: (state, action) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
