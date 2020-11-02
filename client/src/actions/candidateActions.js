import * as APIUtil from "../utils/candidate";
import {receiveErrors} from "./sessionActions"
import {closeModal} from "./modalActions"
export const RECEIVE_CANDIDATE = "RECEIVE_CANDIDATE";
export const RECEIVE_ALL_CANDIDATE = "RECEIVE_ALL_CANDIDATE";

export const receiveCandidate = candidate => ({
    type: RECEIVE_CANDIDATE,
    candidate
})

export const receiveAllCandidate = candidates => ({
    type: RECEIVE_ALL_CANDIDATE,
    candidates
})

export const addCandidate = candidate => dispatch => {
    APIUtil.addCandidate(candidate).then(res =>{
        dispatch(receiveCandidate(res.data.candidate));
        dispatch(closeModal());
    }).catch(err =>{
        dispatch(receiveErrors(err))
    })
}

export const getCandidates = () => dispatch => {
    APIUtil.getCandidates().then(res =>{
        dispatch(receiveAllCandidate(res.data.candidates));
    }).catch(err =>{
        dispatch(receiveErrors(err))
    })
}

export const updateCandidate = (id, info) => dispatch => {
    APIUtil.updateCandidate(id, info).then(res => {
        if(res.data.type === "rating" || res.data.type === "comment"){
            dispatch(receiveCandidate(res.data.candidate));
        }
    }).catch(err =>{
        dispatch(receiveErrors(err))
    })
}