import { connect } from 'react-redux';
import { login, clearErrors } from "../../actions/sessionActions";
import SessionForm from "./sessionForm";

const mSTP = state => ({
    type: "Sign In",
    errors: state.errors.session
});

const mDTP = dispatch => ({
    submitForm: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
});

export default connect(mSTP, mDTP)(SessionForm)