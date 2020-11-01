import { closeModal } from "../actions/modalActions";
import { connect } from "react-redux";
import CandidateFrom from "./candidate/candidateForm";
import SessionForm from "./session/addUserFormContainer";
import InfoBox from "./candidate/detail"
import "./modal.css";

function Modal({modal, close}){
    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    const renderContent = () => {
        if(modal.type === "recruiterFrom"){
            return <SessionForm />;
        }

        if(modal.type === "candidateForm"){
            return <CandidateFrom />;
        }

        if(modal.type === "candidateDetail"){

            return <InfoBox info={modal.content}/>;
        }
        return null
    }

    return (
        <div className={`modal ${modal.type?"show": "hide"}`} onClick={close}>
            <div className="content" onClick={stopPropagation}>
                <span className="close" onClick={close}>&times;</span>
                {renderContent()}
            </div>
        </div>
    )
}

const mSTP = state => ({
    modal: state.modal
});

const mDTP = dispatch => ({
    close: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(Modal);