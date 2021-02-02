import { reducer as weatherReducer } from '../Features/Weather/reducer';
import dashboardReducer from '../Features/Dashboard/reducer';

export default {
  weather: weatherReducer,
  dashboard: dashboardReducer
};
