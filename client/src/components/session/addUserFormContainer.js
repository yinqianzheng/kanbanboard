import { connect } from 'react-redux';
import { addUser, clearErrors } from "../../actions/sessionActions";
import SessionForm from "./sessionForm";

const mSTP = state => ({
    type: "Add",
    errors: state.errors.session
});

const mDTP = dispatch => ({
    submitForm: user => dispatch(addUser(user)),
    clearErrors: () => dispatch(clearErrors()),
});

export default connect(mSTP, mDTP)(SessionForm)