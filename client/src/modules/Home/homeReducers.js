import { SEND_GREETING } from './homeConstants.js';


const INITIAL_STATE = {
    greeting: ''
};

const Home = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case SEND_GREETING:
      return {...state, greeting: action.data};

    default: return state;

  }
};

export default Home;