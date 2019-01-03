import { createStore } from 'redux';
import initialState from './initial-state';
import reducers from './reducers';

const reducer = (state = initialState, action) => {
  const designatedReducer = reducers[action.type];
  if (designatedReducer)
    return designatedReducer(Object.assign({}, state), action.payload);
  return state;
};

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
