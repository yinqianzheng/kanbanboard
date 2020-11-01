import {
    RECEIVE_CANDIDATE,
    RECEIVE_ALL_CANDIDATE
} from '../actions/candidateActions';

const _initState = [];

const SessionErrorsReducer = (state = _initState, action) => {
    switch (action.type) {
        case RECEIVE_CANDIDATE:
            const nextState = [...state].filter(candidate => candidate._id !== action.candidate._id);
            return [...nextState, action.candidate];
        case RECEIVE_ALL_CANDIDATE:
            return [...action.candidates];
        default:
            return state;
    }
};

export default SessionErrorsReducer;