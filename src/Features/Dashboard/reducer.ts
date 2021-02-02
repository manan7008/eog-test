import * as actions from "../../store/actions";

const initialState = {
  metrics: [],
  measurements: []
};

const metricsDataReceived = (state: any, action: any) => {
  const { getMetrics } = action;

  return {
    ...state,
    metrics: getMetrics
  };
};

const measurementsDataReceived = (state: any, action: any) => {
  const { getMultipleMeasurements } = action;
  return {
    ...state,
    measurements: getMultipleMeasurements
  };
};

const handlers: any = {
  [actions.METRICS_DATA_RECEIVED]: metricsDataReceived,
  [actions.MEASUREMENTS_DATA_RECEIVED]: measurementsDataReceived
};

export default (state = initialState, action: any) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
