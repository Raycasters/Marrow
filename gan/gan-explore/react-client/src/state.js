import {createStore, compose, applyMiddleware } from 'redux';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const animationStepHandler = (data) => {
  store.dispatch(addAnimationStep(data.image, data.step));
}

const publishStartHandler = (data) => {
  store.dispatch(clearAnimationSteps());
  store.dispatch(setMaxSteps(data.steps));
}

const nowEncodingHandler = (data) => {
  console.log("NowEncoding state", data)
  store.dispatch(setNowEncoding(data));
}

const reducer = (state = {
  socket: null,
  snapshot: '',
  Get_Image: '',
  file_name: '',
  animationSteps: [],
  nowEncoding: {},
  currentStep: 0,
  maxSteps: 40
}, action) => {
  switch (action.type) {  
    case 'SET_SOCKET': {
      console.log("Setting socket", action.socket);
      if (state.socket) {
        state.socket.off('animationStep', animationStepHandler)
        state.socket.off('publishStart', publishStartHandler)
        state.socket.off('nowEncoding', nowEncodingHandler)
      }
      action.socket.on('animationStep', animationStepHandler)
      action.socket.on('publishStart', publishStartHandler)
      action.socket.on('nowEncoding', nowEncodingHandler)

      return {...state, socket: action.socket}
  }
  case 'END_POINT': {
    return {
      ...state,
      ENDPOINT: action.ENDPOINT
    }
  }
  case 'SAVE_TYPE_DATASET': {
    return {
      ...state,
      dataset: action.dataset
    }
  }
  case 'SAVE_SNAPSHOT': {
    return {
      ...state,
      snapshot: action.snapshot
    }
  }
  case 'ADD_ANIMATION_STEP': {
    return {
      ...state,
      animationSteps: [...state.animationSteps,"data:image/jpeg;base64," + action.image],
      currentStep: action.step
    }
  }
  case 'CLEAR_ANIMATION_STEPS': {
    return {
      ...state,
      animationSteps: [],
      currentStep: 0
    }
  }
  case 'MOVE_STEPS': {
    const steps = action.direction == 'back' ? action.steps * -1 : Number(action.steps)
    return {
      ...state,
      currentStep: Math.min(Math.max(state.currentStep + steps, 0),state.animationSteps.length - 1)
    }
  }
  case 'SET_STEP': {
    return {
      ...state,
      currentStep: action.step
    }
  }
  case 'SET_MAX_STEPS': {
    return {
      ...state,
      maxSteps: action.maxSteps
    }
  }
  case 'SET_NOW_ENCODING': {
    return {
      ...state,
      nowEncoding: action.data
    }
  }
  case 'GET_IMAGE': {
    return {
      ...state,
      Get_Image: action.getImage
    }
  }
  case 'SAVE_FILE_NAME': {
    return {
      ...state,
      file_name: action.images
    }
  }
  default:
      return state;
  }
}

export const setSocket = (socket) => ({
  type: 'SET_SOCKET',
  socket
})

export const addAnimationStep = (image, step) => ({
  type: 'ADD_ANIMATION_STEP',
  image,
  step
})

export const clearAnimationSteps  = () => ({
  type: 'CLEAR_ANIMATION_STEPS'
})

export const moveSteps  = (direction, steps) => ({
  type: 'MOVE_STEPS',
  direction,
  steps
})

export const setStep  = (step) => ({
  type: 'SET_STEP',
  step
})

export const setMaxSteps  = (maxSteps) => ({
  type: 'SET_MAX_STEPS',
  maxSteps
})

export const setNowEncoding  = (data) => ({
  type: 'SET_NOW_ENCODING',
  data
})

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware()),
);

export default store;


