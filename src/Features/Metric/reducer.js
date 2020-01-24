import { createSlice } from 'redux-starter-kit';

const initialState = {
    selectedMetrics: []
}

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    addMetric: (state, action) => {
      state.selectedMetrics = action.payload.selectedMetrics
    },
    metricApiErrorReceived: (state, action) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
