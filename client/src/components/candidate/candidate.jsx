import React from "react";
import "./candidate.css"
import { connect } from "react-redux";
import {openModal} from "../../actions/modalActions"

function Candidate({candidates, info, openModal}){
    const openDetailBox = () => {
        const data = {
            type:"candidateDetail",
            id: info._id
        }
        openModal(data);
    }

    return(
        <div className="candidate-info" draggable="false" onClick={openDetailBox}>
            <div><label>Name: {info.name}</label></div>
            <div><label>email: {info.email}</label></div>
            <div><label>Phone Number: {info.phoneNum}</label></div>
        </div>
    )
}


const mDTP = dispatch => ({
    openModal: (info) => dispatch(openModal(info)),
});

export default connect(null, mDTP)(Candidate);