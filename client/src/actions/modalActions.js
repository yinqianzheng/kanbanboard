import {clearErrors} from "./sessionActions"

export const RECEIVE_CLOSE_MODAL = "RECEIVE_CLOSE_MODAL";
export const RECEIVE_OPEN_MODAL = "RECEIVE_OPEN_MODAL";

export const receiveCloseModal = () => ({
    type: RECEIVE_CLOSE_MODAL
})

export const receiveOpenModal = (data) => ({
    type: RECEIVE_OPEN_MODAL,
    data
})

export const closeModal = () => dispatch =>{
    dispatch(receiveCloseModal());
}

export const openModal = data => dispatch => {
    dispatch(clearErrors());
    dispatch(receiveOpenModal(data));
}