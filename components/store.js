import {createStore, applyMiddleware} from 'redux';
import reduxLogger from 'redux-logger';

// ACTION TYPES
const INCREMENT = 'INCREMENT';
const RECORD_MOVE = 'RECORD_MOVE';
const ADD_MARKER = 'ADD_MARKER'

// ACTION CREATORS
export const increment = () => ({
  type: INCREMENT
});

export const recordMove = (newPosition) => ({
    type: RECORD_MOVE,
    newPosition
  });

export const addMarker = () => ({
  type: ADD_MARKER,
});

  

const initialState = {
        latitude: 40.7751353,
        longitude: -73.9266018,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        history: [],
        record: true,
        markers: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case RECORD_MOVE:
        console.log('new state should be ', {
            ...state, 
            latitude: action.newPosition.latitude,
            longitude: action.newPosition.longitude,
            history: [...state.history, {latitude: action.newPosition.latitude, longitude: action.newPosition.longitude}]
        })
        return {
            ...state, 
            latitude: action.newPosition.latitude,
            longitude: action.newPosition.longitude,
            history: [...state.history, {latitude: action.newPosition.latitude, longitude: action.newPosition.longitude}]
        }
    case ADD_MARKER:
        return {
            ...state,
            markers: [...state.markers, {latitude: state.latitude, longitude: state.longitude, type: 'faStarExclamation'}]
        }    
    default:
      return state;
  }
};

const store = createStore(reducer);
//const store = createStore(reducer, applyMiddleware(reduxLogger));

export default store;
