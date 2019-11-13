const initialState = {
  loggedIn: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case 'LOGIN': {
      return {
        // State
        ...state,
        // Redux Store
        loggedIn: action.trueFalse
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
