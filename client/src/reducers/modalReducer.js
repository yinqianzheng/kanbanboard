import {
    RECEIVE_CLOSE_MODAL,
    RECEIVE_OPEN_MODAL
} from '../actions/modalActions';

const _initState = {type: null, content: null};

const ModalReducer = (state = _initState, action) => {
    switch (action.type) {
        case RECEIVE_CLOSE_MODAL:
            return _initState;
        case RECEIVE_OPEN_MODAL:
            return Object.assign({}, action.data);
        default:
            return state;
    }
};

export default ModalReducer;