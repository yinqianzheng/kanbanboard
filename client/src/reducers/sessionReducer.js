import {RECEIVE_USER_LOGOUT, RECEIVE_USER_SIGN_IN, RECEIVE_CURRENT_USER } from '../actions/sessionActions';

const initialState = {
    isAuthenticated: false,
    user: undefined
};

export default function sessionReducer(state = initialState, action) {
    const nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            nextState.isAuthenticated = !!action.currentUser;
            nextState.user = action.currentUser;
            return nextState;
        case RECEIVE_USER_SIGN_IN:
            nextState.isAuthenticated = !!action.currentUser;
            nextState.user = action.currentUser;
            return nextState;
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: undefined
            };
        default:
            return state;
    }
}