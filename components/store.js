import {createStore} from 'redux';

// ACTION TYPES
const INCREMENT = 'INCREMENT';
const RECORD_MOVE = 'RECORD_MOVE';
const ADD_MARKER = 'ADD_MARKER'
const TOGGLE_RECORDING_STATUS = 'TOGGLE_RECORDING_STATUS'
const CLEAR_HISTORY = 'CLEAR_HISTORY'

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

export const toggleRecordingStatus = () => ({
    type: TOGGLE_RECORDING_STATUS
});
  
export const clearHistory = () => ({
    type: CLEAR_HISTORY
});

const initialState = {
        latitude: 40.7751353,
        longitude: -73.9266018,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        history: [],
        record: false,
        markers: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case RECORD_MOVE:
        if(state.record) {
            return {
                ...state, 
                latitude: action.newPosition.latitude,
                longitude: action.newPosition.longitude,
                history: [...state.history, {latitude: action.newPosition.latitude, longitude: action.newPosition.longitude}]
            }
        } else {
            return {
                ...state, 
                latitude: action.newPosition.latitude,
                longitude: action.newPosition.longitude,
            }
        }
        
    case ADD_MARKER:
        return {
            ...state,
            markers: [...state.markers, {latitude: state.latitude, longitude: state.longitude, type: 'faStarExclamation'}]
        }    
    case TOGGLE_RECORDING_STATUS:
        return {
            ...state,
            record: !state.record
        }
    case CLEAR_HISTORY:
        return {
            ...state,
            history: [],
            markers: []
        }
    default:
      return state;
  }
};

const store = createStore(reducer);


export default store;
